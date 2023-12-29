import { useState } from "react";
import AddButton from "./AddButton";
import BasicSelect from "../BasicSelect";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TaskDataPicker from "../TaskDataPicker";
import { Button } from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";

export default function AddTaskDuration({ tasks, setTaskDurations }) {
  const [task, setTask] = useState("");
  const [startDate, setStartDate] = useState("2022-01-01");
  const [endDate, setEndDate] = useState("2022-01-03");

  const onChange = (id) => (e) => {
    // const { value, id } = e.target;
    const { value } = e.target;
    console.log(e.target);
    console.log(value, id);

    if (id === "select-task") {
      setTask(value);
    }
    if (id === "start-date") {
      setStartDate(value);
    }
    if (id === "end-date") {
      setEndDate(value);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (task === "") return;
    const timeStamp = Date.now();
    const newTaskDuration = {
      id: timeStamp,
      start: startDate,
      end: endDate,
      task: parseInt(task),
    };
    setTaskDurations((prevState) => {
      const newState = prevState;
      return [...newState, newTaskDuration];
    });
  }

  return (
    <form id="add-task-duration" onSubmit={handleSubmit}>
      <div className="inner-form-container">
        <fieldset id="task" style={{ paddingLeft: "0px" }}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="select-task">Notebook</InputLabel>
              <Select
                labelId="select-task"
                id="select-task"
                value={task}
                label="Notebook"
                onChange={onChange("select-task")}
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
        </fieldset>
        <fieldset id="date">
          <TaskDataPicker
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </fieldset>

        <Button
          sx={{
            background: "rgb(112, 132, 255, 0.1)",
            textTransform: "capitalize",
            color: "#2E4AF3",
            height: "42px",
            padding: "0px 15px",
            letterSpacing: "0.5px",
          }}
          type="submit"
        >
          Add
        </Button>
      </div>

      <style>{`
        #add-task-duration {
          // width: 70%;
          // height: 100px;
          // margin-right: 10px;
          // margin-bottom: 10px;
          border-radius: 5px;
          // box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
        }

        .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root {
          top: -7px;
        }

        .inner-form-container {
          display: flex;
          flex-wrap: nowrap;
          gap: 10px;
        }

        .fieldset-container {
          display: flex;
          align-items: center;
          flex-direction: row;
          flex-wrap: wrap;
        }

        fieldset {
          display: flex;
          align-items: center;
          border: none;
          // padding: 5px 7px;
        }

        fieldset label {
          // margin-right: 10px;
        }

        // input[type="date"] {
        //   padding: 10px 5px;
        // }
      `}</style>
    </form>
  );
}
