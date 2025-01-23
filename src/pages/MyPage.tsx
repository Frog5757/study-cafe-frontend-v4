/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Header } from "../components/layouts/Header";
import { PageTitle } from "../components/uiparts/title/PageTitle";
import { BodyMainTitle } from "../components/uiparts/title/BodyMainTitle";
import { BodyLayout } from "../components/layouts/BodyLayout";
import { useGetResults } from "../hooks/api/useGetResults";
import { useDeleteResult } from "../hooks/api/useDeleteResult";

export const MyPage = () => {
  const { results, setResults } = useGetResults();
  const { deleteResult } = useDeleteResult(setResults, results);
  return (
    <>
      <Header />
      <PageTitle title="マイページ" />
      <BodyLayout>
        <BodyMainTitle title="保存した診断結果" />
        <ul css={resultLists}>
          {results.length > 0 ? (
            results.map((result) => (
              <li key={result.id} css={resultList}>
                <p css={getResult}>{result.no_messages}</p>
                <button
                  css={deleteButton}
                  onClick={() => deleteResult(result.id)}
                >
                  削除
                </button>
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
const resultLists = css`
  padding: 0;
`;
