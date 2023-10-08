import {Box, Button, Container, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalItem from '../modal/modal.item.tsx';
import Link from "../link/link.tsx";
import {Context} from "../../main.tsx";
import {PostItem} from "../../models/PostItem.ts";

const Post = () => {

    const {path} = useParams();

    const {store} = useContext(Context)
    const [postItem, setPostItem] = useState<PostItem>()

    const fetchPosts = async () => {
        if (path) {
            const res = await store.getOne(path)
            setPostItem(res)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Container sx={{
            paddingBlock: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
        }}>
            <ModalItem open={open} handleClose={handleClose} path={path}/>
            {postItem ? (
                <>
                    <Box width="90%" display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        <Link href={`/${postItem.path}/edit`}>
                            <Button size="small" variant="contained" sx={{marginRight: '8px'}}>
                                <EditIcon fontSize="small" sx={{color: '#FFF'}}/>
                            </Button>
                        </Link>
                        <Typography variant="h3" component="h1" color="text.primary">
                            {postItem.title}
                        </Typography>
                        <Button size="small" variant="contained" color='error' onClick={handleOpen}>
                            <DeleteIcon fontSize="small" sx={{color: '#FFF'}}/>
                        </Button>
                    </Box>
                    <Box
                        marginBlock={'24px'}
                        maxWidth={'90%'}
                        component={'img'}
                        src={`http://localhost:5000/${postItem.image}`}
                        alt={postItem.image_alt}
                        borderRadius={'20px'}
                        border={'2px dashed'}
                        borderColor={'text.secondary'}
                    >
                    </Box>
                    <Typography width="90%" padding="16px" variant="body1" color="text.secondary">
                        {postItem.description}
                    </Typography>
                    <Box sx={{width: '90%',padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Box display={'flex'} alignItems={'center'} gap={'4px'}>
                            <VisibilityIcon/>
                            <Typography variant="body2" color="text.secondary">
                                {postItem.view_count}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                {postItem.date.slice(0, 10)}
                            </Typography>
                        </Box>
                    </Box>
                </>
            ) : (
                <Typography variant="body1" color="text.secondary">
                    This page does not exist
                </Typography>
            )}
        </Container>
    );
};

export default Post;