document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("book-input").addEventListener("submit", (e) => {
    e.preventDefault();
    addBook();
  });

  document.getElementById("searchBookTitle").addEventListener("keyup", (e) => {
    const searchString = e.target.value.toUpperCase();
    searchBook(searchString);
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(RENDER_EVENT, function () {
  const incomplete = document.getElementById("incompleteBookList");
  const complete = document.getElementById("completeBookList");
  incomplete.innerHTML = "";
  complete.innerHTML = "";

  for (const book of books) {
    const bookContent = createBook(book);
    if (book.isCompleted) {
      complete.append(bookContent);
    } else {
      incomplete.append(bookContent);
    }
  }

  countApp();
});

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});
