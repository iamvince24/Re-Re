import { Fragment } from "react";
import * as React from "react";
import { Box, Container } from "@mui/system";
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LongMenu from "../component/LongMenu";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E4AF3",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#E0C2FF",
      light: "#F5EBFF",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#47008F",
    },
    background: {
      main: "#F3D9D2",
    },
  },
});

function Notebook() {
  const [open, setOpen] = React.useState(true);

  const handleClick = (event) => {
    event.stopPropagation();
    setOpen(!open);
  };

  return (
    <Fragment>
      <List
        sx={{
          width: "100%",
          bgcolor: "#F3D9D2",
          color: "#2E4AF3",
          py: "3px",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          onClick={handleClick}
          sx={{
            display: "flex",
            alignContent: "center",
            padding: "0px 0px 0px 8px",
          }}
        >
          {open ? <ExpandLess /> : <ExpandMore />}
          <ImportContactsIcon sx={{ color: "#2E4AF3", mx: "10px" }}>
            <InboxIcon />
          </ImportContactsIcon>
          <ListItemText
            primary="Inbox"
            primaryTypographyProps={{ fontWeight: 700, pt: "2px" }}
          />
          <LongMenu />
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                py: 0.25,
                pr: 0,
                ml: 6,
              }}
            >
              <ArticleOutlinedIcon
                sx={{
                  color: "#2E4AF3",
                  marginRight: "10px",
                }}
              >
                <StarBorder />
              </ArticleOutlinedIcon>
              <ListItemText
                primary="Starred"
                primaryTypographyProps={{ pt: "1px" }}
              />
              <LongMenu />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Fragment>
  );
}

export default function Menu(props) {
  //   const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    props.setOpen(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "20%",
        minWidth: "350px",
        padding: "0px 20px",
        overflow: "scroll",
        bgcolor: "#F3D9D2",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "15px",
        }}
      >
        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            "&:hover": {
              backgroundColor: "rgba(112, 132, 255, 0.15)",
            },
          }}
        >
          <Avatar
            alt="Your Name"
            src=""
            variant="square"
            size="sm"
            sx={{
              fontWeight: "900",
              backgroundColor: "#2E4AF3",
              color: "white",
            }}
          />
          <Typography
            fontSize={"lg"}
            sx={{
              fontWeight: 700,
              color: "#2E4AF3",
              textTransform: "capitalize",
            }}
          >
            Vince Guo
          </Typography>
        </Button>
        <IconButton onClick={handleDrawerClose} sx={{ marginRight: "-15px" }}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </Box>

      <ThemeProvider theme={theme}>
        <ButtonGroup
          size="small"
          variant="outlined"
          sx={{
            width: "100%",
          }}
        >
          <Button
            sx={{
              width: "100%",
              color: "#2E4AF3",
            }}
            onClick={() => props.setMode(false)}
          >
            Notebook
          </Button>
          <Button
            sx={{ width: "100%", color: "#2E4AF3" }}
            onClick={() => props.setMode(true)}
          >
            Gannt
          </Button>
        </ButtonGroup>
      </ThemeProvider>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "10px 0px 25px",
        }}
      >
        <Typography
          fontSize={"md"}
          sx={{
            fontWeight: 500,
            color: "#7084FF",
            p: "0px 6px 0px 8px",
          }}
        >
          Notebooks
        </Typography>
        <IconButton aria-label="delete">
          <ControlPointIcon fontSize="small" sx={{ color: "#7084FF" }} />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "10px",
        }}
      ></Box>
      <Notebook />
      <Notebook />
      <Notebook />
      <Notebook />
      <Notebook />
    </Box>
  );
}
