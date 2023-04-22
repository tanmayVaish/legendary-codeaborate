import { useState } from "react";
import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import CreateRoom from "./components/CreateRoom";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  const [newRoom, setNewRoom] = useState(false);

  // if session navigate to dashboard

  if (session) {
    return <CreateRoom newRoom={newRoom} setNewRoom={setNewRoom} />
  }
  else {
    return (
      <div className={"h-screen grid place-content-center bg-dracula-background gap-4"}>
        <div>
          <div className="font-bold text-dracula-pink text-7xl p-2">Legendary Codeaborate</div>
          <p className={
            "text-2xl text-center text-dracula-foreground"
          }>
            <span className="text-dracula-purple">Welcome</span> to the <b className={"text-dracula-yellow"}>BEST</b> <span className="text-dracula-orange">Code Collaboration Platform</span>  ever!
          </p>
        </div>
        <div className={"flex justify-center p-2"}>
          <button
            className="bg-dracula-green text-dracula-background font-bold py-2 px-4 w-60 rounded"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </div>
      </div>
    )
  }
}
