import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';
import DoubtCard from '../components/DoubtCard';
import TagFilter from '../components/TagFilter';
import LoadingSkeleton from '../components/LoadingSkeleton';

const DoubtListPage = () => {
  const [doubts, setDoubts] = useState([]);
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [availableTags, setAvailableTags] = useState([]);

  const fetchDoubts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (tag) params.tag = tag;
      const { data } = await api.get('/doubts', { params });
      setDoubts(data);
      const uniqueTags = Array.from(new Set(data.flatMap((item) => item.tags || []))).filter(Boolean);
      setAvailableTags(uniqueTags);
    } catch (err) {
      toast.error('Failed to load doubts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoubts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDoubts();
  };

  return (
    <section>
      <header className="list-header">
        <form onSubmit={handleSearch} className="search-bar">
          <input
            placeholder="Search doubts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="secondary-btn">
            Search
          </button>
        </form>
      </header>
      <TagFilter
        activeTag={tag}
        onSelect={setTag}
        tags={availableTags.length ? availableTags : undefined}
      />
      {loading ? (
        <LoadingSkeleton lines={6} />
      ) : (
        <div className="grid">
          {doubts.map((doubt) => (
            <DoubtCard key={doubt._id} doubt={doubt} />
          ))}
          {doubts.length === 0 && <p>No doubts yet</p>}
        </div>
      )}
    </section>
  );
};

export default DoubtListPage;
