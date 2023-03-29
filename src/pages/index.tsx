import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      <div>
        {!session ? (
          <button onClick={() => void signIn("discord")}>signin</button>
        ) : (
          <button onClick={() => void signOut()}>signout</button>
        )}
      </div>
    </>
  );
};

export default Home;
