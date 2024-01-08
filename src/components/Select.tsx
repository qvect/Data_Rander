
import { Select, Space } from 'antd';
import { Typography } from '.'
import React from 'react'

export default function SelectComponent({ label, value, setValue, options }: any) {
    const handleChange = (value: any) => {
        setValue(value as string)
    }

    return (
        <Space>
            <Typography label={label} />
            <Select
                placeholder={label}
                style={{ minWidth: 120 }}
                value={value}
                onChange={handleChange}
                options={options}
            />
        </Space>
    )
}
