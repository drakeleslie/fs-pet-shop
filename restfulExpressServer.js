import express from "express";
import { readFile } from "fs/promises";
import { writeFile } from "fs/promises";
import { request } from "http";

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ALL PETS
app.get("/pets", (req, res) => {
  readFile("pets.json", "utf8").then((str) => {
    const pets = JSON.parse(str);
    res.send(pets);
  });
});

//PET INDEX
app.get("/pets/:id", (req, res) => {
  readFile("pets.json", "utf8").then((str) => {
    let index = req.params.id;
    let pet = JSON.parse(str);

    if (pet[index]) {
      res.send(pet[index]);
    } else {
      res.statusCode = 404;
      res.send("Invalid Index");
    }
  });
});

//PET POST
app.post("/pets", (req, res) => {
  readFile("pets.json", "utf-8").then((str) => {
    let body = req.body;
    let createPet = JSON.parse(str);
    createPet.push(body);
    return writeFile("pets.json", JSON.stringify(createPet)).then((str) => {
      res.send(createPet);
    });
  });
});

//PET PATCH
app.patch("/pets/:id", (req, res) => {
  readFile("pets.json", "utf-8").then((str) => {
    const data = JSON.parse(str);
    const { id } = req.params;
    const update = req.body;
    const pet = data[id];
    console.log(pet);

    if (update.age) pet.age = update.age;

    if (update.kind) pet.kind = update.kind;

    if (update.name) pet.name = update.name;

    return writeFile("pets.json", JSON.stringify(data)).then((str) => {
      res.send(pet);
    });
  });
});

//PET DELETE
app.delete("/pets/:id", (req, res) => {
  readFile("pets.json", "utf-8").then((str) => {
    const data = JSON.parse(str);
    const { id } = req.params;
    const petId = data[id];

    return writeFile("pets.json", JSON.stringify(data)).then((str) => {
      res.send(petId);
    });
  });
});

app.listen(port, () => {
  console.log("Server is up on port", port);
});
