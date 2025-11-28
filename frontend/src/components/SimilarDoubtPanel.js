const SimilarDoubtPanel = ({ items = [] }) => (
  <aside className="similar-panel">
    <h4>Similar doubts</h4>
    {items.length === 0 && <p>No similar doubts yet.</p>}
    {items.map((item) => (
      <div key={item.doubt?._id || item._id} className="similar-item">
        <p>{item.doubt?.title || item.title}</p>
        {item.score && <span className="score">{Math.round(item.score * 100)}% match</span>}
      </div>
    ))}
  </aside>
);

export default SimilarDoubtPanel;
