import {createAsyncThunk, createSlice, PayloadAction,} from '@reduxjs/toolkit';
import {authService} from "../../services/auth.service";
import {ILogin} from "../../interfaces/login.interface";
import {IRegistration} from "../../pages/UserRegistration/UserRegistration";
import {stringify} from "querystring";
import {AxiosError} from "axios";


interface IInitialState {
    userId: number;
    access: string | undefined;
    refresh: string | undefined;
    status?: number | string;
    isLoginActive: boolean;
    isRegisterActive: boolean;
    error: string;
    userInfo:Partial<ILogin>
}

const initialState: IInitialState = {
    userId: 0,
    access: '',
    refresh: '',
    error: '',
    status: 200,
    isLoginActive: false,
    isRegisterActive: false,
    userInfo:{},
};

export const userLogin = createAsyncThunk<Response, ILogin>(
    'auth/login',
    async (user: ILogin,{rejectWithValue}) => {
        try {
            const axiosResponse = await authService.login(user);
            return axiosResponse.data
        } catch (error) {
          return rejectWithValue(error) ;
        }
    },
);

export const userLogout = createAsyncThunk<any, string>(
    'auth/logout',
    async (refresh) => {
        try {
            let axiosResponse = await authService.logout(refresh);
            return axiosResponse.data
        } catch (error) {
            return error;
        }
    },
);

export const userRegistration = createAsyncThunk<any, IRegistration>(
    'auth/registration',
    async (user, {rejectWithValue}) => {
        try {
            return await authService.register(user);
        } catch (e) {
            return  rejectWithValue(e);
        }
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoginActive: (state) => {
            state.isLoginActive = !state.isLoginActive;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            userLogin.rejected,
            (state, action:any) => {
                state.error = action.payload.response.data.message
            }
        );
        builder.addCase(
            userLogin.fulfilled,
            (state, action: PayloadAction<any>) => {
                const access_token = action.payload.access;
                const refresh_token = action.payload.refresh;
                state.access = access_token;
                state.refresh = refresh_token;
                state.isLoginActive = false;
                localStorage.setItem('access', access_token || '');
                localStorage.setItem('refresh', refresh_token || '');
                const userId = action.payload.user_id
                localStorage.setItem('userId', userId || '');
            }
        );
        builder.addCase(
            userRegistration.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.userInfo=action.payload
            }
        );
        builder.addCase(userLogout.fulfilled, (state, action: PayloadAction<any>) => {
            state.access = undefined
            state.refresh = undefined
            localStorage.clear()
        });
        builder.addCase(
            userRegistration.rejected,
            (state, action:any) => {
                state.error = action.payload.response.data?.username?.join('') || action.payload.response.data?.email?.join('')
            }
        );
    }
})

const authReducer = authSlice.reducer;
export {authReducer};
export const {setLoginActive} =
    authSlice.actions;