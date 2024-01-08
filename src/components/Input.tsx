import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Input as AntDInput, Space } from 'antd';
import { InputNumber as InputNumAntD } from 'antd';
import React from 'react';
import { Typography } from '.';
const { Search, TextArea: AntDTextArea } = AntDInput;

function Input({ label, value, setValue, variant = 'outlined', ...props }: any) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                onChange={(e: any) => setValue(e.target.value)}
                label={label}
                variant={variant}
                value={value}
                {...props}
            />
        </Box>
    )
}


const TextArea = ({ label, value, setValue, rows = 6, ...props }: any) => {
    const onChangeHandle = (e: any) => { setValue(e.target.value) }
    return <>
        <Typography label={label} />
        <AntDTextArea onChange={onChangeHandle} value={value} style={{ width: '100%' }} rows={rows} />
    </>
}

const SearchInput = ({ value, setValue, placeholder, onSearch }: any) => {
    const onChangeHandle = (e: any) => {
        setValue(e.target.value)
    }
    const onSearchHandle = (value: string) => onSearch(value);
    return <Search
        placeholder={placeholder}
        allowClear
        enterButton="Search"
        value={value}
        onChange={onChangeHandle}
        onSearch={onSearchHandle}
    />
}


const InputNumber = ({ prefix, suffix, value, setValue, placeholder }: any) => {
    const onChangeHandle = (value: any) => {
        setValue(value)
    }
    return <Space>
        <InputNumAntD addonBefore={prefix} min={1} max={10} onChange={onChangeHandle} value={value} />
    </Space>
};


export { Input, TextArea, SearchInput, InputNumber }