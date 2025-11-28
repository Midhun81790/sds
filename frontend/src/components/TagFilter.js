const DEFAULT_TAGS = ['dsa', 'oop', 'dbms', 'web', 'backend', 'aptitude'];

const TagFilter = ({ activeTag, onSelect, tags = DEFAULT_TAGS }) => (
  <div className="tag-filter">
    {['all', ...tags].map((tag) => (
      <button
        key={tag}
        type="button"
        className={activeTag === tag ? 'chip active' : 'chip'}
        onClick={() => onSelect(tag === 'all' ? '' : tag)}
      >
        {tag.toUpperCase()}
      </button>
    ))}
  </div>
);

export default TagFilter;
