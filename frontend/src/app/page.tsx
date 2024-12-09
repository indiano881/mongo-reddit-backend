import Image from "next/image";
import SignUpPage from "./auth/sign-up/page";
import LogInPage from "./auth/log-in/page";

export default function Home() {
  return (
    <div>
      <h1>FRONTEND</h1>
      <SignUpPage />
      <h2>------------------------</h2>
      <LogInPage />
    </div>
  );
}
