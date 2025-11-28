import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import SimilarDoubtPanel from '../components/SimilarDoubtPanel';

const DoubtDetailPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [doubt, setDoubt] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState('');

  const loadDoubt = async () => {
    try {
      const { data } = await api.get(`/doubts/${id}`);
      setDoubt(data.doubt);
      setReplies(data.replies);
    } catch (err) {
      toast.error('Failed to load doubt');
    }
  };

  useEffect(() => {
    loadDoubt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const submitReply = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/replies/${id}`, { text: replyText });
      setReplies((prev) => [data, ...prev]);
      setReplyText('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reply failed');
    }
  };

  if (!doubt) {
    return <p>Loading...</p>;
  }

  const author = doubt.createdBy?.name || doubt.guestName || 'Anonymous';
  const askedAt = new Date(doubt.createdAt).toLocaleString();

  return (
    <section className="detail-shell">
      <article className="glass-card doubt-hero">
        <div className="eyebrow">Asked by {author}</div>
        <h1>{doubt.title}</h1>
        <p className="lead">{doubt.description}</p>
        <div className="meta-grid">
          <div>
            <span className="muted">Created</span>
            <p>{askedAt}</p>
          </div>
          <div>
            <span className="muted">Upvotes</span>
            <p>{doubt.upvotes || 0}</p>
          </div>
        </div>
        <div className="tag-row">
          {doubt.tags?.map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
        </div>
      </article>

      <article className="glass-card replies-card">
        <header className="card-meta-row">
          <h3>Replies</h3>
          <span className="muted">{replies.length} total</span>
        </header>
        {isAuthenticated ? (
          <form onSubmit={submitReply} className="reply-form">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={3}
              placeholder="Share your approach or answer"
              required
            />
            <button type="submit" className="primary-btn">
              Post reply
            </button>
          </form>
        ) : (
          <p className="muted">Login to contribute a reply.</p>
        )}

        <div className="reply-stack">
          {replies.map((reply) => (
            <div key={reply._id} className="reply-item">
              <div className="reply-meta">
                <strong>{reply.createdBy?.name || 'Anonymous'}</strong>
                <span>{new Date(reply.createdAt).toLocaleString()}</span>
              </div>
              <p>{reply.text}</p>
            </div>
          ))}
          {replies.length === 0 && <p className="muted">No replies yet.</p>}
        </div>
      </article>

      <div className="detail-side">
        <SimilarDoubtPanel items={doubt.similarityScores || []} />
      </div>
    </section>
  );
};

export default DoubtDetailPage;
