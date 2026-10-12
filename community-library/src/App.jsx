import { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Books from "./Books.jsx";
import Dashboard from "./Dashboard.jsx";
import Transactions from "./Transactions.jsx";
import Users from "./Users.jsx";
import { loadBooks, loadJSON, saveJSON, startingBooks } from "./bookStorage.js";
import "./App.css";

function App() {
  const [books, setBooks] = useState(loadBooks);
  const [users, setUsers] = useState(() => loadJSON("users", []));
  const [transactions, setTransactions] = useState(() => loadJSON("transactions", []));
  const [currentUser, setCurrentUser] = useState(() => loadJSON("currentUser", null));

  useEffect(() => saveJSON("books", books), [books]);
  useEffect(() => saveJSON("users", users), [users]);
  useEffect(() => saveJSON("transactions", transactions), [transactions]);
  useEffect(() => saveJSON("currentUser", currentUser), [currentUser]);

  function resetDemoData() {
    setBooks(startingBooks);
    setUsers([]);
    setTransactions([]);
    setCurrentUser(null);
  }

  return (
    <BrowserRouter>
      <header className="topbar">
        <NavLink className="brand" to="/">Community Library</NavLink>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/books">Books</NavLink>
          <NavLink to="/transactions">Transactions</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
        <div className="signed-in">{currentUser ? `Signed in: ${currentUser.name}` : "Guest session"}</div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard books={books} />} />
          <Route path="/books" element={<Books books={books} setBooks={setBooks} />} />
          <Route path="/transactions" element={<Transactions books={books} setBooks={setBooks} transactions={transactions} setTransactions={setTransactions} currentUser={currentUser} />} />
          <Route path="/users" element={<Users users={users} setUsers={setUsers} currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="*" element={<Dashboard books={books} />} />
        </Routes>
        <footer><span>Community Library · Data is saved in this browser</span><button className="link-button" onClick={resetDemoData}>Reset demo data</button></footer>
      </main>
    </BrowserRouter>
  );
}

export default App;
