import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { ReactElement } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";

export interface ModalWrapperProps {
  toggled: boolean;
  content: ReactElement<any, any>;
  close: () => void;
  padding?: number;
  color?: string;
}

export function ModalWrapper({
  content,
  toggled = false,
  close = () => {},
  padding = 4,
  color = "primary.main",
}: ModalWrapperProps) {
  return (
    <Modal
      open={toggled}
      onClose={close}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 0,
          width: {
            xs: "100%",
            lg: "auto",
          },
          height: {
            xs: "100%",
            lg: "auto",
          },
          color,
        }}
      >
        <IconButton
          size="large"
          edge="end"
          aria-label="Menu"
          aria-haspopup="true"
          onClick={close}
          color="inherit"
          sx={{
            padding: 0,
            position: "absolute",
            right: "2rem",
            top: "1rem",
            zIndex: 100
          }}
        >
          <CloseOutlinedIcon color="inherit" />
        </IconButton>
        <Box
          sx={{
            p: padding,
          }}
        >
          {content}
        </Box>
      </Box>
    </Modal>
  );
}
