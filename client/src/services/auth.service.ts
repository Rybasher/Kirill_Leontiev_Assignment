import {axiosService} from "./axios.service";
import {urls} from "../constants/urls/urls";
import {ILogin} from "../interfaces/login.interface";
import {ITokensPair} from "../interfaces/token.interface";
import {IRegistration} from "../pages/UserRegistration/UserRegistration";

export const authService = {
    login: (data: ILogin) =>
        axiosService.post<any>(urls.login, data),
    refresh: (refresh: string) =>
        axiosService.post<ITokensPair>(urls.refresh, {refresh}),
    logout: (refresh:string) => axiosService.post<string>(urls.logout,{refresh}),
    register: (data: IRegistration) =>
        axiosService.post<IRegistration>(urls.register, data),
};