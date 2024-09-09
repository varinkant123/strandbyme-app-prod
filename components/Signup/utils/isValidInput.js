import { CountrySet } from "../../../data/DataCountryEmoji";
import { parseCountryInput } from "./parseCountryInput";

const isValidInput = (id, value) => {
  // A function to validate names
  function isValidName(name) {
    const regex = /^[a-zA-Z\-\'\s]+$/;
    return regex.test(name) && name.trim().length > 0;
  }

  // Validate country using the pre-computed Set of country names
  // This approach is more efficient than looping through an array on each validation
  function isValidCountry(country) {
    // remove flag emoji and whitespace from country name
    // const countryName = parseCountryInput(country);
    return CountrySet.has(country);
  }

  // a function to validate avatar by checking if the value contains a single hashtag anywhere in the string
  function isValidAvatar(avatar) {
    const regex = /^\d+$/;
    return regex.test(avatar);
  }
  // Return false if value is null or undefined
  if (!value) {
    return false;
  }

  // Handle different validation rules based on id
  switch (id) {
    case "UserFirstName":
      return isValidName(value);
    case "UserLastName":
      return isValidName(value);
    case "UserLocationCountry":
      return isValidCountry(value);
    case "UserAvatar":
      return isValidAvatar(value);
    default:
      return true;
  }
};

export default isValidInput;
