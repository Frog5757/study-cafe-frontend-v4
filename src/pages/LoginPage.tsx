import React from "react";
import { Header } from "../components/layouts/Header";

import { BodyLayout } from "../components/layouts/BodyLayout";
import { BodyMainTitle } from "../components/uiparts/title/BodyMainTitle";
import LoginForm from "../components/uiparts/form/LoginForm";
export const LoginPage: React.FC = () => {
  return (
    <div>
      <Header />
      <BodyLayout>
        <BodyMainTitle title="ログイン" />
        <LoginForm />
      </BodyLayout>
    </div>
  );
};
