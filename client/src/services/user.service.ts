import {axiosService} from "./axios.service";
import {urls} from "../constants/urls/urls";
import {ICountry} from "../interfaces/city.interface";
import {IUser} from "../interfaces/user.interface";
import {ISale} from "../interfaces/sale.interface";

export interface IFile {
    file: string
}

export const userService = {
    countries: () =>
        axiosService.get<ICountry[]>(urls.countries),
    fileUpload: (data: FormData) =>
        axiosService.post<IFile>(urls.upload_file, data,),
    getUserById: (id:string) =>
        axiosService.get<IUser>(urls.user+id),
    getAllUserSales: () =>
        axiosService.get<ISale[]>(urls.userSales+`?limit=100&offset=1`),
    updateUserById: (id:string,data:Partial<IUser>) =>
        axiosService.patch<IUser>(urls.user+`${id}/`,data),
};