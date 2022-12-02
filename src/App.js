import io from 'socket.io-client';
import { LoginForm } from './components/LoginForm';
import { Game } from './pages/Game';
import { BASE_URL } from './config';
import { useEffect, useState } from 'react';

export const App = () => {
    const [userData, setUserData] = useState(null);
    const [socket, setSocket] = useState(null);
    const [gamer, setGamer] = useState(null);

    const connect = () => {
        const socket = io.connect(BASE_URL);
        setSocket(socket);
    };

    useEffect(() => {
        connect();
    }, []);

    useEffect(() => {
        if (userData && socket) {
            const {roomCode, userName} = userData

            socket.emit('joinRoom', {roomCode, userName});
        }
    }, [userData]);

    return (
        <>
            <LoginForm
                setUserData={setUserData}
                setGamer={setGamer}
                userData={userData}
            />
            {gamer && <Game userData={userData} socket={socket} />}
        </>
    );
};
