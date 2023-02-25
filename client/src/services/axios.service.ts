import axios from 'axios';
import { authService } from './auth.service';
import apiURL from "../constants/urls/urls";

export const axiosService = axios.create({ baseURL: apiURL });

export const errorInterceptor = (axiosInstance: any) => {
    axiosInstance.interceptors.response.use(
        (response: any) => {
            return response;
        },
        async (error: any) => {
            const originalConfig = error.config;
            if (error.response.status === 401) {
                originalConfig._retry = true;
                const refresh =  localStorage.getItem('refresh') as string;
                if (refresh){
                    const { data: tokenPair } = await authService.refresh(refresh);
                    localStorage.setItem('access', tokenPair.access);
                    localStorage.setItem('refresh', tokenPair.refresh);
                    return axiosService(originalConfig);
                }
            }

         await Promise.reject(error)
        },
    );
};

export const updateHeaderInterceptor = (axiosInstance: any) => {
    axiosInstance.interceptors.request.use((request: any) => {
        const access = localStorage.getItem('access');
        request.headers = {
            Authorization: `Bearer ${access}`,
        };
        return request;
    });

};

errorInterceptor(axiosService);
updateHeaderInterceptor(axiosService);