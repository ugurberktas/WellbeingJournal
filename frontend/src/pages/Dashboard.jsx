import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { entriesAPI } from '../services/api';
import { LogOut, Plus, Edit2, Trash2, Smile, Meh, Frown } from 'lucide-react';
import EntryModal from '../components/EntryModal';
import MoodSummary from '../components/MoodSummary';
import MoodChart from '../components/MoodChart';
import EntryCard from '../components/EntryCard';

function Dashboard({ setIsAuthenticated }) {
  const [entries, setEntries] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const navigate = useNavigate();

  const fetchEntries = async () => {
    try {
      const [entriesRes, summaryRes] = await Promise.all([
        entriesAPI.getAll(),
        entriesAPI.getSummary(),
      ]);
      setEntries(entriesRes.data);
      setSummary(summaryRes.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleCreateEntry = () => {
    setEditingEntry(null);
    setShowModal(true);
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setShowModal(true);
  };

  const handleDeleteEntry = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await entriesAPI.delete(id);
        fetchEntries();
      } catch (error) {
        console.error('Error deleting entry:', error);
        alert('Failed to delete entry');
      }
    }
  };

  const handleSaveEntry = () => {
    fetchEntries();
    setShowModal(false);
    setEditingEntry(null);
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <Smile className="w-5 h-5 text-green-400" />;
      case 'negative':
        return <Frown className="w-5 h-5 text-red-400" />;
      default:
        return <Meh className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500/20 border-green-500/50';
      case 'negative':
        return 'bg-red-500/20 border-red-500/50';
      default:
        return 'bg-yellow-500/20 border-yellow-500/50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Wellbeing Journal</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Mood Summary */}
        {summary && <MoodSummary summary={summary} />}

        {/* Chart */}
        <div className="mb-8">
          <MoodChart entries={entries} />
        </div>

        {/* Add Entry Button */}
        <div className="mb-6">
          <button
            onClick={handleCreateEntry}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Entry
          </button>
        </div>

        {/* Entries Grid */}
        {entries.length === 0 ? (
          <div className="bg-glass backdrop-blur-xl rounded-2xl shadow-xl p-12 text-center border border-white/20">
            <p className="text-white/80 text-lg mb-4">No entries yet. Start your journey!</p>
            <button
              onClick={handleCreateEntry}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create First Entry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onEdit={() => handleEditEntry(entry)}
                onDelete={() => handleDeleteEntry(entry.id)}
                getSentimentIcon={getSentimentIcon}
                getSentimentColor={getSentimentColor}
              />
            ))}
          </div>
        )}
      </div>

      {/* Entry Modal */}
      {showModal && (
        <EntryModal
          entry={editingEntry}
          onClose={() => {
            setShowModal(false);
            setEditingEntry(null);
          }}
          onSave={handleSaveEntry}
        />
      )}
    </div>
  );
}

export default Dashboard;

