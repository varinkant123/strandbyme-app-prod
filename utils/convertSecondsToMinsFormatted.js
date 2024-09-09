export const convertSecondsToMinsFormatted = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${minutes}:${formattedSeconds}`;
};
