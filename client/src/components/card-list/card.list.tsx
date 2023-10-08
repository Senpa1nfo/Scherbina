import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Box, CardActionArea, CardActions, Container} from '@mui/material';
import Link from "../link/link.tsx";
import style from '../post/post.module.css';
import {useContext, useEffect, useState} from "react";
import {PostItem} from "../../models/PostItem.ts";
import {Context} from "../../main.tsx";

const CardList = () => {

    const {store} = useContext(Context)
    const [cardList, setCardList] = useState<PostItem[] | undefined>([])

    const fetchPosts = async () => {
        const res = await store.getAll()
        setCardList(res)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <Container sx={{paddingBlock: '64px', display: 'flex', flexWrap: 'wrap', gap: '48px', margin: '0 auto', justifyContent: 'center'}}>
            {cardList?.map(element => (
                <Link key={'/' + element.path} href={element.path} sx={{textDecoration: 'none'}}>
                    <Card sx={{ width: 300 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`http://localhost:5000/${element.image}`}
                                alt={element.image_alt}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {element.title}
                                </Typography>
                                <Typography
                                    height='60px'
                                    variant="body2"
                                    color="text.secondary"
                                    className={style.card_descr}
                                >
                                    {element.description}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{padding: '0 16px 16px', justifyContent: 'space-between'}}>
                                <Box display={'flex'} alignItems={'center'} gap={'4px'}>
                                    <VisibilityIcon/>
                                    <Typography variant="body2" color="text.secondary">
                                        {element.view_count}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        {element.date.slice(0, 10)}
                                    </Typography>
                                </Box>
                            </CardActions>
                        </CardActionArea>
                    </Card>
                </Link>
            ))}
        </Container>
    );
};

export default CardList;