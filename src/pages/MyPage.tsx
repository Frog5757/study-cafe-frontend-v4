/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
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

  const handleDelete = async (id: number) => {
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
      // ローカルの状態から削除
      setResults(results.filter((result) => result.id !== id));
    } catch (error) {
      console.error("Error deleting result:", error);
    }
  };
  return (
    <>
      <Header />
      <PageTitle title="マイページ" />
      <BodyLayout>
        <BodyMainTitle title="保存した診断結果" />
        <ul>
          {results.length > 0 ? (
            results.map((result) => (
              <li key={result.id} css={resultList}>
                <p css={getResult}>{result.no_messages}</p>
                <button
                  css={deleteButton}
                  onClick={() => handleDelete(result.id)}
                >
                  削除
                </button>
              </li>
            ))
          ) : (
            <p>診断結果はありません。</p>
          )}
        </ul>
        <button onClick={() => handleLogout(navigate)} css={logoutButton}>
          ログアウト
        </button>
      </BodyLayout>
    </>
  );
};

const resultList = css`
  display: flex;
  padding-bottom: 50px;
  align-items: center;
`;
const deleteButton = css`
  margin-left: 10px;
  height: 30px;
  width: 50px;
  cursor: pointer;
`;
const getResult = css`
  width: 400px;
`;
const logoutButton = css`
  display: block;
  height: 50px;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  width: 200px;
  background-color: #ee8f8f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #b16969;
  }
`;
