import React, {FC, useState} from 'react';
import {Autocomplete, TextField} from "@mui/material";

interface IChildProps {
    label: string,
    options?: any[],
    handle?: (args: string) => void
    handleValue?: (args: any) => void
}

const SelectInput: FC<IChildProps> = ({
                                          label,
                                          options,
                                          handle,handleValue
                                      }) => {
    if (!options)
        options = [{id: 1, name: 'Option 1'}, {id: 3, name: 'Option 2'}];

    const getArr = (length: number) => Array.from({length}, (_, i) => ({id: i + 1, name: (i + 1).toString()}));
    if (label === 'Age') {
        options = getArr(100)
    }
    const [value, setValue] = useState<string | null>(options[0]);
    const [inputValue, setInputValue] = useState('');


    return (
        <div>
            <Autocomplete
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option) => (option.name ? option.name : '')}
                value={value || null}
                onChange={(event: any, newValue: string | null) => {
                    setValue(newValue);
                    if (handleValue)
                        handleValue(newValue)
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    if (handle)
                        handle(newInputValue)
                }}
                id="controllable-states-demo"
                options={options}
                renderOption={(props, option) => {
                    return (
                        <li {...props} key={option.id}>
                            {option.name}
                        </li>
                    );
                }}
                renderInput={(params) => <TextField {...params} label={label}/>}
            />
        </div>
    );
};

export default SelectInput;