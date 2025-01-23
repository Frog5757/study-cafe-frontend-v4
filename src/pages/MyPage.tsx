/** @jsxImportSource @emotion/react */
import { Header } from "../components/layouts/Header";
import { PageTitle } from "../components/uiparts/title/PageTitle";
import { BodyMainTitle } from "../components/uiparts/title/BodyMainTitle";
import { BodyLayout } from "../components/layouts/BodyLayout";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
const handleLogout = async (navigate: NavigateFunction) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return;
  }
  try {
    const response = await axios.post(
      `${API_URL}/api/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      console.error("Failed to log out");
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const MyPage = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<any[]>([]);
  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/results`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [navigate]);
  return (
    <>
      <Header />
      <PageTitle title="マイページ" />
      <BodyLayout>
        <BodyMainTitle title="ユーザー情報" />
        <button onClick={() => handleLogout(navigate)}>ログアウト</button>
        <h2>診断結果</h2>
        <ul>
          {results.length > 0 ? (
            results.map((result, index) => (
              <li key={index}>
                <p>ID: {result.id}</p>
                <p>診断結果: {result.no_messages}</p>
                <p>作成日時: {new Date(result.created_at).toLocaleString()}</p>
              </li>
            ))
          ) : (
            <p>診断結果はありません。</p>
          )}
        </ul>
      </BodyLayout>
    </>
  );
};
