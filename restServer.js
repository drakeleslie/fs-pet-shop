import express from "express";
import pg from "pg";

const app = express();
const port = 8080;

app.use(express.json());

const pool = new pg.Pool({
  database: "petshop",
});

//ALL PETS
app.get("/pets", (req, res) => {
  pool.query("SELECT * FROM pets").then((data) => {
    res.send(data.rows);
  });
});

//PET INDEX
app.get("/pets/:id", (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    res.sendStatus(404);
  } else {
    pool.query(`SELECT * FROM pets WHERE id = $1;`, [id]).then((data) => {
      const pet = data.rows[0];
      if (pet) {
        res.send(pet);
      } else {
        res.sendStatus(404);
      }
    });
  }
});

//PET DELETE
app.delete("/pets/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.sendStatus(404);
  } else {
    pool
      .query(`DELETE FROM pets WHERE id = $1 RETURNING *;`, [id])
      .then((data) => {
        res.send(data.rows);
      });
  }
});

//PET PATCH
app.patch("/pets/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, age, kind } = req.body;
  if (isNaN(id)) {
    res.sendStatus(404);
  } else {
    pool
      .query(
        `
    UPDATE pets 
    SET name = COALESCE($1, name),
    age = COALESCE($2, age),
    kind = COALESCE($3, kind)
    where ID = $4
    RETURNING *;
    `,
        [name, age, kind, id]
      )
      .then((result) => {
        res.send(result.rows[0]);
      });
  }
});

//PET POST
app.post("/pets", (req, res) => {
  const { name, age, kind } = req.body;
  pool
    .query(
      `INSERT INTO pets (
        name, 
        age, 
        kind)
        VALUES(
            $1,
            $2,
            $3
        )
        RETURNING *;`,
      [name, age, kind]
    )
    .then((result) => {
      res.send(result);
    });
});

app.use((err, req, res, next) => {
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
