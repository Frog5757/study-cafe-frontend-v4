import axios from "axios";
import { useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export const useDeleteResult = (setResults: (results: any[]) => void, results: any[]) => {
  const deleteResult = useCallback(async (id: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      await axios.delete(`${API_URL}/api/results/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(results.filter((result) => result.id !== id));
    } catch (error) {
      console.error("Error deleting result:", error);
    }
  }, [results, setResults]);

  return { deleteResult };
};
