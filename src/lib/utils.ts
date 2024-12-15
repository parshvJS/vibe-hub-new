import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatDateAgo(dateString: string): string {
  const currentDate = new Date();
  const pastDate = new Date(dateString);
  const timeDifference = currentDate.getTime() - pastDate.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 2) {
    return `${days} days ago`;
  } else if (days === 2) {
    return "2 days ago";
  } else if (days === 1) {
    return "1 day ago";
  } else if (hours > 1) {
    return `${hours} hours ago`;
  } else if (hours === 1) {
    return "1 hour ago";
  } else if (minutes > 1) {
    return `${minutes} minutes ago`;
  } else if (minutes === 1) {
    return "1 minute ago";
  } else if (seconds > 1) {
    return `${seconds} seconds ago`;
  } else {
    return "just now";
  }
}

// Example usage
// const dateToConvert = '2023-11-22T07:16:05.332+00:00';
// const formattedDate = formatDateAgo(dateToConvert);
// console.log(formattedDate);
