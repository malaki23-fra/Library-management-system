import { useState } from "react";

const emptyForm = { title: "", author: "", genre: "", isbn: "", quantity: "" };

function Books({ books, setBooks }) {
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function cancelEdit() { setForm(emptyForm); setEditId(null); setError(""); }

  function handleSubmit(event) {
    event.preventDefault();
    const { title, author, genre, isbn, quantity } = form;
    const qty = Number(quantity);
    if (![title, author, genre, isbn].every((value) => value.trim()) || quantity === "") {
      setError("Complete every field before saving."); return;
    }
    if (!Number.isInteger(qty) || qty < 0) { setError("Quantity must be a whole number of 0 or more."); return; }
    const details = { title: title.trim(), author: author.trim(), genre: genre.trim(), isbn: isbn.trim(), quantity: qty };
    if (editId !== null) setBooks((current) => current.map((book) => book.id === editId ? { ...book, ...details } : book));
    else setBooks((current) => [...current, { id: Date.now(), ...details }]);
    cancelEdit();
  }

  function editBook(book) {
    setEditId(book.id);
    setForm({ title: book.title, author: book.author, genre: book.genre, isbn: book.isbn, quantity: String(book.quantity) });
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteBook(id) {
    if (!window.confirm("Delete this book from the catalogue?")) return;
    setBooks((current) => current.filter((book) => book.id !== id));
    if (editId === id) cancelEdit();
  }

  return (
    <section className="page">
      <div className="page-heading"><div><p className="eyebrow">COLLECTION</p><h1>Book management</h1><p className="muted">Add new titles or update the catalogue details.</p></div></div>
      <section className="panel"><div className="section-heading"><div><h2>{editId === null ? "Add a book" : "Update book"}</h2><p className="muted">Enter the book details and available quantity.</p></div></div>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>Title<input name="title" value={form.title} onChange={updateField} required /></label>
          <label>Author<input name="author" value={form.author} onChange={updateField} required /></label>
          <label>Genre<input name="genre" value={form.genre} onChange={updateField} required /></label>
          <label>ISBN<input name="isbn" value={form.isbn} onChange={updateField} required /></label>
          <label>Initial quantity<input name="quantity" type="number" min="0" step="1" value={form.quantity} onChange={updateField} required /></label>
          <div className="form-actions"><button className="primary-button" type="submit">{editId === null ? "Add book" : "Save changes"}</button>{editId !== null && <button className="secondary-button" type="button" onClick={cancelEdit}>Cancel</button>}</div>
        </form>{error && <p className="form-error" role="alert">{error}</p>}
      </section>
      <div className="section-heading list-heading"><div><h2>Catalogue</h2><p className="muted">{books.length} {books.length === 1 ? "title" : "titles"}</p></div></div>
      <div className="table-wrap"><table><thead><tr><th>Title</th><th>Author</th><th>Genre</th><th>ISBN</th><th>Quantity</th><th>Actions</th></tr></thead>
        <tbody>{books.length ? books.map((book) => <tr key={book.id}><td className="strong-cell">{book.title}</td><td>{book.author}</td><td>{book.genre}</td><td>{book.isbn}</td><td>{book.quantity}</td><td className="actions"><button className="table-button" onClick={() => editBook(book)}>Edit</button><button className="table-button danger-button" onClick={() => deleteBook(book.id)}>Delete</button></td></tr>) : <tr><td colSpan="6" className="empty-state">No books in the catalogue yet.</td></tr>}</tbody>
      </table></div>
    </section>
  );
}

export default Books;
