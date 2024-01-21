import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Card from "@mui/material/Card";
import { ThemeProvider } from "@mui/material/styles";
import appPic from "../assets/img/app.png";
import NotebookMode from "../assets/img/NotebookMode.png";
import GanttMode from "../assets/img/GanttMode.png";
import Typography from "@mui/material/Typography";

export default function LabTabs(props) {
  const { theme } = props;
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: "100%",
            typography: "body1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "150px 0px 50px",
          }}
        >
          <Typography
            textAlign={"center"}
            sx={{ fontSize: "50px", fontWeight: 900, margin: "10px 0px 20px" }}
          ></Typography>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                className="tabContainer"
              >
                <Tab
                  className="tab1"
                  label="Gantt Mode"
                  value="1"
                  sx={{
                    bgcolor: `${theme.palette.primary.main}`,
                    textTransform: "capitalize",
                  }}
                />
                <Tab
                  className="tab2"
                  label="Notebook Mode"
                  value="2"
                  sx={{
                    bgcolor: `${theme.palette.primary.main}`,
                    textTransform: "capitalize",
                    fontWeight: 500,
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Typography
                color="primary"
                textAlign={"center"}
                sx={{ margin: "10px 0px 20px" }}
              >
                這裡放簡單的功能介紹
              </Typography>
              <Box
                sx={{
                  padding: "7.5px",
                  background: "rgb(200, 200, 200, 0.05)",
                  borderRadius: "5px",
                }}
              >
                <Card
                  sx={{
                    width: "75vw",
                    aspectRatio: "72/45",
                    backgroundImage: `url(${GanttMode})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundColor: "transparent",
                    // borderLeft: "3px solid rgba(255, 255, 255, 0.2)",
                    // borderTop: "3px solid rgba(255, 255, 255, 0.2)",
                  }}
                />
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Typography
                color="primary"
                textAlign={"center"}
                sx={{ margin: "10px 0px 20px" }}
              >
                這裡放簡單的功能介紹
              </Typography>
              <Box
                sx={{
                  padding: "7.5px",
                  background: "rgb(200, 200, 200, 0.05)",
                  borderRadius: "5px",
                }}
              >
                <Card
                  sx={{
                    width: "75vw",
                    aspectRatio: "72/45",
                    backgroundImage: `url(${NotebookMode})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundColor: "transparent",
                    // borderLeft: "3px solid rgba(255, 255, 255, 0.2)",
                    // borderTop: "3px solid rgba(255, 255, 255, 0.2)",
                  }}
                />
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </ThemeProvider>
      <style>
        {`
            .MuiButtonBase-root.Mui-selected{
              color: ${theme.palette.colorOption.white.solid};
              font-weight: 700;
              background-color: rgb(155, 155, 155, 0.5);
              border: none;
              border-radius: 5px;
            }
            .tabContainer {
              background-color: red;
              border-radius: 5px;
              padding: 5px;
              background-color: rgb(155, 155, 155, 0.5);
            }
            .tab1, .tab2, .tab3 {
              background: none;
              font-weight: 700;
            }
            .tab1:hover, .tab2:hover {
              background: rgb(155, 155, 155, 0.2);
            }
            .tab1 {
              border-top-left-radius: 5px;
              border-bottom-left-radius: 5px;
            }
            .tab3 {
              border-top-right-radius: 5px;
              border-bottom-right-radius: 5px;
            }
            .MuiTabs-indicator {
              display: none;
            }
        `}
      </style>
    </Fragment>
  );
}
