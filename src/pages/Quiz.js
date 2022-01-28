import React, { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

const Quiz = () => {
  //mui
  const theme = useTheme();
  const Xsmall = useMediaQuery(theme.breakpoints.down("sm"));

  //states
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState(null);
  let [currentQues, setCurrentQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [userAnswer, setUserAnswer] = useState(options[0]);
  const [correctAns, setCorrectAns] = useState(null);
  const [button, setButton] = useState("check answer");

  //functions
  const handleShuffle = (optionss) => {
    return optionss.sort(() => Math.random() - 0.5);
  };

  const fetchData = async () => {
    setLoading(true);
    const data = await fetch(
      "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
    );
    const res = await data.json();
    setQuestions(handleShuffle(res.results));
    setCorrectAns(res.results[currentQues].correct_answer);
    setOptions(
      handleShuffle([
        res.results[currentQues].correct_answer,
        ...res.results[currentQues].incorrect_answers,
      ])
    );
    setLoading(false);
  };

  const handleClick = () => {
    if (button === "check answer") {
      if (userAnswer === correctAns) {
        console.log(true);
      } else {
        console.log(false);
      }
      setButton("next question");
    }
    if (button === "next question") {
      setCurrentQues(currentQues + 1);
      setOptions(
        handleShuffle([
          questions[currentQues].correct_answer,
          ...questions[currentQues].incorrect_answers,
        ])
      );
      console.log(options);
      setButton("check answer");
    }
  };

  //hooks
  useEffect(() => {
    fetchData();
  }, []);

  //returns
  if (!loading) {
    return (
      <>
        <Container
          sx={{ height: "90vh", display: "grid", placeItems: "center" }}
        >
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
              maxWidth: "700px",
            }}
          >
            <Typography variant={`${Xsmall ? "h5" : "h4"}`} fontWeight='600'>
              {questions[currentQues].question}
            </Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                name='radio-buttons-group'
                onChange={(e) => setUserAnswer(e.target.value)}
              >
                {options.map((option) => {
                  return (
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
            <Button
              variant='contained'
              onClick={handleClick}
              sx={{
                backgroundColor: "var(--main)",
                display: "block",
                "&:hover": { backgroundColor: "var(--main)" },
              }}
            >
              {button}
            </Button>
          </Box>
        </Container>
      </>
    );
  }

  return <h1>Loading...</h1>;
};

export default Quiz;
