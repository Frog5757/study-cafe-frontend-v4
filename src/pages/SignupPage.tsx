import React from "react";
import { useSignUp } from "../hooks/api/useSignUp";
import { SignUpForm } from "../components/uiparts/form/SignUpForm";
import { Header } from "../components/layouts/Header";
import { BodyLayout } from "../components/layouts/BodyLayout";
import { BodyMainTitle } from "../components/uiparts/title/BodyMainTitle";

export const SignUpPage: React.FC = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSignUp,
  } = useSignUp();

  return (
    <div>
      <Header />
      <BodyLayout>
        <BodyMainTitle title="新規登録" />
        <SignUpForm
          handleSignUp={handleSignUp}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
      </BodyLayout>
    </div>
  );
};
