import { Edit2, Trash2, Calendar } from 'lucide-react';

function EntryCard({ entry, onEdit, onDelete, getSentimentIcon, getSentimentColor }) {
  const date = new Date(entry.created_at);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={`bg-glass backdrop-blur-xl rounded-2xl shadow-xl p-6 border ${getSentimentColor(entry.sentiment)} hover:scale-105 transition-transform duration-200`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{entry.title}</h3>
          <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getSentimentIcon(entry.sentiment)}
          <span className="text-white/80 text-sm capitalize ml-1">{entry.sentiment}</span>
        </div>
      </div>

      <p className="text-white/90 mb-4 line-clamp-3">{entry.content}</p>

      <div className="flex gap-2 pt-4 border-t border-white/10">
        <button
          onClick={onEdit}
          className="flex-1 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm font-medium"
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm font-medium"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}

export default EntryCard;

