import React from "react";
// import { Button, ButtonProps } from "@mui/material";
import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface AppButtonProps extends ButtonProps {
  loading?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  loading = false,
  children,
  ...rest
}) => {
  return (
    <Button
      variant="contained"
      disableElevation
      {...rest}
    >
      {loading ? "Loading..." : children}
      <ArrowForwardIcon/>
    </Button>
  );
};

export default AppButton;
