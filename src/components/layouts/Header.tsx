/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLogout } from "../../hooks/api/useLogout";
export const Header = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { logout } = useLogout();
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div css={HeaderContainer}>
      <div css={HeaderLeft}>
        <Link to="/" css={linkStyle}>
          <div css={logo}>Study Cafe</div>
        </Link>
      </div>

      <div css={HeaderRight}>
        <ul css={HeaderContents}>
          <Link to="/" css={linkStyle}>
            <li css={HeaderContent}>ホーム</li>
          </Link>
          <Link to="/diagnostic" css={linkStyle}>
            <li css={HeaderContent}>診断テスト</li>
          </Link>
          {token ? (
            <>
              <Link to="/mypage" css={linkStyle}>
                <li css={HeaderContent}>マイページ</li>
              </Link>
              <li css={HeaderContent} onClick={logout}>
                ログアウト
              </li>
            </>
          ) : (
            <>
              <Link to="/login" css={linkStyle}>
                <li css={HeaderContent}>ログイン</li>
              </Link>
              <Link to="/signup" css={linkStyle}>
                <li css={HeaderContent}>新規登録</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

const HeaderContainer = css`
  background-color: hsl(0, 0%, 100%);
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const HeaderLeft = css`
  flex: 4;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 768px) {
    flex: none;
    text-align: center;
    margin: 10px 0;
    width: 100%;
  }
`;

const HeaderRight = css`
  flex: 8;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
  }
`;

const HeaderContents = css`
  list-style-type: none;
  display: flex;
  color: rgb(111, 111, 111);
  margin: 0;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    padding-inline-start: 0;
    padding: 0px;
  }
`;

const HeaderContent = css`
  margin-right: 40px;
  display: flex;
  align-items: center;
  height: 100px;
  width: 150px;
  justify-content: center;
  padding: 0 10px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    height: 50px;
    width: 120px;
    font-size: 14px;
    margin: 5px;
  }
`;

const logo = css`
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 5px;
  margin-left: 40px;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 10px 10px;
  }
`;

const linkStyle = css`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;
