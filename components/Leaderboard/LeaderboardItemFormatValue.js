function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export default function LeaderboardItemFormatValue(value, type) {
  switch (type) {
    case "LeaderboardTotalCompletedNoHints":
      return `${value}%`;
    case "LeaderboardBestTime":
      return formatTime(value);
    case "LeaderboardAverageTime":
      return formatTime(value);
    case "LeaderboardTotal":
      return value;
    default:
      return value;
  }
}
