import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { Cell } from '../components/Cell';
import { useState } from 'react';
import { useEffect } from 'react';
import { Typography } from '@mui/material';

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// const items = ['X', '0', 'X', '0', 'X', '0', 'X', '0', 'X'];
const defaultBoard = ['', '', '', '', '', '', '', '', ''];

export const Game = ({ socket, userData }) => {
    const [board, setBoard] = useState(defaultBoard);
    const [roundWon, setRoundFinish] = useState(false);
    const [player, setPlayer] = useState('X');
    const [turn, setTurn] = useState('X');
    const [opponent, setOpponent] = useState(null);

    const handleBoard = (index) => {
        if (turn === player && board[index] === '') {
            const currentPlayer = player === 'X' ? 'O' : 'X';
            setPlayer(currentPlayer);
            setTurn(currentPlayer);

            setBoard(
                board.map((value, i) => {
                    if (i === index && value === '') {
                        const { roomCode } = userData;
                        socket.emit('play', { i, roomCode });
                        return player;
                    }
                    return value;
                })
            );
        }
    };

    socket.on('updateGame', (ind) => {
        if (turn === player && board[ind] === '') {
            const currentPlayer = player === 'X' ? 'O' : 'X';
            setPlayer(currentPlayer);
            setTurn(currentPlayer);

            setBoard(
                board.map((value, i) => {
                    if (i === ind && value === '') {
                        return player;
                    }
                    return value;
                })
            );
        }
    });

    socket.on('userJoined', ({ userName }) => {
        console.log(userName, 'userJoined');
    });

    socket.on('players', (players) => {
        setOpponent(players.find((player) => player !== userData.userName));
    });

    useEffect(() => {}, [player]);

    const checkWin = () => {
        for (let i = 0; i < winConditions.length; i++) {
            const condition = winConditions[i];
            const cellA = board[condition[0]];
            const cellB = board[condition[1]];
            const cellC = board[condition[2]];

            if (cellA === '' || cellB === '' || cellC === '') {
                continue;
            }

            if (cellA === cellB && cellB === cellC) {
                setRoundFinish(true);
                break;
            }
        }
    };

    useEffect(() => {
        checkWin();
    }, [board]);

    socket.on('winner', ({ userName }) => {
        //show toas and incement wins
        console.log(userName, 'winner');
    });

    useEffect(() => {
        if (roundWon) {
            const { userName, roomCode } = userData;
            socket.emit('win', { userName, roomCode });
            setBoard(defaultBoard);
            setRoundFinish(false);
        }
    }, [roundWon]);

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '90vh',
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: 400,
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                }}
            >
                <Typography color='rgba(114 114 114)' variant='h5'>{userData.userName.toUpperCase()}</Typography>
                <Typography color='rgba(114 114 114)' variant='h5'>vs</Typography>
                <Typography color='rgba(114 114 114)' variant='h5'>{opponent?.toUpperCase()}</Typography>
            </div>
            <Grid
                style={{ backgroundColor: 'rgb(221 221 221)' }}
                sx={{ width: 500, height: 500 }}
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1 }}
            >
                {board.map((item, index) => (
                    <Cell
                        item={item}
                        key={index}
                        index={index}
                        handleBoard={handleBoard}
                    />
                ))}
            </Grid>
        </Box>
    );
};
