import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Ensure hospital names are displayed with each word capitalized
export function formatHospitalName(name?: string) {
  if (!name) return '';
  const trimmed = name.trim();
  if (!trimmed) return '';
  // capitalize each word
  const words = trimmed.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  let formatted = words.join(' ');
  // ensure it ends with 'Hospital' (capital H)
  if (!/\bHospital$/i.test(formatted)) {
    formatted = `${formatted} Hospital`;
  }
  return formatted;
}
