import React, {FC, useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import Header from "../Header/Header";
import {Button} from "@mui/material";
import {useAppDispatch} from "../../hooks/redux";
import { userLogout} from "../../store/slices/auth.slice";


const LayoutComponent: FC = () => {
    const navigate = useNavigate()
    const access = localStorage.getItem('access') as string;
    const refresh = localStorage.getItem('refresh') as string;
    const userId = localStorage.getItem('userId') as string;

    const handleLogout = async () => {
        await dispatch(userLogout(refresh));
    }
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!access){
            navigate('/auth/login');
        }else {
            navigate(`/user/${userId}/statistics`)
        }
    }, [access])
    return (
        <section>
            <Header/>
            {!access && (
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <h1>Hello Welcome to Kirill Leontiev Assignment</h1>
                    </div>
                )}

            {access && (
                <div className={'auth-button'}>
                    <Button variant="outlined" size="large" onClick={() => {
                        if (access) {
                            handleLogout().then(() => navigate('auth/login'))
                        } else {
                            navigate('auth/login')
                        }
                    }}>
                        {!access ? 'LOGIN' : 'LOGOUT'}
                    </Button>
                </div>
            )
            }
            <div className={'Layout'}>
                <Outlet/>
            </div>
        </section>
    );
};

export {LayoutComponent};