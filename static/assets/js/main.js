const fetchData = async (url) => {
  try {
    const response = await fetch(url);

    return await response.json();
  } catch (err) {
    console.error(err);

    return [];
  }
};

const filterBooksByGenre = async () => {
  const bookDiv = document.querySelector("#books");
  const checkedGenres = document.querySelectorAll(
    "input[name=genre-checkbox]:checked"
  );
  const books = JSON.parse(localStorage.getItem("books"));

  if (books.length === 0) {
    return;
  }

  bookDiv.innerHTML = "";

  const genres = [];
  for (const genre of checkedGenres) {
    genres.push(genre.value);
  }

  if (genres.length === 0) {
    await renderBooks();
    return;
  }

  books
    .filter((book) => genres.includes(book.genre))
    .forEach((book) => {
      const { name, image, author, genre, available } = book;

      bookDiv.innerHTML += `
            <div id="book">
                <div class="book-info">
                      <img src="${image}" alt="book image">
                    <h5>${name}</h5>
                    <p>Autor: ${author.name}</p>
                    <p>Zanr: ${genre}</p>
                    <p>Na stanju: ${available ? "Da" : "Ne"}</p>
                </div>
            </div>
        `;
    });
};
const renderGenres = async () => {
  const url = "/api/zanrovi";
  const genreDiv = document.querySelector("#genre-out");

  const genres = await fetchData(url);

  if (genres.length === 0) {
    return;
  }

  genres.forEach((genre) => {
    const { id, name } = genre;

    genreDiv.innerHTML += `
            <input type="checkbox" id="${id}" name="genre-checkbox" value="${name}">
            <label for="${id}">${name}</label>
        `;
  });
};
const renderBooks = async () => {
  const url = "/api/knjige";
  const bookDiv = document.querySelector("#books");

  const books = await fetchData(url);

  if (books.length === 0) {
    return;
  }

  localStorage.setItem("books", JSON.stringify(books));
  books.forEach((book) => {
    const { name, image, author, genre, available } = book;

    bookDiv.innerHTML += `
        <div id="book">
            <div class="book-info">
                <img src="${image}" alt="book image">
                <h5>${name}</h5>
                <p>Autor: ${author.name}</p>
                <p>Zanr: ${genre}</p>
                <p>Na stanju: ${available ? "Da" : "Ne"}</p>
            </div>
        </div>
        `;
  });
};

const loginOrRegister = async (action) => {
  const url =
    action === "login" ? "/api/korisnik/uloguj" : "/api/korisnik/registruj";
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");
  const status = document.querySelector("#login-message");

  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    const { message } = data;

    if (message === true) {
      window.location = "/";
      return;
    }

    status.innerText = message;
  } catch (err) {
    console.error(err);
  }
};

const renderLoginOrRegisterPage = (page) => {
  return () => {
    const status = document.createElement("p");
    const app = document.querySelector("#app");
    const form = document.createElement("form");
    const username = document.createElement("input");
    const password = document.createElement("input");
    const button = document.createElement("button");

    username.type = "text";
    username.id = "username";
    username.placeholder = "Korisnicko ime";
    password.placeholder = "Lozinka";
    password.id = "password";
    password.type = "password";
    button.innerText = page === "login" ? "Uloguj se" : "Registruj se";
    status.id = "login-message";

    form.classList.add("login-form");
    form.appendChild(username);
    form.appendChild(password);
    form.appendChild(button);
    form.appendChild(status);

    app.innerHTML = "";
    app.appendChild(form);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      await loginOrRegister(page);
    });
  };
};

const addEventListenersToCheckboxes = async () => {
  const checkboxes = document.querySelectorAll("input[name=genre-checkbox]");
  checkboxes.forEach((checkbox) =>
    checkbox.addEventListener("click", filterBooksByGenre)
  );
};

const addEventListenersForLinks = async () => {
  const home = document.querySelector("#home");
  const login = document.querySelector("#login");
  const register = document.querySelector("#register");

  home.addEventListener("click", () => (window.location = "/"));
  login.addEventListener("click", renderLoginOrRegisterPage("login"));
  register.addEventListener("click", renderLoginOrRegisterPage("register"));
};
const main = async () => {
  await addEventListenersForLinks();
  await renderGenres();
  await renderBooks();
  await addEventListenersToCheckboxes();
};
document.addEventListener("DOMContentLoaded", main);
