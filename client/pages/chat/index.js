
import React, { useEffect } from 'react'
import io from 'socket.io-client'

export default function MyPage () {
  useEffect(() => {
    console.log('Connecting to server...')
    const socket = io('http://localhost:8080') // Replace with your server URL

    socket.emit('events', { id: 2, name: 'Nest' }, (data) => console.log(data))

    return () => {
      socket.disconnect()
    }
  }, [])

  return <div>My page</div>
}
