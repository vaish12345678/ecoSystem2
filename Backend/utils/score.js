function calculateSustainabilityScore({ recyclablePercent, supplierRating, carbonFootprint }) {
  let score = 0;
  score += recyclablePercent * 0.4; // up to 40 pts
  score += supplierRating * 10 * 0.3; // up to 30 pts
  score += (100 - carbonFootprint) * 0.3; // lower footprint = higher score
  return Math.round(Math.min(score, 100));
}

module.exports = { calculateSustainabilityScore };
