import {Avatar, Box, Button, Container, Divider, Input, InputAdornment, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Link from '../link/link.tsx'

const Header = () => {
    // @ts-ignore
    return (
        <Box position={'fixed'} zIndex={2} width={'100dvw'} top={0} bgcolor={'#FFF'}>
            <Container maxWidth="lg" sx={{padding: '16px 0'}}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Input
                        placeholder="Search..."
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon color={'primary'}/>
                            </InputAdornment>
                        }
                    />
                    <Link href={'/'} sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center'}}>
                        <Typography variant={'h5'} component={'h1'}>
                            Scherbina's blog
                        </Typography>
                    </Link>
                    <Box display={'flex'} gap={'48px'}>
                        <Link href={'/create'} sx={{color: 'inherit', textDecoration: 'none'}}>
                            <Button variant='outlined' sx={{height: '100%'}}>Create post</Button>
                        </Link>
                        <Avatar alt='IS' children='IS'/>
                    </Box>
                </Box>
            </Container>
            <Divider/>
        </Box>
    );
};

export default Header;