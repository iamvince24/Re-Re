import * as React from "react";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import AddButton from "./AddButton";
import BasicTextFields from "../BasicTextFields";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Option from "@mui/joy/Option";

import Stack from "@mui/joy/Stack";

import SelectBasic from "../SelectBasic";
import ListSubheader from "@mui/material/ListSubheader";

export default function AddTask({ tasks, setTasks }) {
  const [task, setTask] = useState("");

  function onChange(e) {
    setTask(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTasks((prevState) => {
      const newState = prevState;
      // find largest task number, add 1 for new task - else could end up with tasks with same id
      const maxIdVal = prevState.reduce(function (a, b) {
        return Math.max(a, b.id);
      }, -Infinity);
      // create new task
      newState.push({
        id: isFinite(maxIdVal) ? maxIdVal + 1 : 1,
        name: task,
      });
      return [...newState];
    });
    setTask("");
  }

  const handleChange = (event, newValue) => {
    // alert(`You chose "${newValue}"`);
    console.log(`You chose "${newValue}"`);
  };

  return (
    <Fragment>
      <style>
        {`
        #add-task {
            // width: 70%;
            // height: 100px;
            height:42px;
            // margin-right: 10px;
            // margin-bottom: 10px;
            border-radius: 5px;
            // box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
            display: flex;
            // justify-content: space-between;
            gap: 10px
        }
        .css-1wmuzea-JoySelect-listbox {
            z-index: 10000;
        }
        .css-z4k887>:not(style){
            margin: 0px;
        }
      `}
      </style>

      <form id="add-task" onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "10px" }}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="select-task">Notebook</InputLabel>
              <Select
                labelId="select-task"
                id="select-task"
                value={task}
                label="Notebook"
                size="small"
              >
                <ListSubheader>Category 1</ListSubheader>
                {tasks &&
                  tasks.map((tsk) => (
                    <MenuItem key={tsk.id} value={tsk.id}>
                      {tsk.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <BasicTextFields value={task} onChange={onChange} setTask={setTask} />
          <Button
            type="submit"
            sx={{
              height: "40px",
              background: "rgb(112, 132, 255, 0.1)",
              textTransform: "capitalize",
              color: "#2E4AF3",
              padding: "0px 15px",
              letterSpacing: "0.5px",
              fontWeight: "400",
            }}
          >
            Add
          </Button>
        </Box>
      </form>
    </Fragment>
  );
}
