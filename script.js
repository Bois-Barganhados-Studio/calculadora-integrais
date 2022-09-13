import plot from "./src/plot.js";

const equationInput = document.getElementById("equation");
const nInput = document.getElementById("n");
const interval0Input = document.getElementById("interval0");
const interval1Input = document.getElementById("interval1");

const plotGraph = () => {
  const equation = equationInput.value;
  if (math.parse(equation).evaluate({ x: 1 }) == undefined) return;
  plot(equation, [parseInt(interval0Input.value), parseInt(interval1Input.value)], nInput.value);
};

equationInput.addEventListener("keyup", plotGraph);
nInput.addEventListener("keyup", plotGraph);
interval0Input.addEventListener("keyup", plotGraph);
interval1Input.addEventListener("keyup", plotGraph);

// INPUT MATHQUILL

// const MQ = MathQuill.getInterface(2);

// const input = document.getElementById("input");
// const inputWrapper = document.getElementById("input-wrapper");
// const MQinputWrapper = MQ.StaticMath(inputWrapper);

// const mathField = MQ.MathField(input, {
//   handlers: {
//     edit: () => {
//       const latex = mathField.latex();
//       console.log(parseEquation(latex));
//       // console.log(text);
//       // const letters = text.match(/[a-zA-Z]/g);

//       // if (letters && letters.length > 1) {
//       //   mathField.keystroke("Backspace");
//       // } else {
//       //   MQinputWrapper.latex(letters ? `f(${letters[0]})=` : "f(x)=");
//       // }
//     },
//   },
// });
