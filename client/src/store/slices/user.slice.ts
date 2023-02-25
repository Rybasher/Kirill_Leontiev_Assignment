import {createAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {userService} from "../../services/user.service";
import {ICity, ICountry} from "../../interfaces/city.interface";
import {IUser} from "../../interfaces/user.interface";
import {ISale} from "../../interfaces/sale.interface";


interface IInitialState {
    user: Partial<IUser>;
    isLoginActive: boolean;
    error: string ;
    cities: ICity[];
    country: Partial<ICountry>;
    sales: ISale[];
    countries: ICountry[];
    statusFile: string ;
}

const initialState: IInitialState = {
    user: {},
    error: '',
    isLoginActive: false,
    cities: [],
    country: {},
    countries: [],
    sales: [],
    statusFile: '',
};

export const getAllCountries = createAsyncThunk<ICountry[] | undefined>(
    'country/getAllCountries',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.countries();
            return data;
        } catch (e) {
            rejectWithValue(e);
        }
    },
);
export const getAllUserSales = createAsyncThunk<ISale[] | undefined>(
    'sale/getAlSales',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.getAllUserSales();
            return data;
        } catch (e) {
            rejectWithValue(e);
        }
    },
);

export const getUserById = createAsyncThunk<IUser | undefined, string>(
    'user/getUserById',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await userService.getUserById(id);
            return data;
        } catch (e) {
            rejectWithValue(e);
        }
    },
);

export const fileUpload = createAsyncThunk<any, FormData>(
    'user/FileUpload',
    async (data, {rejectWithValue}) => {
        try {
            let axiosResponse = await userService.fileUpload(data);
            return axiosResponse.data;
        } catch (e) {
            rejectWithValue(e);
        }
    },
);

export const updateUserById = createAsyncThunk<IUser | undefined, { id: string, user: Partial<IUser> }>(
    'update/updateUserById',
    async ({id, user}, {rejectWithValue}) => {
        try {
            const {data} = await userService.updateUserById(id, user);
            return data;
        } catch (e) {
            rejectWithValue(e);
        }
    },
);
export const setSnackbarShown = createAction<boolean>('snackbar/setSnackbarShown');
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getAllCountries.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.countries = action.payload
            }
        );
        builder.addCase(
            getUserById.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.user = action.payload
            }
        );
        builder.addCase(
            getAllUserSales.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.sales = action.payload.results
            }
        );
        builder.addCase(
            fileUpload.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.error = action.payload.error
                state.statusFile = action.payload.status
            }
        );
        builder.addCase(setSnackbarShown, (state) => {
            state.statusFile = '';
            state.error = '';
        });
    },
})

const userReducer = userSlice.reducer;
export {userReducer};