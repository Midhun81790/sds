const STOPWORDS = new Set([
  'a',
  'an',
  'and',
  'the',
  'or',
  'is',
  'are',
  'to',
  'in',
  'of',
  'on',
  'for',
  'with',
  'that',
  'this',
  'it',
  'as',
  'at',
]);

const tokenize = (text = '') =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token && !STOPWORDS.has(token));

const buildVector = (tokens) => {
  const vector = {};
  tokens.forEach((token) => {
    vector[token] = (vector[token] || 0) + 1;
  });
  return vector;
};

const cosineSimilarity = (vectorA, vectorB) => {
  const intersection = Object.keys(vectorA).filter((token) => token in vectorB);
  const dotProduct = intersection.reduce((sum, token) => sum + vectorA[token] * vectorB[token], 0);
  const magnitude = (vector) => Math.sqrt(Object.values(vector).reduce((sum, val) => sum + val * val, 0));
  const magnitudeA = magnitude(vectorA);
  const magnitudeB = magnitude(vectorB);

  if (!magnitudeA || !magnitudeB) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
};

const extractKeywords = (text, limit = 10) => {
  const tokens = tokenize(text);
  const frequency = buildVector(tokens);
  return Object.entries(frequency)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, limit)
    .map(([token]) => token);
};

const getSimilarityScore = (textA, textB) => {
  const vectorA = buildVector(tokenize(textA));
  const vectorB = buildVector(tokenize(textB));
  return Number(cosineSimilarity(vectorA, vectorB).toFixed(4));
};

module.exports = {
  extractKeywords,
  getSimilarityScore,
};
