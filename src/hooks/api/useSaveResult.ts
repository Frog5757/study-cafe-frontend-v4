import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

interface UseSaveResultResponse {
  saveResult: (noAnswers: string[]) => void;
  isLoading: boolean;
  error: string | null;
}

export const useSaveResult = (): UseSaveResultResponse => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const saveResult = async (noAnswers: string[]) => {
    // バリデーション: noAnswersが空の場合は保存しない
    if (!noAnswers || noAnswers.length === 0) {
      setError("診断結果がありません");
      return;
    }

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
      navigate("/mypage");
    } catch (err) {
      setError("保存にはログインが必要です");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { saveResult, isLoading, error };
};
