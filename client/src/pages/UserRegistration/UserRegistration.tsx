import React, {FC, useState} from 'react';
import {useForm} from 'react-hook-form';
import {userRegistration} from "../../store/slices/auth.slice";
import {Input} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {useNavigate} from "react-router-dom";
import SnackbarComponent from "../../shared/SnackBar/Snackbar";

export interface IRegistration {
    username: string;
    email: string;
    password: string;
}

const UserRegistration: FC = () => {
    const userStore = useAppSelector((state) => state.authReducer);
    const {error} = userStore;

    const {register, handleSubmit,reset} = useForm<IRegistration>();
    const dispatch = useAppDispatch();
    const [password, setPassword] = useState('');
    const [snackbar, setSnackbar] = useState(false);
    const navigate = useNavigate();
    const onSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSnackbar(false)
        setPassword(e.target.value);
    };

    const onSubmitForm = async (data: IRegistration) => {
        data.password = password;
        await dispatch(userRegistration(data)).then(value => {
            console.log(value)
            if (value.payload.status === 201) {
                navigate('/auth/login')
            }
        },);
        setSnackbar(true)
        reset()
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitForm)} className="signUp-form">
                <div className={'signUp-content'}>
                    <label>Name</label>
                    <input type="text" {...register('username')} required/>
                </div>

                <div className={'signUp-content'}>
                    <label>Email</label>
                    <input type="text" {...register('email')} required/>
                </div>

                <div className={'signUp-content'}>
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
                    <button>Sign Up</button>
                </div>
                <div className="btn-container">
                    <button onClick={() => navigate('/auth/login')}>Sign In</button>
                </div>
            </form>
            {snackbar && (
                <SnackbarComponent type={"error"} message={error}></SnackbarComponent>
            )}
        </div>
    );
};

export {UserRegistration};