import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Quiz from "./pages/Quiz";
import HighScores from "./pages/HighScores";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route exact path='/quiz'>
          <Quiz />
        </Route>
        <Route exact path='/highscores'>
          <HighScores />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
