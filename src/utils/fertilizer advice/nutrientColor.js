export const getNutrientStroke = (nutrient) => {
  const colors = {
    nitrogen: "#3b82f6",
    phosphorus: "#f97316",
    potassium: "#a855f7",
  };
  return colors[nutrient] || "#6b7280";
};
