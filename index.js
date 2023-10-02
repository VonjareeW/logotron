


var inquirer = require('inquirer');
const SVG = require("./lib/svg");
const { Circle, Triangle, Square } = require("./lib/shapes");
const { writeFile } = require("fs/promises");

inquirer
  .prompt([
        {
          name: "text",
          type: "input",
          message:
            "Enter a text with 3 Characters to create your logo",
          validate: (text) =>
            text.length <= 3 ||
            "The maximum amount of characters is 3",
        },
        {
          name: "textColor",
          type: "input",
          message: "Enter a color for the text",
        },
        {
          name: "shapeType",
          type: "list",
          message: "Choose a shape for the logo",
          choices: ["circle", "square", "triangle"],
        },
        {
          name: "shapeColor",
          type: "input",
          message: "Choose a color to fill the shape",
        },
      ])
      .then(({ text, textColor, shapeType, shapeColor }) => {
        let shape;
        switch (shapeType) {
          case "circle":
            shape = new Circle();
            break;

          case "square":
            shape = new Square();
            break;

          default:
            shape = new Triangle();
            break;
        }
        shape.setColor(shapeColor);

        const svg = new SVG();
        svg.setText(text, textColor);
        svg.setShape(shape);
        return writeFile("logo.svg", svg.render());
      })
      .then(() => {
        console.log("Generated logo.svg");
      })
      .catch((error) => {
        console.log(error);
        console.log("Error");
      });
  