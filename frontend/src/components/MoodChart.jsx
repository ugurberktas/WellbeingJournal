import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function MoodChart({ entries }) {
  // Transform entries for chart
  const chartData = entries
    .slice()
    .reverse()
    .map((entry) => {
      const date = new Date(entry.created_at);
      const sentimentValue = entry.sentiment === 'positive' ? 2 : entry.sentiment === 'neutral' ? 1 : 0;
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        mood: sentimentValue,
        sentiment: entry.sentiment,
      };
    });

  const moodLabels = { 0: 'Negative', 1: 'Neutral', 2: 'Positive' };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800/95 backdrop-blur-sm border border-white/20 rounded-lg p-3 shadow-xl">
          <p className="text-white font-semibold">{payload[0].payload.date}</p>
          <p className="text-purple-300">
            Mood: {moodLabels[payload[0].value]} ({payload[0].payload.sentiment})
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-glass backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">Mood Trends Over Time</h2>
      {entries.length === 0 ? (
        <p className="text-white/60 text-center py-12">No data to display yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis
              dataKey="date"
              stroke="rgba(255, 255, 255, 0.6)"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="rgba(255, 255, 255, 0.6)"
              domain={[-0.5, 2.5]}
              tickFormatter={(value) => moodLabels[value]}
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ color: 'rgba(255, 255, 255, 0.8)' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#a855f7"
              strokeWidth={3}
              dot={{ fill: '#a855f7', r: 5 }}
              activeDot={{ r: 7 }}
              name="Mood Level"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default MoodChart;

