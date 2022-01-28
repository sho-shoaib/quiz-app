import React from "react";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";

const Navbar = () => {
  return (
    <>
      <AppBar position='static' sx={{ backgroundColor: "var(--main)" }}>
        <Toolbar>
          <Container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant='h6'
              component='div'
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              View highscores
            </Typography>
            <Typography variant='h6' component='div'>
              Time: 0
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
