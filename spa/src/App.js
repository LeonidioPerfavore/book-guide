import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/home/Home";
import Books from "./pages/books/Books";
import Authors from "./pages/authors/Authors";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={
              <Home/>
          }/>
          <Route path="/books" element={
              <Books/>
          }/>
          <Route path="/authors" element={
              <Authors/>
          }/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
  );
}

export default App;
