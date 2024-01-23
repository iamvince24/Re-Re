import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

// const BootstrapButton = styled(Button)({
//   boxShadow: "none",
//   textTransform: "none",
//   fontSize: 16,
//   //   padding: "6px 12px",
//   border: "1px solid",
//   lineHeight: 1.5,
//   backgroundColor: "#0063cc",
//   borderColor: "#0063cc",
//   fontFamily: [
//     "-apple-system",
//     "BlinkMacSystemFont",
//     '"Segoe UI"',
//     "Roboto",
//     '"Helvetica Neue"',
//     "Arial",
//     "sans-serif",
//     '"Apple Color Emoji"',
//     '"Segoe UI Emoji"',
//     '"Segoe UI Symbol"',
//   ].join(","),
//   "&:hover": {
//     // backgroundColor: "#0069d9",
//     // borderColor: "#0062cc",
//     // boxShadow: "none",
//   },
//   "&:active": {
//     boxShadow: "none",
//     backgroundColor: "#0062cc",
//     borderColor: "#005cbf",
//   },
//   "&:focus": {
//     boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
//   },
// });

const LinkButton = ({ to, children, isSmall500, theme }) => {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Button
        size="small"
        variant="contained"
        sx={{
          color: `${theme.palette.secondary.main}`,
          fontWeight: 700,
          boxShadow: "none",
          border: "none",
          transition: "all 0.1s ease",
          whiteSpace: "nowrap",
          // fontSize: isSmall500 ? "10px" : "small",
          fontSize: isSmall500 ? "8px" : "10px",
        }}
        color="primary"
      >
        {children}
      </Button>
    </Link>
  );
};

export { LinkButton };
