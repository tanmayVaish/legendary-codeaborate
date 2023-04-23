import { toast } from 'react-hot-toast'
import io from 'socket.io-client'

const initSocket = async () => {

    const socket = io(
        process.env.SERVER_URL || 'http://localhost:8080',
    )

    socket.on('connect', () => {
        console.log('connected')
    })
    
    socket.on('disconnect', () => {
        console.log('disconnected')
    })
    
    return socket
}

export default initSocket