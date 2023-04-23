import React, { useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

const CreateRoom = ({ newRoom, setNewRoom }: {
    newRoom: boolean,
    setNewRoom: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const { data: session } = useSession();
    const router = useRouter()

    const [roomID, setRoomID] = React.useState<string>("");

    return (
        <div className={"h-screen grid place-content-center bg-dracula-background"}>
            <div className={"bg-dracula-background flex justify-between w-screen p-2 absolute top-0"}>
                <div>
                    <span className={"text-dracula-purple text-xl"}>Welcome</span>{" "}
                    <span className={"text-dracula-orange text-3xl"}>{session?.user?.name}</span>
                </div>
                <div>
                    <button onClick={() => signOut()} className={"bg-dracula-red text-dracula-foreground rounded-md px-2 py-1"}>Sign Out</button>
                </div>
            </div>

            <div className={"flex flex-col gap-4 bg-dracula-selection p-10 border-dracula-foreground border rounded-lg"}>
                <h1 className={"text-4xl text-dracula-pink font-bold"}>Legendary Codeaborate</h1>

                <div className={"flex flex-col gap-2"}>
                    <input
                        onChange={(e) => setRoomID(e.target.value)}
                        className={"p-2"}
                        type={"text"}
                        placeholder={newRoom ? "Room Name" : "Room ID"}
                    />
                    <button
                        onClick={() => {
                            if (newRoom) {
                                router.push(`/editor/${roomID}`)
                            } else {
                                router.push(`/editor/${roomID}`)
                            }
                        }}
                        className={"p-2 bg-dracula-green text-dracula-selection rounded-md"}>{newRoom ? "Create Room" : "Join Room"}</button>
                </div>

                {newRoom ?
                    < p className={"text-left flex gap-1 justify-end select-none"}>
                        <span className={"text-dracula-orange"}>
                            Already have a room?
                        </span>
                        <span
                            onClick={() => setNewRoom(!newRoom)}
                            className={"text-dracula-green font-bold cursor-pointer underline"}
                        >
                            Join a room!
                        </span>
                    </p> :
                    < p className={"text-left flex gap-1 justify-end select-none"}>
                        <span className={"text-dracula-orange"}>Don't have a room?</span>
                        <span
                            onClick={() => setNewRoom(!newRoom)}
                            className={"text-dracula-green font-bold cursor-pointer underline"}
                        >Create a new room!</span>
                    </p>
                }
            </div>

        </div >
    )
}

export default CreateRoom