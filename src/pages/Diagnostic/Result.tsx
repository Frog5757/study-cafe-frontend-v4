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
  const mainTitle = "診断結果";
  return (
    <div>
      <BodyLayout>
        <BodyMainTitle title={mainTitle} />
        <ul css={answers}>
          {noAnswers.map((msg, index) => (
            <li css={answer} key={index}>
              {msg}
            </li>
          ))}
        </ul>
        <button onClick={handleSaveResult} disabled={isLoading}>
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
