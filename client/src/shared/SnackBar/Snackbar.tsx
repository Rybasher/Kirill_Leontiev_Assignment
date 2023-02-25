import React from 'react';
import { ToastContainer, toast, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SnackbarComponentProps {
    type: 'error' | 'success';
    message: string | null;
}

function SnackbarComponent(props: SnackbarComponentProps) {
    const { type, message } = props;

    const toastType = type === 'error' ? 'error' : 'success';
    const options = {
        position: 'top-center' as ToastPosition,
        autoClose: 6000,
        closeOnClick: true,
        draggable: true,
    };

    toast(message, {
        position: options.position,
        autoClose: options.autoClose,
        type: toastType,
        hideProgressBar: true,
        closeOnClick: options.closeOnClick,
        pauseOnHover: true,
        draggable: options.draggable,
    });

    return (
        <ToastContainer
            position={options.position}
            autoClose={options.autoClose}
            closeOnClick={options.closeOnClick}
            draggable={options.draggable}
        />
    );
}

export default SnackbarComponent;
