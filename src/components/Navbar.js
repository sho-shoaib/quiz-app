import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../Context";

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();

  const { seconds, onQuiz } = useGlobalContext();

  return (
    <>
      <AppBar position='static' sx={{ backgroundColor: "var(--main)" }}>
        <Toolbar>
          <Container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant='h6'
              component='div'
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                display: onQuiz && "none",
              }}
              onClick={() => history.push("/highscores")}
            >
              View highscores
            </Typography>
            <Typography variant='h6' component='div'>
              Time: {seconds}s
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
