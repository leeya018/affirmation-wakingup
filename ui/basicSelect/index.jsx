import React, { FC } from "react"

import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

// only for the images - fix
const BasicSelect = ({ handleChange, value, name, options, className }) => {
  return (
    <FormControl className={className}>
      <InputLabel id="demo-simple-select-label">{name}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Age"
        onChange={(e) => handleChange(e.target.value)}
      >
        {options.map((imageItem, key) => (
          <MenuItem key={key} value={imageItem.url}>
            {imageItem.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export default BasicSelect
