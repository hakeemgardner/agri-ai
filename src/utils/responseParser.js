export const parseGeminiResponse = (responseText) => {
  const sections = {
    cause: "",
    symptoms: { early: "", late: "" },
    weather: "",
    prevention: [],
    treatment: [],
  };

  // Split by section headers
  const causeMatch = responseText.match(
    /Cause:\s*\n([\s\S]*?)(?=\n\nSymptoms:|Symptoms:|$)/i
  );
  const symptomsMatch = responseText.match(
    /Symptoms:\s*\n([\s\S]*?)(?=\n\nWeather Conditions:|Weather Conditions:|$)/i
  );
  const weatherMatch = responseText.match(
    /Weather Conditions:\s*\n([\s\S]*?)(?=\n\nPrevention:|Prevention:|$)/i
  );
  const preventionMatch = responseText.match(
    /Prevention:\s*\n([\s\S]*?)(?=\n\nTreatment & Management:|Treatment:|$)/i
  );
  const treatmentMatch = responseText.match(
    /Treatment & Management:\s*\n([\s\S]*?)$/i
  );

  if (causeMatch) sections.cause = causeMatch[1].trim();
  if (weatherMatch) sections.weather = weatherMatch[1].trim();

  // Parse symptoms
  if (symptomsMatch) {
    const symptomsText = symptomsMatch[1];
    const earlyMatch = symptomsText.match(
      /Early signs?:([\s\S]*?)(?=Late signs?:|$)/i
    );
    const lateMatch = symptomsText.match(/Late signs?:([\s\S]*?)$/i);

    if (earlyMatch && lateMatch) {
      sections.symptoms.early = earlyMatch[1].trim();
      sections.symptoms.late = lateMatch[1].trim();
    } else {
      // If not split, put all in early
      sections.symptoms.early = symptomsText.trim();
    }
  }

  // Parse numbered lists
  if (preventionMatch) {
    sections.prevention = preventionMatch[1]
      .split(/\d+\./)
      .filter((item) => item.trim())
      .map((item) => item.trim());
  }

  if (treatmentMatch) {
    sections.treatment = treatmentMatch[1]
      .split(/\d+\./)
      .filter((item) => item.trim())
      .map((item) => item.trim());
  }

  return sections;
};
