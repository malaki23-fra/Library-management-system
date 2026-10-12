import { useState } from "react";

function Transactions({ books, setBooks, transactions, setTransactions, currentUser }) {
  const [selectedBook, setSelectedBook] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  function updateStock(type) {
    const qty = Number(amount);
    const book = books.find((item) => item.id === Number(selectedBook));

    if (!book) {
      setError("Choose a book first.");
      return;
    }

    if (!Number.isInteger(qty) || qty < 1) {
      setError("Enter a whole number greater than zero.");
      return;
    }

    if (type === "borrow" && qty > book.quantity) {
      setError(`Only ${book.quantity} ${book.quantity === 1 ? "copy is" : "copies are"} available.`);
      return;
    }

    const newQuantity = type === "add" ? book.quantity + qty : book.quantity - qty;
    setBooks((current) =>
      current.map((item) => item.id === book.id ? { ...item, quantity: newQuantity } : item)
    );

    const entry = {
      id: Date.now(),
      bookTitle: book.title,
      type,
      quantity: qty,
      date: new Date().toISOString(),
      user: currentUser?.name || "Guest"
    };

    setTransactions((current) => [entry, ...current]);
    setAmount("");
    setError("");
  }

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">STOCK CONTROL</p>
          <h1>Transactions</h1>
          <p className="muted">Record new arrivals and borrowed copies.</p>
        </div>
      </div>

      <section className="panel">
        <div className="section-heading">
          <div>
            <h2>Record a transaction</h2>
            <p className="muted">Stock changes are saved to the book catalogue.</p>
          </div>
        </div>

        <div className="form-grid transaction-form">
          <label>
            Book
            <select value={selectedBook} onChange={(event) => {
              setSelectedBook(event.target.value);
              setError("");
            }}>
              <option value="">Select a book</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} ({book.quantity} available)
                </option>
              ))}
            </select>
          </label>

          <label>
            Quantity
            <input type="number" min="1" step="1" value={amount} onChange={(event) => setAmount(event.target.value)} />
          </label>

          <div className="form-actions">
            <button className="primary-button" onClick={() => updateStock("add")}>Add stock</button>
            <button className="secondary-button" onClick={() => updateStock("borrow")}>Borrow copies</button>
          </div>
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}
      </section>

      <div className="section-heading list-heading">
        <div>
          <h2>Transaction history</h2>
          <p className="muted">Most recent activity appears first.</p>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Date and time</th><th>Book</th><th>Action</th><th>Quantity</th><th>Recorded by</th></tr>
          </thead>
          <tbody>
            {transactions.length ? transactions.map((item) => (
              <tr key={item.id}>
                <td>{new Date(item.date).toLocaleString()}</td>
                <td className="strong-cell">{item.bookTitle}</td>
                <td>
                  <span className={`type-pill ${item.type === "add" ? "type-add" : "type-borrow"}`}>
                    {item.type === "add" ? "Stock added" : "Borrowed"}
                  </span>
                </td>
                <td>{item.quantity}</td>
                <td>{item.user}</td>
              </tr>
            )) : (
              <tr><td colSpan="5" className="empty-state">No transactions recorded yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Transactions;