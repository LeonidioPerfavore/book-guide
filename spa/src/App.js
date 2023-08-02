import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/home/Home";
import Books from "./pages/books/Books";
import Authors from "./pages/authors/Authors";
import Book from "./pages/books/Book";
import Author from "./pages/authors/Author";

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
          <Route path="/book/:id" element={<Book />}/>
          <Route path="/author/:id" element={<Author />}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
  );
}

export default App;
