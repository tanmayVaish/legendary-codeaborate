import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useCallback } from "react";
import { tags as t } from '@lezer/highlight';
import { darcula } from '@uiw/codemirror-theme-darcula';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  const otherUsers = [
    {
      name: "Tushar Agarwal",
      image: "https://avatars.githubusercontent.com/u/10214027?v=4",
    },
    {
      name: "Dhruv Garg",
      image: "https://avatars.githubusercontent.com/u/10214026?v=4",
    },
  ]

  const onChange = useCallback((value, viewUpdate) => {
    console.log('value:', value);
  }, []);

  // if session navigate to dashboard
  if (session) {
    return (
      <div className={"h-screen flex"}>
        <div className={"p-5 flex flex-col bg-dracula-background"}>
          <div className={""}>
            <div className={"font-bold text-dracula-pink text-2xl"}>Legendary Codeaborate</div>
            <div className={"text-dracula-yellow"}>Welcome {session.user?.name}</div>
          </div>

          <div className={"border-b border-dracula-orange my-2"}></div>

          <div className={"flex-1"}>
            <div className={"font-bold text-dracula-green text-lg"}>Connected User</div>

            <div className={"flex flex-wrap w-72 justify-center"}>
              <div className={"flex flex-col justify-center items-center p-3"}>
                <img src={session.user?.image} className={"rounded-full w-10 h-10"} />
                <div className={"text-dracula-yellow"}>{session.user?.name}</div>
              </div>

              {otherUsers.map((user) => (
                <div className={"flex flex-col justify-center items-center p-3"}>
                  <img src={user?.image} className={"rounded-full w-10 h-10"} />
                  <div className={"text-dracula-yellow"}>{user?.name}</div>
                </div>
              ))}
            </div>

          </div>

          <div className={"flex flex-col gap-2 justify-center p-2"}>
            <button
              className="bg-dracula-cyan text-dracula-backgraound font-bold py-2 px-4 rounded w-full"
            >Copy Room ID</button>
            <button
              className="bg-dracula-red text-dracula-backgraound font-bold py-2 px-4 rounded w-full"
            >Leave Room</button>
          </div>
        </div>
        <div className={"flex-1 bg-dracula-currentLine"}>
          <CodeMirror
            value="console.log('hello world!');"
            height="100vh"
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
            theme={darcula}
          />
        </div>
      </div>
    )
  };

  if (!session) {
    return (
      <div className={"h-screen grid place-content-center bg-dracula-background"}>
        <div>
          <div className="font-bold text-dracula-pink text-7xl p-2">Legendary Codeaborate</div>
          <div className={"flex justify-center p-2"}>
            <button
              className="bg-dracula-green text-dracula-background font-bold py-2 px-4 rounded"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    )
  };
}
