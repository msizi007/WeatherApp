export interface City {
  name: string;
  isPinned: boolean;
}

export function getCities() {
  const cities = localStorage.getItem("cities");
  if (cities) {
    return JSON.parse(cities);
  }
  return [];
}

export function setCities(cities: City[]) {
  localStorage.setItem("cities", JSON.stringify(cities));
}

export function pinCity(city: string) {
  const cities = getCities();
  const updatedCities = cities.map((c: City) => {
    if (c.name === city) {
      return { ...c, isPinned: !c.isPinned };
    }
    return c;
  });
  setCities(updatedCities);
}

export function isCityPinned(city: string) {
  const cities = getCities();
  const cityToPin = cities.find((c: City) => c.name === city);
  if (cityToPin) {
    return cityToPin.isPinned;
  }
  return false;
}

export function addCity(city: City) {
  const cities = getCities();
  if (cities.find((c: City) => c.name === city.name)) {
    return;
  }
  const updatedCities = [...cities, city];
  setCities(updatedCities);
}
