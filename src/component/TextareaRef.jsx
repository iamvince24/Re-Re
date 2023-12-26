import * as React from "react";
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";

export default function TextareaRef() {
  const textareaRef = React.useRef(null);

  return (
    <Stack direction="row" gap={1} sx={{ width: "100%" }}>
      <Textarea
        placeholder="Placeholder"
        slotProps={{ textarea: { ref: textareaRef } }}
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "#F3D9D2",
          margin: "10px",
          border: "none",
          boxShadow: "none",
          overflow: "scroll",
        }}
      />
    </Stack>
  );
}
