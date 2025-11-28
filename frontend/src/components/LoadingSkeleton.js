const LoadingSkeleton = ({ lines = 3 }) => (
  <div className="skeleton">
    {Array.from({ length: lines }).map((_, idx) => (
      <div key={`line-${idx}`} className="skeleton-line" />
    ))}
  </div>
);

export default LoadingSkeleton;
