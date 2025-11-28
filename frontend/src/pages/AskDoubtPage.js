import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';
import SimilarDoubtPanel from '../components/SimilarDoubtPanel';

const AskDoubtPage = () => {
  const [form, setForm] = useState({ title: '', description: '', tags: '' });
  const [autoTags, setAutoTags] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        tags: form.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      };
      const { data } = await api.post('/doubts', payload);
      setAutoTags(data.autoTags || []);
      setSimilar(data.similarDoubts || []);
      toast.success('Doubt submitted!');
      setForm({ title: '', description: '', tags: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit doubt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ask-shell">
      <div className="glass-card">
        <p className="eyebrow">Ask a doubt</p>
        <h1>Drop your question, let the system do the heavy lifting.</h1>
        <p>We clean the text, predict tags, and instantly show mirrors of what has already been answered.</p>
      </div>

      <div className="ask-columns">
        <form className="glass-card ask-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              name="title"
              placeholder="e.g. Difference between stack vs queue implementation"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description
            <textarea
              name="description"
              placeholder="Explain where you are stuck and what you tried."
              value={form.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Tags (comma separated)
            <input name="tags" placeholder="dsa, stack, queue" value={form.tags} onChange={handleChange} />
          </label>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Analyzing…' : 'Post doubt'}
          </button>

          {autoTags.length > 0 && (
            <div className="tag-row">
              {autoTags.map((tag) => (
                <span key={tag} className="tag-chip suggested">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </form>

        <div className="ask-side">
          <SimilarDoubtPanel items={similar} />
        </div>
      </div>
    </section>
  );
};

export default AskDoubtPage;
