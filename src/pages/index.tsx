import { type NextPage } from "next";
import { signIn } from "next-auth/react";
const Home: NextPage = () => {
  return (
    <>
      <div>
        <button onClick={() => void signIn("discord")}>signin</button>
      </div>
    </>
  );
};

export default Home;
