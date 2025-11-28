import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../utils/api';

const AnalyticsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      const response = await api.get('/doubts');
      const counts = response.data.reduce((acc, doubt) => {
        doubt.tags.forEach((tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
      }, {});

      setData(Object.entries(counts).map(([tag, value]) => ({ tag, value })));
    };

    load();
  }, []);

  return (
    <section className="card">
      <h2>Doubts per tag</h2>
      {data.length === 0 ? (
        <p>No analytics yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <XAxis dataKey="tag" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#6366F1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
};

export default AnalyticsPage;
