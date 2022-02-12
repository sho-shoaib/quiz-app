import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { useGlobalContext } from "../Context";

function compare(a, b) {
  if (a.time < b.time) {
    return -1;
  }
  if (a.time > b.time) {
    return 1;
  }
  return 0;
}

const HighScores = () => {
  const { setSeconds } = useGlobalContext();

  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const data = await fetch("http://localhost:8000/api/v1/highscore", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const res = await data.json();
    setScores(res.data.sort(compare));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    setSeconds(0);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Container
        sx={{ minHeight: "90vh", display: "grid", placeItems: "center" }}
      >
        <TableContainer component={Paper} sx={{ border: 1 }}>
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
              {scores.map((score) => {
                const { name, time, correct, incorrect, _id } = score;
                return (
                  <TableRow
                    key={_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {name}
                    </TableCell>
                    <TableCell>{incorrect}</TableCell>
                    <TableCell>{correct}</TableCell>
                    <TableCell>{time}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default HighScores;
