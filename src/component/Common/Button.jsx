import * as React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

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
          fontSize: isSmall500 ? "8px" : "10px",
          letterSpacing: "0.5px",
        }}
        color="primary"
      >
        {children}
      </Button>
    </Link>
  );
};

export { LinkButton };
