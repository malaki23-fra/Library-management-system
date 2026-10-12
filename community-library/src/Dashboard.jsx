function Dashboard({ books }) {
  const totalTitles = books.length;
  const totalCopies = books.reduce((sum, book) => sum + book.quantity, 0);
  const lowStock = books.filter((book) => book.quantity < 2).length;

  return (
    <section className="page">
      <div className="page-heading"><div><p className="eyebrow">OVERVIEW</p><h1>Library dashboard</h1><p className="muted">A quick look at your collection and current availability.</p></div></div>
      <div className="stats-grid">
        <article className="stat-card"><span>Book titles</span><strong>{totalTitles}</strong><small>Different titles in the catalogue</small></article>
        <article className="stat-card"><span>Copies available</span><strong>{totalCopies}</strong><small>Total copies currently in stock</small></article>
        <article className="stat-card warning-card"><span>Low stock titles</span><strong>{lowStock}</strong><small>Fewer than 2 copies available</small></article>
      </div>
      <div className="section-heading"><div><h2>Book availability</h2><p className="muted">Low stock rows are highlighted.</p></div></div>
      <div className="table-wrap"><table><thead><tr><th>Title</th><th>Author</th><th>Genre</th><th>ISBN</th><th>Available</th></tr></thead>
        <tbody>{books.length ? books.map((book) => <tr key={book.id} className={book.quantity < 2 ? "low-stock" : ""}><td className="strong-cell">{book.title}</td><td>{book.author}</td><td>{book.genre}</td><td>{book.isbn}</td><td><span className={`quantity-pill ${book.quantity < 2 ? "quantity-low" : ""}`}>{book.quantity}</span></td></tr>) : <tr><td colSpan="5" className="empty-state">No books yet. Add a title from the Books page.</td></tr>}</tbody>
      </table></div>
    </section>
  );
}

export default Dashboard;
