export function convertSecondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  if (hours) return `${hours} hr ${minutes} min ${remainingSeconds} sec`;
  return `${minutes} min ${remainingSeconds} sec`;
}
export function getTimeFromDate(date: Date): string {
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const amPm = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes}:${seconds} ${amPm}`;
  } else {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const amPm = date.getHours() >= 12 ? "PM" : "AM";
    return `${day}/${month} - ${hours}:${minutes}:${seconds} ${amPm}`;
  }
}
export function convertTo24HourFormat(time12Hour: string): string {
  const [time, period] = time12Hour.split(" ");

  let [hours, minutes] = time.split(":").map(Number);

  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}
