/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { Question } from "../../hooks/api/useQuestion";
import { BodyLayout } from "../../components/layouts/BodyLayout";
import { BodyMainTitle } from "../../components/uiparts/title/BodyMainTitle";
import { useSaveResult } from "../../hooks/api/useSaveResult";

interface ResultProps {
  userAnswers: {
    questionId: string;
    yesOrNo: boolean;
  }[];
  questions: Question[];
}

export const Result: FC<ResultProps> = ({ userAnswers, questions }) => {
  const { saveResult, isLoading, error } = useSaveResult();
  const noAnswers = userAnswers
    .filter((answer) => !answer.yesOrNo)
    .map((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      return question?.noMessage;
    })
    .filter((msg): msg is string => msg !== undefined);

  const handleSaveResult = () => {
    saveResult(noAnswers);
  };

  return (
    <div>
      <BodyLayout>
        <BodyMainTitle title="診断結果" />
        <ul css={answers}>
          {noAnswers.length > 0 ? (
            noAnswers.map((msg, index) => (
              <li css={answer} key={index}>
                {msg}
              </li>
            ))
          ) : (
            <li css={noProblemsMessage}>よく理解できています</li>
          )}
        </ul>
        <button
          onClick={handleSaveResult}
          css={saveResultButton(noAnswers.length === 0)}
          disabled={noAnswers.length === 0}
        >
          {isLoading ? "保存中..." : "診断結果を保存する"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </BodyLayout>
    </div>
  );
};

const answer = css`
  font-size: 20px;
  list-style: none;
  margin: 10px 0px;
`;

const answers = css`
  padding-left: 0;
  margin-bottom: 30px;
`;

const noProblemsMessage = css`
  font-size: 20px;
  color: green;
  text-align: center;
list-style: none;
`;

// ボタンのスタイルを動的に変更
const saveResultButton = (disabled: boolean) => css`
  background: ${disabled ? "#d3d3d3" : "#75bae9de"};
  color: ${disabled ? "#a1a1a1" : "#fff"};
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 15px;
  cursor: ${disabled ? "not-allowed" : "pointer"};
  transition: background 0.3s;
  height: 70px;
  width: 250px;

  &:hover {
    background: ${disabled ? "#d3d3d3" : "#5486a8de"};
  }
`;

