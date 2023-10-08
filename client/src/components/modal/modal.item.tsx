import {Box, Typography, Modal, Button} from "@mui/material";
import {useContext} from "react";
import {Context} from "../../main.tsx";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 370,
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px'
};

interface ModalProps {
    path: string | undefined
    open: boolean
    handleClose: () => void
}

const ModalItem = ({open, handleClose, path}: ModalProps) => {

    const {store} = useContext(Context)

    const deletePost = (path: string | undefined) => {
        if (path) {
            store.delete(path)
                .finally(() => {
                window.location.pathname = ''
            })
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Do you want to delete this post?
                </Typography>
                <Box>
                    <Button
                        variant='outlined'
                        color='error'
                        sx={{marginRight: '48px'}}
                        onClick={() => deletePost(path)}
                    >
                        Yes
                    </Button>
                    <Button variant='outlined' onClick={handleClose}>
                        No
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalItem;