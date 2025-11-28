const TAG_KEYWORDS = {
  dsa: ['stack', 'queue', 'tree', 'graph', 'algorithm', 'complexity', 'recursion'],
  oop: ['polymorphism', 'inheritance', 'encapsulation', 'class', 'object', 'interface'],
  dbms: ['database', 'sql', 'join', 'transaction', 'normalization', 'index'],
  web: ['html', 'css', 'javascript', 'react', 'frontend', 'ui'],
  backend: ['node', 'express', 'api', 'server', 'middleware', 'controller'],
  aptitude: ['probability', 'permutation', 'combination', 'ratio', 'percentage'],
};

const predictTags = (keywords = []) => {
  const matches = new Set();

  keywords.forEach((keyword) => {
    Object.entries(TAG_KEYWORDS).forEach(([tag, words]) => {
      if (words.includes(keyword)) {
        matches.add(tag);
      }
    });
  });

  return Array.from(matches);
};

module.exports = {
  predictTags,
};
