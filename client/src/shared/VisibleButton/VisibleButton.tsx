import React, {FC} from 'react';
import {Button, ButtonProps} from "@mui/material";

interface VisibleButtonProps extends ButtonProps {
    label: string;
}

const VisibleButton : FC<VisibleButtonProps> = ({label, variant = 'outlined', size = 'large', onClick, ...rest})=>{
    return (
        <div className="visible-button">
            <Button variant={variant} size={size} onClick={onClick} {...rest}>
                {label}
            </Button>
        </div>
    );
};

export default VisibleButton;
