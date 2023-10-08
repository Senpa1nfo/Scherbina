import {Container, Grid, Paper, Box, Typography, TextField, Button} from "@mui/material";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import style from './workspace.module.css';
import {useParams} from "react-router-dom";
import {Context} from "../../main.tsx";

interface WorkspaceProps {
    isEditing: boolean
}

const Workspace = ({isEditing}: WorkspaceProps) => {

    const {path} = useParams()
    const {store} = useContext(Context)

    const [file, setFile] = useState<File | undefined>()
    const [image, setImage] = useState<string | undefined>()
    const [imageAlt, setImageAlt] = useState<string | undefined>()
    const [url, setUrl] = useState<string | undefined>()
    const [title, setTitle] = useState<string | undefined>()
    const [description, setDescription] = useState<string | undefined>()

    const fetchPosts = async () => {
        if (path) {
            const res = await store.getOne(path)
            setImage(`http://localhost:5000/${res?.image}`)
            setImageAlt(res?.image_alt)
            setUrl(res?.path)
            setTitle(res?.title)
            setDescription(res?.description)
        }
    }

    useEffect(() => {
        if (isEditing) {
            fetchPosts()
        }
    }, [])

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFile(file);

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };

            reader.readAsDataURL(file);
        } else {
            setImage('');
        }
    };

    const handleCreate = () => {
        const formData = new FormData()

        if (file && imageAlt && url && title && description) {
            formData.append('img', file)
            formData.append('imageAlt', imageAlt)
            formData.append('title', title)
            formData.append('description', description)
            store.create(url, formData)
            .finally(() => {
                window.location.pathname = ''
            })
        }
    }

    const handleUpdate = () => {
        const formData = new FormData()

        if (imageAlt && url && title && description) {
            formData.append('imageAlt', imageAlt)
            formData.append('title', title)
            formData.append('description', description)
            if (file) {
                formData.append('img', file)
            }
            store.edit(url, formData)
                .finally(() => {
                    window.location.pathname = ''
                })
        }
    }

    return (
        <Container sx={{
            paddingBlock: '64px',
            display: 'flex',
            alignItems: 'center',
        }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    height='200px'
                >
                    <Grid item xs={4}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Image alt"
                            value={imageAlt || ''}
                            onChange={(event) => setImageAlt(event.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Url"
                            value={url || ''}
                            onChange={(event) => setUrl(event.target.value)}
                            disabled={isEditing}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <input id='input' type="file" accept="image/*" onChange={handleImageChange} hidden/>
                        <label htmlFor="input">
                            <Paper sx={{height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                                {image ? (
                                    <img
                                        src={image}
                                        alt='Uploaded'
                                        className={style.img}
                                    />
                                ) : (
                                     <Typography variant={'h5'}>Upload the image</Typography>
                                )}
                            </Paper>
                        </label>
                    </Grid>
                    <Grid container item xs={8} spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Title"
                                value={title || ''}
                                onChange={(event) => setTitle(event.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={4}
                                value={description || ''}
                                onChange={(event) => setDescription(event.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {isEditing ? (
                            <Button variant='contained' fullWidth onClick={handleUpdate}>
                                Update
                            </Button>
                        ) : (
                            <Button variant='contained' fullWidth onClick={handleCreate}>
                                Create
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Workspace;