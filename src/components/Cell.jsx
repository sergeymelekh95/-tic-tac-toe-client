import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const Cell = ({ item, index, handleBoard }) => {
    return (
        <Grid xs={4} onClick={() => handleBoard(index)}>
            <Item
                style={{
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <Typography
                    variant='h1'
                    component='div'
                    style={{
                        width: 150,
                        height: 150,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {item}
                </Typography>
            </Item>
        </Grid>
    );
};
