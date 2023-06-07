import cover from "../../../assets/authcover.jpg";
import { StyledMain } from "./AuthLayout.styles";
import { Box } from "@mui/material";

export function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <StyledMain>
      <Box
        sx={{
          width: { xs: "100%", lg: "62.5%" },
        }}
        style={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={cover}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
      <Box
        sx={{
          position: { xs: "absolute", lg: "relative" },
          padding: { xs: "20px 30px", lg: "50px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: { lg: "center" },
        }}
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          flex: 1,
        }}
      >
        <h1>SOCNET</h1>
        {children}
      </Box>
    </StyledMain>
  );
}
