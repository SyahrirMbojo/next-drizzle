import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const listRowPagination = [10, 25, 50, 100]

export type ResultState = {
  success: boolean;
  status: number;
  message?: any;
};