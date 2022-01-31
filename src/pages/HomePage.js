import React, { useState, useEffect } from "react";
import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../Context";

const HomePage = () => {
  const history = useHistory();

  const { setStartTimer, setSeconds } = useGlobalContext();

  const handleClick = () => {
    history.push("/quiz");
    setStartTimer(true);
  };

  useEffect(() => {
    setSeconds(0);
  }, []);

  return (
    <>
      <Container sx={{ height: "90vh", display: "grid", placeItems: "center" }}>
        <Box
          className='mid-box'
          sx={{
            borderRadius: 5,
            p: 5,
            pt: 7,
            border: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Typography variant='h4' fontWeight='600'>
            Computer Quiz Challenge
          </Typography>
          <Typography>
            Try to answer to the following computer-related questions within the
            time limit.
          </Typography>
          <Typography>
            Keep in mind that incorrect answers will penalize your time by ten
            seconds
          </Typography>
          <Button
            variant='contained'
            onClick={handleClick}
            sx={{
              backgroundColor: "var(--main)",
              display: "block",
              "&:hover": { backgroundColor: "var(--main)" },
            }}
          >
            start quiz
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
