import React from "react";
import { Header } from "../components/layouts/Header";
import { PageTitle } from "../components/uiparts/title/PageTitle";
import { BodyLayout } from "../components/layouts/BodyLayout";
import { BodyMainTitle } from "../components/uiparts/title/BodyMainTitle";
import LoginForm from "../components/uiparts/form/LoginForm";
export const LoginPage: React.FC = () => {
  return (
    <div>
      <Header />
      <PageTitle title="ログインページ" />
      <BodyLayout>
        <BodyMainTitle title="ログイン" />
        <LoginForm />
      </BodyLayout>
    </div>
  );
};
