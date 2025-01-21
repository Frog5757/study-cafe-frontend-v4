/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Header } from "../components/layouts/Header";
import { PageTitle } from "../components/uiparts/title/PageTitle";
import { BodyMainTitle } from "../components/uiparts/title/BodyMainTitle";
import { BodyLayout } from "../components/layouts/BodyLayout";
import { IconButton } from "../components/uiparts/button/IconButton";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export const HomePage = () => (
  <>

    <Header />
    <PageTitle
      title="Study Cafe"
      dec="自分だけの解決策、あなたと一緒に見つけます。"
    />
    <BodyLayout>
      <BodyMainTitle title="さっそく診断テストを始めましょう" />
      <div css={buttonsWrapper}>
        <IconButton
          icon={
            <ManageSearchIcon sx={{ fontSize: "100px", color: "#ffffff" }} />
          }
          label="診断テスト"
          bgColor="#6d3b17b6"
          to="/diagnostic"
          description="苦手な単元の原因を診断できます。"
        />
      </div>
    </BodyLayout>
    <button onClick={async()=>{
   const response =  await  axios.get(`${API_URL}/api/hello`)
   console.log(response.data)
    }}>テスト</button>
  </>
);

const buttonsWrapper = css`
  display: flex;
  justify-content: center;
  gap: 80px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
`;
