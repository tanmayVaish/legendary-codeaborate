import React, { useEffect, useRef } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { darcula } from '@uiw/codemirror-theme-darcula';
import initSocket from '../../utils/socket';
import { Actions } from '../../utils/actions';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

const EditorPage = () => {

    const { data: session } = useSession();
    const socketRef = useRef(null);

    const router = useRouter();

    const roomID = router.query.id;

    const otherUsers = [
        {
            name: "Tushar ",
            image: "https://avatars.githubusercontent.com/u/10214027?v=4",
        },
        {
            name: "Dhruv Garg",
            image: "https://avatars.githubusercontent.com/u/10214026?v=4",
        },
    ]

    // SOCKET.IO
    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();

            socketRef.current.on(Actions.CONNECT_ERROR, (err: any) => {
                console.log(err.message); // not authorized
                toast.error("This didn't work.")
                router.push("/");
            });

            socketRef.current.on(Actions.CONNECT_FAILED, (err: any) => {
                console.log(err.message); // not authorized
                toast.error("This didn't work.");
                router.push("/");
            });

            socketRef.current.emit(Actions.JOIN, {
                username: session?.user?.name,
                roomID,
            });
        }

        init();
    }, [])

    if (session)
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

                            {otherUsers.map((user, i) => (
                                <div key={i} className={"flex flex-col justify-center items-center p-3"}>
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
                        <button
                            onClick={() => {
                                signOut()
                            }}
                            className="bg-dracula-red text-dracula-backgraound font-bold py-2 px-4 rounded w-full"
                        >Log Out</button>
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
                <Toaster />
            </div>
        )
}

export default EditorPage