export const startingBooks = [
  { id: 1, title: "Bitleng la Rasenate", author: "S. M. Guma", genre: "Sesotho Literature", isbn: "9780796004673", quantity: 4 },
  { id: 2, title: "Bitsolebe ke Seromo", author: "P. T. M. Zamista", genre: "Novel", isbn: "9780796010216", quantity: 3 },
  { id: 3, title: "Ha Maru a Rwalellana", author: "K. P. D. Maphalla", genre: "Novel", isbn: "9780796031051", quantity: 1 },
  { id: 4, title: "Qodi", author: "M. E. Makhapa", genre: "Folklore", isbn: "9780796066053", quantity: 5 },
  { id: 5, title: "Monamoli", author: "Moeketsi A. Lesitsi", genre: "Sesotho Literature", isbn: "9991122672", quantity: 2 },
];

export function loadJSON(key, fallback) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key));
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

export function saveJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The app remains usable for this session if browser storage is unavailable.
  }
}

export function loadBooks() {
  const saved = loadJSON("books", null);
  if (Array.isArray(saved)) return saved;
  saveJSON("books", startingBooks);
  return startingBooks;
}
