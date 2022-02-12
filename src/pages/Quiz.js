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
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../Context";

const Quiz = () => {
  const { setPauseTimer, seconds, setSeconds, setOnQuiz } = useGlobalContext();
  const history = useHistory();

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
  const [showFeedBack, setShowFeedBack] = useState(false);
  const [userRes, setUserRes] = useState(null);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const [name, setName] = useState("");
  const [add, setAdd] = useState(false);
  const [btnState, setBtnState] = useState("add score");
  const [inputErr, setInputErr] = useState(false);

  //functions
  const handleShuffle = (optionss) => {
    return optionss.sort(() => Math.random() - 0.5);
  };

  const fetchData = async () => {
    setPauseTimer(true);
    setLoading(true);
    const data = await fetch(
      "https://opentdb.com/api.php?amount=3&category=18&difficulty=easy&type=multiple"
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
    setPauseTimer(false);
  };

  const handleClick = () => {
    setShowFeedBack(true);
    if (button === "check answer") {
      setPauseTimer(true);
      if (userAnswer === correctAns) {
        setUserRes(`Correct answer!`);
      } else {
        setSeconds(seconds + 10);
        setIncorrectCount((prev) => {
          return prev + 1;
        });
        setUserRes(`Incorrect answer: ${correctAns}`);
      }
      setButton("next question");
      return;
    }
    if (button === "next question") {
      setPauseTimer(false);
      if (currentQues > 1) {
        setOnQuiz(false);
        setPauseTimer(true);
        setGameEnd(true);
        return;
      }
      setCurrentQues(currentQues + 1);
      setCorrectAns(questions[currentQues + 1].correct_answer);
      setOptions(
        handleShuffle([
          questions[currentQues + 1].correct_answer,
          ...questions[currentQues + 1].incorrect_answers,
        ])
      );
      setShowFeedBack(false);
      setButton("check answer");
      return;
    }
  };

  const handleClickEnd = () => {
    history.push("/");
  };

  const handleAdd = async () => {
    if (name === "") {
      setInputErr(true);
    }
    if (btnState === "add score" && name !== "") {
      setInputErr(false);
      setAdd(true);
      const data = await fetch("http://localhost:8000/api/v1/highscore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          incorrect: incorrectCount,
          correct: 10 - incorrectCount,
          time: seconds,
        }),
      });
      setAdd(false);
      setBtnState("view highscores");
    }
    if (btnState === "view highscores") {
      history.push("/highscores");
    }
  };

  //hooks
  useEffect(() => {
    fetchData();
  }, []);

  if (gameEnd) {
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
              border: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
              width: "100%",
              maxWidth: "700px",
            }}
          >
            <Typography variant={`${Xsmall ? "h5" : "h4"}`} fontWeight='600'>
              Your score:
            </Typography>
            <TextField
              id='standard-basic'
              label='Name'
              variant='standard'
              onChange={(e) => setName(e.target.value)}
              error={inputErr}
            />

            <TableContainer component={Paper}>
              <Table sx={{ maxWidth: "100%" }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Incorrect</TableCell>
                    <TableCell>Correct</TableCell>
                    <TableCell>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {name}
                    </TableCell>
                    <TableCell>{incorrectCount}</TableCell>
                    <TableCell>{10 - incorrectCount}</TableCell>
                    <TableCell>{seconds}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: "flex", gap: "20px" }}>
              <Button
                variant='contained'
                onClick={handleAdd}
                sx={{
                  backgroundColor: "var(--main)",
                  display: "block",
                  "&:hover": { backgroundColor: "var(--main)" },
                }}
              >
                {add ? "adding..." : btnState}
              </Button>
              <Button
                variant='contained'
                onClick={handleClickEnd}
                sx={{
                  backgroundColor: "var(--main)",
                  display: "block",
                  "&:hover": { backgroundColor: "var(--main)" },
                }}
              >
                home
              </Button>
            </Box>
          </Box>
        </Container>
      </>
    );
  }

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
              border: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
              width: "100%",
              maxWidth: "700px",
              position: "relative",
            }}
          >
            <Typography sx={{ position: "absolute", right: 10, top: 10 }}>
              {currentQues + 1}
            </Typography>
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
                      key={uuidv4()}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
            {showFeedBack && (
              <Typography
                backgroundColor={`${
                  userAnswer === correctAns ? "#00e676" : "#ff1744"
                }`}
                padding={1}
                borderRadius={1}
              >
                {userRes}
              </Typography>
            )}
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
