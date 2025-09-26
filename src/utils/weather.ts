export const weatherCategories = {
  freezing: [
    "Freezing drizzle",
    "Heavy freezing drizzle",
    "Light freezing rain",
    "Moderate or heavy freezing rain",
    "Freezing fog",
    "Blowing snow",
    "Blizzard",
  ],

  extremelyCold: [
    "Patchy snow nearby",
    "Light snow",
    "Patchy light snow",
    "Patchy moderate snow",
    "Moderate snow",
    "Patchy heavy snow",
    "Heavy snow",
    "Ice pellets",
    "Light snow showers",
    "Moderate or heavy snow showers",
    "Light showers of ice pellets",
    "Moderate or heavy showers of ice pellets",
  ],

  coldRainy: [
    "Patchy light drizzle",
    "Light drizzle",
    "Patchy light rain",
    "Light rain",
    "Moderate rain at times",
    "Moderate rain",
    "Heavy rain at times",
    "Heavy rain",
    "Light rain shower",
    "Moderate or heavy rain shower",
    "Torrential rain shower",
    "Light sleet",
    "Moderate or heavy sleet",
    "Light sleet showers",
    "Moderate or heavy sleet showers",
    "Patchy sleet nearby",
  ],

  stormy: [
    "Thundery outbreaks in nearby",
    "Patchy light rain in area with thunder",
    "Moderate or heavy rain in area with thunder",
    "Patchy light snow in area with thunder",
    "Moderate or heavy snow in area with thunder",
  ],

  foggy: ["Fog", "Mist", "Freezing fog"],

  clearOrCloudy: [
    "Sunny",
    "Partly Cloudy",
    "Cloudy",
    "Overcast",
    "Patchy rain nearby",
    "Patchy freezing drizzle nearby",
  ],
};

export function getWeatherCategory(
  condition: string
): keyof typeof weatherCategories | undefined {
  for (const [category, conditions] of Object.entries(weatherCategories)) {
    if (conditions.includes(condition)) {
      return category as keyof typeof weatherCategories;
    }
  }
  return undefined;
}
