import {Box, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import './User.css'
import {useNavigate} from "react-router-dom";
import SelectInput from "../../shared/SelectInput/SelectInput";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fileUpload, getAllCountries, setSnackbarShown, updateUserById} from "../../store/slices/user.slice";
import {IUser} from "../../interfaces/user.interface";
import {ICity, ICountry} from "../../interfaces/city.interface";
import VisibleButton from "../../shared/VisibleButton/VisibleButton";
import SnackbarComponent from "../../shared/SnackBar/Snackbar";

const User = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const userId = localStorage.getItem('userId')
    const genderOptions = [{id: 1, name: 'male'}, {id: 2, name: 'female'}]

    const userStore = useAppSelector((state) => state.userReducer);
    const {countries, statusFile, error} = userStore;

    const [countrySelect, setCountry] = useState<string>();
    const [countryValue, setCountryValue] = useState<ICountry>();
    const [ageSelect, setAge] = useState<string>();
    const [genderSelect, setGender] = useState<string>();
    const [citySelect, setCity] = useState<string>();
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [fileInput, setFileInput] = useState<string | Blob>('');
    const [fileContents, setFileContents] = useState<string | ArrayBuffer | null>('');


    let cities: ICity[] | undefined = []

    const handleCountry = (countrySelect: string) => {
        setCountry(countrySelect);
    }
    const handleCountryValue = (countryValue: ICountry) => {
        setCountryValue(countryValue);
    }

    const handleAge = (ageSelect: string) => {
        setAge(ageSelect);
    }
    const handleGender = (genderSelect: string) => {
        setGender(genderSelect);
    }
    const handleCity = (citySelect: string) => {
        setCity(citySelect);
    }

    useEffect(() => {
        dispatch(getAllCountries())

    }, [])

    if (countryValue) {
        cities = countryValue.cities
    }

    function updateUser() {
        const updateUser: Partial<IUser> = {
            name: name,
            email: email,
            country: countrySelect,
            age: ageSelect,
            gender: genderSelect,
            city: citySelect
        }
        if (userId)
            dispatch(updateUserById({id: userId, user: updateUser}))
        navigate('statistics')
    }

    const handleFileInput = (event: any) => {
        const file = event.target.files[0];
        setFileInput(file)
        const reader = new FileReader();
        reader.onload = () => {
            setFileContents(reader.result);
        };
        reader.readAsText(file);
    };

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append('file', fileInput);
        await dispatch(fileUpload(formData)).then(() => {
            setTimeout(() => {
                    dispatch(setSnackbarShown(false))
                }, 2000
            )
        })
    }

    return (
        <div className={'data-container'}>
            <VisibleButton onClick={() => navigate('statistics')} label={'Statistic User'}></VisibleButton>
            <h3 className={'district-header'}>User</h3>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': {margin: '10px 10px 10px 0', width: '25ch'},
                }}
                className={'form-state'}
                noValidate
                autoComplete="off"
            >
                <div className={'container-inputs'}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Name"
                        style={{flexGrow: '3'}}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <div style={{display: "flex"}}>
                        <SelectInput label={'Gender'} options={genderOptions} handle={handleGender}/>
                        <SelectInput label={'Age'} handle={handleAge}/>
                    </div>
                </div>
                <div className={'container-inputs'}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Email"
                        style={{flexGrow: '3'}}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <div style={{display: "flex"}}>
                        <SelectInput label={'Country'} options={countries} handleValue={handleCountryValue}
                                     handle={handleCountry}/>
                        <SelectInput label={'City'} options={cities} handle={handleCity}/>
                    </div>
                </div>
                <VisibleButton label={'Update User Data'} onClick={() => updateUser()}></VisibleButton>
            </Box>

            <h3 className={'district-header'}>Input Data</h3>

            <div>
                <div className="download-input">
                    <div className="custom-file">
                        <input
                            id="inputFile"
                            type="file"
                            lang="en"
                            className="custom-file-input"
                            onChange={handleFileInput}
                        />
                    </div>
                    <VisibleButton label={' Upload File'} onClick={uploadFile}></VisibleButton>
                </div>
                <div className="area-input">
                    <TextField
                        defaultValue={fileContents}
                        id="outlined-multiline-static"
                        multiline
                        style={{width: '100%', height: '100%'}}
                        rows={4}
                    />
                </div>
            </div>
            {statusFile && (
                <SnackbarComponent type="success" message={statusFile} />
            )}
            {error && (
                <SnackbarComponent type="error" message={error}/>
            )}

        </div>
    );
};

export default User;