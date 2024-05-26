import React from "react";

export const ButtonC = ({ variant, functionEmint, title }) => {
  return (
    <Button
      variant={variant}
      fullWidth
      onClick={functionEmint}
      type="button"
      sx={{
        color: "white",
        textTransform: "none",
        textShadow: "2px 2px 2px grey",
      }}
      title={title}
    >
      Registrate
    </Button>
  );
};
