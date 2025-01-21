import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
interface UseSaveResultResponse {
  saveResult: (noAnswers: string[]) => void;
  isLoading: boolean;
  error: string | null;
}

export const useSaveResult = (): UseSaveResultResponse => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveResult = async (noAnswers: string[]) => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${API_URL}/api/result`,
        {
          no_messages: noAnswers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("診断結果が保存されました！");
    } catch (err) {
      setError("診断結果の保存に失敗しました");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return { saveResult, isLoading, error };
};
