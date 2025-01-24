/** @jsxImportSource @emotion/react */
import { Header } from "../components/layouts/Header";
import { PageTitle } from "../components/uiparts/title/PageTitle";
import { BodyMainTitle } from "../components/uiparts/title/BodyMainTitle";
import { BodyLayout } from "../components/layouts/BodyLayout";
import { IconButton } from "../components/uiparts/button/IconButton";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
export const HomePage = () => (
  <>
    <Header />
    <PageTitle title="Study Cafe" />
    <BodyLayout>
      <BodyMainTitle title="さっそく診断テストを始めましょう" />
      <IconButton
        icon={<ManageSearchIcon sx={{ fontSize: "100px", color: "#ffffff" }} />}
        label="診断テスト"
        bgColor="#6d3b17b6"
        to="/diagnostic"
        description="苦手な単元の原因を診断できます。"
      />
    </BodyLayout>
  </>
);
