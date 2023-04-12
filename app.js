const path = require("path");
const express = require("express");
const HOST = "http://localhost";
const PORT = 3000;

const staticAssets = path.join(__dirname, "./static");

const app = express();
const { getAllBooks, getSingleBook } = require("./src/models/book");

const { getAllAuthors, getSingleAuthor } = require("./src/models/author");

const { getAllGenres, getSingleGenre } = require("./src/models/genre");

const { registerUser, loginUser } = require("./src/models/user");

app.use("/", express.static(staticAssets));
app.use(express.json());

app.get("/api/knjige", async (req, res) => {
  const knjige = await getAllBooks();

  if (knjige.length === 0) {
    return res.status(404).send({
      message: "no books",
    });
  }

  return res.send(knjige);
});

app.get("/api/knjige/:id", async (req, res) => {
  const id = req.params.id;
  const knjiga = await getSingleBook(id);

  if (knjiga === null) {
    return res.status(404).send({
      message: "no such book",
    });
  }

  return res.send(knjiga);
});

app.get("/api/autori", async (req, res) => {
  const autori = await getAllAuthors();

  if (autori.length === 0) {
    return res.status(404).send({
      message: "no authors",
    });
  }

  return res.send(autori);
});

app.get("/api/autori/:id", async (req, res) => {
  const id = req.params.id;
  const autor = await getSingleAuthor(id);

  if (autor === null) {
    return res.status(404).send({
      message: "no such author",
    });
  }

  return res.send(autor);
});

app.get("/api/zanrovi", async (req, res) => {
  const zanrovi = await getAllGenres();

  if (zanrovi.length === 0) {
    return res.status(404).send({
      message: "no genres",
    });
  }

  return res.send(zanrovi);
});

app.get("/api/zanrovi/:id", async (req, res) => {
  const id = req.params.id;
  const zanr = await getSingleGenre(id);

  if (zanr === null) {
    return res.status(404).send({
      message: "no such genre",
    });
  }

  return res.send(zanr);
});

app.post("/api/korisnik/uloguj", async (req, res) => {
  const { username, password } = req.body;

  if (
    username === null ||
    username === undefined ||
    username === "" ||
    password === null ||
    password === undefined ||
    password === ""
  ) {
    return res.status(422).send({
      message: "I korisnicko ime i lozinka su neophodni.",
    });
  }

  const result = await loginUser(username, password);

  if (!result) {
    return res.status(401).send({
      message: "Neispravno korisnicko ime ili lozinka.",
    });
  }

  return res.send({
    message: result,
  });
});

app.post("/api/korisnik/registruj", async (req, res) => {
  const { username, password } = req.body;

  if (
    username === null ||
    username === undefined ||
    username === "" ||
    password === null ||
    password === undefined ||
    password === ""
  ) {
    return res.status(422).send({
      message: "I korisnicko ime i lozinka su neophodni.",
    });
  }

  const result = await registerUser(username, password);

  if (result === null) {
    //ako je rez null onda korisnik vec postoji ili je doslo do neke greske
    return res.status(422).send({
      message: "Ili korisnik vec postoji ili je doslo do neke greske.",
    });
  }

  return res.send({
    message: true,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on: ${HOST}:${PORT}`);
});
