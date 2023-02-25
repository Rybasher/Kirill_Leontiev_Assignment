export interface ICity {
    id: number;
    name: string;
    lat: number;
    lng: number;
    country: number;
}

export interface ICountry {
    id: number;
    cities: ICity[];
    name:string;
    iso2: string;
    iso3: string;
}

