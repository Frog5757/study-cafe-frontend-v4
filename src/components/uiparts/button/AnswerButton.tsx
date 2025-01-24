/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface AnswerButtonProps {
  label: string;
  onClick: () => void;
}

export const AnswerButton: React.FC<AnswerButtonProps> = ({
  label,
  onClick,
}) => {
  return (
    <button onClick={onClick} css={buttonStyle}>
      {label}
    </button>
  );
};

const buttonStyle = css`
  background: #77bf79de;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 30px;
  cursor: pointer;
  transition: background 0.3s;
  height: 70px;
  width: 200px;

  &:hover {
    background: #477348de;
  }

  /* レスポンシブ対応 */
  @media (max-width: 768px) {
    font-size: 25px;
    height: 60px;
    width: 180px;
    padding: 8px 16px; 
  }

  @media (max-width: 480px) {
    font-size: 20px; /* スマホ画面ではさらに小さく */
    height: 50px;
    width: 150px;
    padding: 6px 12px; /* パディングを調整 */
  }
`;
