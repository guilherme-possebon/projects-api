import { NotesResponse, WeeksResponse } from "@/types/index.js";
import axios, { AxiosError } from "axios";

const API_URL = "https://project-api-woad.vercel.app/api";

if (!API_URL) {
  console.error("NEXT_PUBLIC_API_URL not set in .env");
  throw new Error("API configuration error");
}

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

export const createNote = async (title: string, note: string) => {
  try {
    const response = await api.post("/notes", { title, note });
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to create note");
  }
};

export const getCurrentWeek = async () => {
  try {
    const response = await api.get<NotesResponse>("/notes/week");
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch current week");
  }
};

export const getWeekById = async (weekId: number) => {
  try {
    const response = await api.get<NotesResponse>(`/notes/weeks/${weekId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch week by ID");
  }
};

export const getAllWeeks = async () => {
  try {
    const response = await api.get<WeeksResponse>("/notes/weeks");
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch all weeks");
  }
};

const handleApiError = (error: unknown, defaultMessage: string) => {
  if (error instanceof AxiosError) {
    console.error("API Error:", {
      message: error.message,
      response: error.response?.data,
    });
    throw new Error(error.response?.data?.error || defaultMessage);
  }
  console.error("Unexpected Error:", error);
  throw new Error(defaultMessage);
};
