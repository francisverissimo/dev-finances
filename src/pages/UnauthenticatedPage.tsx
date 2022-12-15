import { useState } from "react";
import { ForgotPage } from "./ForgotPage";
import { LogInPage } from "./LogInPage";
import { SignUpPage } from "./SignUpPage";

export function UnauthenticatedPage() {
  const [page, setPage] = useState<"login" | "signup" | "forgot">("login");

  return (
    <>
      {page == "login" ? (
        <LogInPage setPage={setPage} />
      ) : page == "forgot" ? (
        <ForgotPage setPage={setPage} />
      ) : (
        page == "signup" && <SignUpPage setPage={setPage} />
      )}
    </>
  );

  // return page == "login" ? (
  //   <LogInPage setPage={setPage} />
  // ) : page == "signup" ? (
  //   <SignUpPage setPage={setPage} />
  // ) : (
  //   page == "forgot" && <ForgotPage setPage={setPage} />
  // );
}
