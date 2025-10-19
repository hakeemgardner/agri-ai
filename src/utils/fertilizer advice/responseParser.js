export const parseRecommendation = (aiResponse, crop, soil) => {
  // Extract NPK ratio from response
  const npkMatch = aiResponse.match(/(\d+)-(\d+)-(\d+)/);
  const npkRatio = npkMatch
    ? {
        nitrogen: parseInt(npkMatch[1]),
        phosphorus: parseInt(npkMatch[2]),
        potassium: parseInt(npkMatch[3]),
      }
    : { nitrogen: 20, phosphorus: 20, potassium: 20 };

  // Generate structured recommendation
  return {
    cropType: crop,
    soilType: soil,
    season: "Current Season",
    location: "Kingston, Jamaica",
    npkRatio: npkRatio,
    primaryRecommendation: {
      name: `NPK ${npkRatio.nitrogen}-${npkRatio.phosphorus}-${npkRatio.potassium} Blend`,
      type: "Water Soluble",
      amount: "2-3 kg per 100m²",
      frequency: "Every 3-4 weeks",
      cost: "$20-35 per application",
      confidence: 92,
    },
    rawResponse: aiResponse,
  };
};
