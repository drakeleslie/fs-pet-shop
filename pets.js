#!/usr/bin/env node
import fs, { readFile } from "fs";
import { agent } from "supertest";

var petData = process.argv[2];
var input = process.argv[3];
var inputTwo = process.argv[4];
var inputThree = process.argv[5];
var inputFour = process.argv[6];

readFile("pets.json", "utf-8", function (err, str) {
  let data = JSON.parse(str);
  let pet = data[input];
  if (err) {
    proccess.exit(1);
  }
  switch (petData) {
    //read
    case "read":
      if (!input) {
        console.log(data);
        break;
      } else if (data[input] !== undefined) {
        console.log(data[input]);
        break;
      } else if (data[input] === undefined) {
        console.error("Usage: node pets.js read INDEX");
        break;
      }
      break;
    //create
    case "create":
      if (!input || pet) {
        console.error("Usage: node pets.js create AGE KIND NAME");
        break;
      } else {
        let petInfo = {
          age: Number(inputTwo),
          kind: inputThree,
          name: inputFour,
        };

        data.push(petInfo);

        fs.writeFile("pets.json", JSON.stringify(data), function (err, str) {
          if (err) {
            console.error(err);
          }
        });
        break;
      }

    //update
    case "update":
      if (!pet || !input || !pet.age || !pet.kind || !pet.name) {
        console.error("Usage: node pets.js update INDEX AGE KIND NAME");
        break;
      } else {
        let petInfo = {
          age: Number(inputTwo),
          kind: inputThree,
          name: inputFour,
        };

        data.splice(input, 1, petInfo);
        fs.writeFile("pets.json", JSON.stringify(data), function (err, str) {
          if (err) {
            console.error(err);
          }
        });
      }
      break;
    case "destroy":
      if (!pet || !input) {
        console.error("Usage: node pets.js destroy INDEX");
      } else {
        data.splice(input, 1);
        fs.writeFile("pets.json", JSON.stringify(data), function (err, str) {
          if (err) {
            console.error(err);
          }
        });
        break;
      }
    default:
      console.log("Usage: node pets.js [read | create | update | destroy]");
  }
});
