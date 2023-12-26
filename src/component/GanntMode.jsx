import { Fragment } from "react";
import * as React from "react";
import { Box } from "@mui/system";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CustomSeparator from "../component/CustomSeparator";
import DatePickerValue from "../component/DatePickerValue";
import TextareaRef from "../component/TextareaRef";

export default function GanntMode() {
  return (
    <Fragment>
      <Box
        sx={{
          height: `calc(100vh - 64px)`,
          marginBottom: "50px",
        }}
      >
        <Box sx={{ padding: "0px 20px" }}>
          <Typography
            gutterBottom
            sx={{
              fontWeight: 900,
              fontSize: "36px",
              color: "#2E4AF3",
              textTransform: "capitalize",
              textAlign: "left",
            }}
          >
            GanntMode
          </Typography>
          <Box
            sx={{
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <DatePickerValue />
            <Button
              sx={{
                background: "rgb(112, 132, 255, 0.1)",
                textTransform: "capitalize",
                color: "#2E4AF3",
                height: "42px",
                padding: "0px 15px",
                marginTop: "-10px",
              }}
            >
              To Editor
            </Button>
          </Box>
        </Box>
        <Divider flexItem sx={{ margin: "20px 0px 0px" }} />
        <TextareaRef />
      </Box>
    </Fragment>
  );
}
