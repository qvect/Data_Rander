import { Tab, Tabs } from '@mui/material'
import { SyntheticEvent } from 'react'
import React from 'react'

const TabsSelect = ({ options, value, setValue }: any) => {
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <div>
      <Tabs color="primary" value={value} onChange={handleChange}>
        {options.map((el: any, id: number) => {
          return <Tab value={el.value} label={el.label} key={id} />
        })}
      </Tabs>
    </div>
  )
}

export default TabsSelect
