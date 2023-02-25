import React, {useState} from 'react';
import './UserLogin.css'
import {useNavigate} from "react-router-dom";
import {userLogin} from "../../store/slices/auth.slice";
import {ILogin} from "../../interfaces/login.interface";
import {useForm} from 'react-hook-form';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import {Input} from 'antd';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import Snackbar from "../../shared/SnackBar/Snackbar";


const UserLogin = () => {


    const userStore = useAppSelector((state) => state.authReducer);
    const {error} = userStore;


    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [password, setPassword] = useState('');
    const [snackbar, setSnackbar] = useState(false);

    const checkLogin: any = async () => {
        const access = localStorage.getItem('access');
        const userId = localStorage.getItem('userId');
        if (access) {
            navigate(`/user/${userId}/statistics`)
        } else {
            return
        }
    };

    const {register, handleSubmit, reset} = useForm<ILogin>();

    const onSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSnackbar(false)
        setPassword(e.target.value);
    };


    const onSubmitForm = async (data: ILogin) => {
        data.password = password;
        await dispatch(userLogin(data))
        setSnackbar(true)
        await checkLogin()
        reset();
    };

    return (
        <div style={{marginTop: '100px'}}>
            <form onSubmit={handleSubmit(onSubmitForm)} className="logIn-form">
                <div className={'logIn-content'}>
                    <label>Username</label>
                    <input  type="text" {...register('username')} required/>
                </div>

                <div className={'logIn-content'}>
                    <label>Password</label>
                    <Input.Password
                        {...register('password')}
                        onChange={onSetPassword}
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>
                        }
                        required
                    />
                </div>

                <div className="btn-container">
                    <button >Sign In</button>
                </div>
            </form>

            <div className="btn-container">
                <button onClick={() => navigate('/auth/registration')}>Registration</button>
            </div>
            {snackbar && (
            <Snackbar type={"error"} message={error}></Snackbar>)}
        </div>
    );
};

export default UserLogin;