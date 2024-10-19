import { differenceInDays, parseISO } from "date-fns";

// -----------------------------------------------------------------------------------------------------------------------
// this function returns the puzzle id which is in alignment with the nytimes strand id count
// based on the date found on local device. Note it uses the date and time of 20/10/24 being Strands ID 230 as the starting
function getDaysDifferenceFromOct20() {
  // Get current local date
  const today = new Date();

  // Manually set the date for testing (uncomment and modify as needed)
  // const today = new Date("2024-10-20T00:59:00"); // This date is interpreted in the local timezone of the device
  // console.log("Date being used:", today.toLocaleString());

  // Create a Date object for October 20th of the current year
  const oct20 = new Date(today.getFullYear(), 9, 20); // Month is 0-indexed, so 9 is October

  // If today is before October 20th, use last year's October 20th
  if (today < oct20) {
    oct20.setFullYear(oct20.getFullYear() - 1);
  }

  // Calculate the difference in milliseconds
  const diffTime = Math.abs(today - oct20);

  // Convert to days and round down
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

export const getPIDOnDevice = () => {
  const diffInDays = getDaysDifferenceFromOct20();
  const PIDNumber = diffInDays + 231;
  const PIDNumberPadded = PIDNumber.toString().padStart(5, "0");
  const PIDFormatted = `S${PIDNumberPadded}`;
  return PIDFormatted;
};
