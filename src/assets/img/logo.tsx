import SvgIcon from "@mui/material/SvgIcon";
import React, { Fragment } from "react";
import { ThemeProvider, Theme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

interface LogoProps {
  width: string | number;
  height: string | number;
  theme: Theme;
  color: string;
  isSmallScreenW500: boolean;
}

export default function Logo(props: LogoProps) {
  return (
    <SvgIcon>
      <svg
        // width="237"
        // height="183"
        // viewBox="0 0 237 183"
        width={`${props.width}`}
        height={`${props.height}`}
        viewBox={`0 0 ${props.width} ${props.height}`}
        fill={`${props.theme.palette.primary.main}`}
        // color="primary"
        color={`${props.color}`}
        xmlns="http://www.w3.org/2000/svg"
        sx={{
          fontSize: props.isSmallScreenW500 ? "30px" : "45px",
          paddingTop: props.isSmallScreenW500 ? "5px" : "none",
        }}
      >
        <path d="M217.805 143.614C203.799 157.006 185.378 165.818 164.946 167.646C166.285 172.536 167 177.685 167 183H237C237 167.006 229.491 152.767 217.805 143.614Z" />
        <path d="M210.932 139.089C197.902 150.988 180.922 158.635 162.189 159.834C158.52 151.423 152.915 144.051 145.937 138.28C159.666 122.758 168 102.352 168 80C168 44.5024 146.982 13.9138 116.712 0H157C158.069 1.86891e-07 159.133 0.0209623 160.192 0.0624996C202.895 1.73792 237 36.8861 237 80C237 101.22 228.738 120.51 215.256 134.829C213.869 136.303 212.426 137.724 210.932 139.089Z" />
        <path d="M159 183C159 180.277 158.782 177.605 158.363 175C156.36 162.544 149.756 151.627 140.35 144.047C124.594 158.898 103.36 168 80 168V160C124.183 160 160 124.183 160 80C160 35.8172 124.183 7.62939e-06 80 0H0V183H159Z" />
      </svg>
    </SvgIcon>
  );
}
