import { Smile, Meh, Frown, TrendingUp } from 'lucide-react';

function MoodSummary({ summary }) {
  const { positive, neutral, negative, total, average_sentiment } = summary;

  const getAverageColor = () => {
    switch (average_sentiment) {
      case 'positive':
        return 'from-green-500 to-emerald-500';
      case 'negative':
        return 'from-red-500 to-rose-500';
      default:
        return 'from-yellow-500 to-amber-500';
    }
  };

  const getAverageIcon = () => {
    switch (average_sentiment) {
      case 'positive':
        return <Smile className="w-8 h-8 text-white" />;
      case 'negative':
        return <Frown className="w-8 h-8 text-white" />;
      default:
        return <Meh className="w-8 h-8 text-white" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Average Sentiment Card */}
      <div className={`bg-gradient-to-br ${getAverageColor()} rounded-2xl shadow-xl p-6 border border-white/20 backdrop-blur-sm`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm font-medium">Average Mood</p>
            <p className="text-white text-2xl font-bold capitalize mt-1">
              {average_sentiment}
            </p>
          </div>
          {getAverageIcon()}
        </div>
        <div className="flex items-center gap-2 text-white/90">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">{total} total entries</span>
        </div>
      </div>

      {/* Positive Card */}
      <div className="bg-glass backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-green-500/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm font-medium">Positive</p>
            <p className="text-green-400 text-3xl font-bold mt-1">{positive}</p>
          </div>
          <Smile className="w-8 h-8 text-green-400" />
        </div>
        {total > 0 && (
          <p className="text-green-300 text-sm">
            {((positive / total) * 100).toFixed(0)}% of entries
          </p>
        )}
      </div>

      {/* Neutral Card */}
      <div className="bg-glass backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-yellow-500/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm font-medium">Neutral</p>
            <p className="text-yellow-400 text-3xl font-bold mt-1">{neutral}</p>
          </div>
          <Meh className="w-8 h-8 text-yellow-400" />
        </div>
        {total > 0 && (
          <p className="text-yellow-300 text-sm">
            {((neutral / total) * 100).toFixed(0)}% of entries
          </p>
        )}
      </div>

      {/* Negative Card */}
      <div className="bg-glass backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-red-500/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm font-medium">Negative</p>
            <p className="text-red-400 text-3xl font-bold mt-1">{negative}</p>
          </div>
          <Frown className="w-8 h-8 text-red-400" />
        </div>
        {total > 0 && (
          <p className="text-red-300 text-sm">
            {((negative / total) * 100).toFixed(0)}% of entries
          </p>
        )}
      </div>
    </div>
  );
}

export default MoodSummary;

