import { useState } from 'react';
import {
    Box,
    Modal,
    Stack,
    TextField,
    Typography,
    IconButton,
} from '@mui/material';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { useForm } from 'react-hook-form';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
};

export const LoginForm = ({ setUserData, setGamer }) => {
    const [openModal, setOpenModal] = useState(true);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setOpenModal(false);
        setUserData(data);
        setGamer(data.userName);
    };

    return (
        <Modal open={openModal}>
            <Stack
                spacing={2}
                component='form'
                sx={style}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography color='#686868' variant='h4'>
                    Hi! enter you name and room id
                </Typography>
                <TextField
                    {...register('userName', { required: true })}
                    fullWidth
                    id='userName'
                    label='Name'
                    variant='outlined'
                />
                <TextField
                    {...register('roomCode', { required: true })}
                    fullWidth
                    id='roomCode'
                    label='Room code'
                    variant='outlined'
                />
                <div style={{ textAlign: 'center' }}>
                    <IconButton type='submit'>
                        <VideogameAssetIcon fontSize='large' />
                    </IconButton>
                </div>
            </Stack>
        </Modal>
    );
};
