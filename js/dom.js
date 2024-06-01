const addBook = () => {
  const title = document.getElementById("input-bookTitle").value;
  const author = document.getElementById("input-bookAuthor").value;
  const year = document.getElementById("input-yearBook").value;
  const isCompleted = document.getElementById("input-bookIsComplete").checked;
  const object = {
    id: +new Date(),
    title: title,
    author: author,
    year: year,
    isCompleted: isCompleted,
  };

  books.push(object);
  document.dispatchEvent(new Event(RENDER_EVENT));
  updateDataFromStorage();
};

const createBook = (book) => {
  const bookItems = document.createElement("article");
  bookItems.classList.add("book-items");
  bookItems.innerHTML = "";

  if (book.isCompleted) {
    bookItems.innerHTML = `
          <h3>${book.title}</h3>
          <p>Author: ${book.author}</p>
          <p>Year: ${book.year}</p>
          <div class="action">
              <button class="incomplete" onclick="if(confirm('Are you sure you changed this data?')) {moveToUnCompleted(${book.id})}">
                  - Not Finished
              </button>
              <button class="trash" onclick="if(confirm('Are you sure you deleted this data?')) {removeBookFromapp(${book.id})}">
                  <img class="icon" src="assets/img/delete.png" />
              </button>
          </div>`;
  } else {
    bookItems.innerHTML = `
          <h3>${book.title}</h3>
          <p>Author: ${book.author}</p>
          <p>Year: ${book.year}</p>
          <div class="action">
              <button class="complete" onclick="if(confirm('Are you sure you changed this data?')) {moveToCompleted(${book.id})}">
                  + Finished Reading
              </button>
              <button class="trash" onclick="if(confirm('Are you sure you deleted this data?')) {removeBookFromapp(${book.id})}">
                  <img class="icon" src="assets/img/delete.png" />
              </button>
          </div>`;
  }

  return bookItems;
};

const moveToCompleted = (bookId) => {
  const bookTarget = findBook(bookId);
  if (bookTarget == null) return;
  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  updateDataFromStorage();
};

const moveToUnCompleted = (bookId) => {
  const bookTarget = findBook(bookId);
  if (bookTarget === null) return;
  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  updateDataFromStorage();
};

const removeBookFromapp = (bookId) => {
  const bookTarget = findBookIndex(bookId);
  if (bookTarget === -1) return;
  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  updateDataFromStorage();
};

const searchBook = (string) => {
  const bookItems = document.querySelectorAll(".book-items");
  for (const item of bookItems) {
    const title = item.childNodes[1];
    if (title.innerText.toUpperCase().includes(string)) {
      title.parentElement.style.display = "";
    } else {
      title.parentElement.style.display = "none";
    }
  }
};

const mainBook = (e) => {
  const appItem = document.querySelectorAll(".app-items");
  for (const app of appItem) {
    if (e == "all") {
      app.style.display = "";
      app.classList.remove("appByFilter");
    } else if (e == app.id) {
      app.style.display = "";
      app.classList.add("appByFilter");
    } else {
      app.style.display = "none";
    }
  }
};

const filters = document.querySelectorAll(".main-book");
for (const filter of filters) {
  filter.addEventListener("click", () => {
    const active = document.querySelectorAll(".active-book");
    for (const item of active) {
      item.className = item.className.replace("active-book", "");
    }
    filter.classList.add("active-book");
  });
}

const countApp = () => {
  let complete = [];
  let incomplete = [];

  books.filter((book) => {
    if (book.isCompleted === true) {
      complete.push(book);
    } else {
      incomplete.push(book);
    }
  });

  document.getElementById("countAllBook").innerText = books.length;
  document.getElementById("countFinished").innerText = complete.length;
  document.getElementById("countNotFinished").innerText = incomplete.length;
};

const sectionMain = document.getElementById("sectionMain");
const showAddBook = document.getElementById("showAddBook");
const hideAddBook = document.getElementById("hideAddBook");

showAddBook.addEventListener("click", () => {
  sectionMain.style.display = "block";
  showAddBook.style.display = "none";
});

hideAddBook.addEventListener("click", () => {
  sectionMain.style.display = "none";
  showAddBook.style.display = "flex";
});
