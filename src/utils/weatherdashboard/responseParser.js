export const parseGeminiResponse = (responseText) => {
  const sections = {
    window: "",
    alert: "",
    advice: "",
    tips: "",
  };

  // Split by section headers
  const windowMatch = responseText.match(
    /Window:\s*\n([\s\S]*?)(?=\n\nAlert:|Alert:|$)/i
  );
  const alertMatch = responseText.match(
    /Alert:\s*\n([\s\S]*?)(?=\n\nPlanting Advice:|Planting Advice:|$)/i
  );
  const adviceMatch = responseText.match(
    /Planting Advice:\s*\n([\s\S]*?)(?=\n\nHarvesting Tips:|Harvesting Tips:|$)/i
  );
  const tipsMatch = responseText.match(/Harvesting Tips:\s*\n([\s\S]*?)$/i);

  if (windowMatch) sections.window = windowMatch[1].trim();
  if (alertMatch) sections.alert = alertMatch[1].trim();
  if (adviceMatch) sections.advice = adviceMatch[1].trim();
  if (tipsMatch) sections.tips = tipsMatch[1].trim();

  return sections;
};
