export const parseCountryInput = (value) => {
  // Remove flag emoji and whitespace from country name
  const countryName = value
    .replace(/[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]/, "")
    .trim();
  // Return the country name
  return countryName;
};
