import { useState } from "react";

const blankUser = { name: "", membershipId: "", role: "" };

function Users({ users, setUsers, currentUser, setCurrentUser }) {
  const [form, setForm] = useState(blankUser);
  const [editId, setEditId] = useState(null);
  const [loginId, setLoginId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function changeField(event) { setForm((current) => ({ ...current, [event.target.name]: event.target.value })); }
  function clearForm() { setForm(blankUser); setEditId(null); setError(""); }

  function saveUser(event) {
    event.preventDefault();
    const name = form.name.trim();
    const membershipId = form.membershipId.trim();
    if (!name || !membershipId || !form.role) { setError("Complete every field before saving."); return; }
    const duplicate = users.some((user) => user.membershipId.toLowerCase() === membershipId.toLowerCase() && user.id !== editId);
    if (duplicate) { setError("That membership ID is already in use."); return; }
    const details = { name, membershipId, role: form.role };
    if (editId !== null) {
      setUsers((current) => current.map((user) => user.id === editId ? { ...user, ...details } : user));
      if (currentUser?.id === editId) setCurrentUser((user) => ({ ...user, ...details }));
    } else setUsers((current) => [...current, { id: Date.now(), ...details }]);
    clearForm();
  }

  function editUser(user) { setEditId(user.id); setForm({ name: user.name, membershipId: user.membershipId, role: user.role }); setError(""); }
  function deleteUser(user) {
    if (!window.confirm(`Delete ${user.name} from user records?`)) return;
    setUsers((current) => current.filter((item) => item.id !== user.id));
    if (currentUser?.id === user.id) setCurrentUser(null);
    if (editId === user.id) clearForm();
  }

  function login(event) {
    event.preventDefault();
    const user = users.find((item) => item.membershipId.toLowerCase() === loginId.trim().toLowerCase());
    if (!user) { setMessage("No user found with that membership ID. Add the user below first."); return; }
    setCurrentUser(user); setMessage(`Welcome, ${user.name}.`); setLoginId("");
  }

  return (
    <section className="page">
      <div className="page-heading"><div><p className="eyebrow">PEOPLE</p><h1>User management</h1><p className="muted">Maintain library memberships and start a user session.</p></div></div>
      <section className="panel"><div className="section-heading"><div><h2>Member login</h2><p className="muted">Use the membership ID registered below.</p></div></div>
        <form className="inline-form" onSubmit={login}><label>Membership ID<input value={loginId} onChange={(event) => setLoginId(event.target.value)} required /></label><button className="primary-button" type="submit">Sign in</button>{currentUser && <button className="secondary-button" type="button" onClick={() => { setCurrentUser(null); setMessage("You have signed out."); }}>Sign out</button>}</form>
        {message && <p className="success-message" role="status">{message}</p>}
      </section>
      <section className="panel"><div className="section-heading"><div><h2>{editId === null ? "Add a user" : "Update user"}</h2><p className="muted">Membership IDs must be unique.</p></div></div>
        <form className="form-grid" onSubmit={saveUser}>
          <label>Name<input name="name" value={form.name} onChange={changeField} required /></label>
          <label>Membership ID<input name="membershipId" value={form.membershipId} onChange={changeField} required /></label>
          <label>Role<select name="role" value={form.role} onChange={changeField} required><option value="">Select a role</option><option value="Member">Member</option><option value="Librarian">Librarian</option></select></label>
          <div className="form-actions"><button className="primary-button" type="submit">{editId === null ? "Add user" : "Save changes"}</button>{editId !== null && <button className="secondary-button" type="button" onClick={clearForm}>Cancel</button>}</div>
        </form>{error && <p className="form-error" role="alert">{error}</p>}
      </section>
      <div className="section-heading list-heading"><div><h2>Members</h2><p className="muted">{users.length} registered {users.length === 1 ? "user" : "users"}</p></div></div>
      <div className="table-wrap"><table><thead><tr><th>Name</th><th>Membership ID</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>{users.length ? users.map((user) => <tr key={user.id}><td className="strong-cell">{user.name}{currentUser?.id === user.id && <span className="current-tag">Current session</span>}</td><td>{user.membershipId}</td><td>{user.role}</td><td className="actions"><button className="table-button" onClick={() => editUser(user)}>Edit</button><button className="table-button danger-button" onClick={() => deleteUser(user)}>Delete</button></td></tr>) : <tr><td colSpan="4" className="empty-state">No users registered yet.</td></tr>}</tbody>
      </table></div>
    </section>
  );
}

export default Users;
