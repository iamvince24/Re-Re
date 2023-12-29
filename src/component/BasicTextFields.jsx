import * as React from "react";
import { Fragment } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields(props) {
  return (
    <Fragment>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Adding Notebook"
          variant="outlined"
          // variant="standard"
          value={props.value}
          onChange={props.onChange}
          sx={{ height: "100%" }}
          size="small"
        />
      </Box>
      <style>
        {`
      .MuiInputBase-root MuiOutlinedInput-root .MuiInputBase-colorPrimary .MuiInputBase-formControl .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
       background: red;
      }
      `}
      </style>
    </Fragment>
  );
}
