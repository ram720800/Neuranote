import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, subjectsBadges } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColors = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};
export const getSubjectBadges = (subject: string) => {
  return subjectsBadges[subject as keyof typeof subjectsBadges];
};
