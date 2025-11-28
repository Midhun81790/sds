import { Link } from 'react-router-dom';

const DoubtCard = ({ doubt }) => {
  const author = doubt.createdBy?.name || doubt.guestName || 'Anonymous';
  const summary = doubt.description.length > 220 ? `${doubt.description.slice(0, 220)}…` : doubt.description;

  return (
    <article className="doubt-card">
      <div className="card-meta-row">
        <span className="eyebrow">Asked by {author}</span>
        <span className="muted">{new Date(doubt.createdAt).toLocaleString()}</span>
      </div>
      <h3>{doubt.title}</h3>
      <p className="doubt-preview">{summary}</p>
      <div className="tag-row">
        {doubt.tags?.map((tag) => (
          <span key={tag} className="tag-chip">
            {tag}
          </span>
        ))}
      </div>
      <div className="card-footer">
        <span>{doubt.upvotes || 0} upvotes</span>
        <Link to={`/doubts/${doubt._id}`} className="primary-btn">
          View thread
        </Link>
      </div>
    </article>
  );
};

export default DoubtCard;
