import plot from "./src/plot.js";

const equationInput = document.querySelector(".equation-input-function input");
const interval0Input = document.getElementById("interval0");
const interval1Input = document.getElementById("interval1");
const nSlider = document.getElementById("n-slider");
const nSliderLabel = document.querySelector(".n-slider-label span");

let lastGraph;
const plotGraph = () => {
  const equation = equationInput.value;
  if (math.parse(equation).evaluate({ x: 1 }) == undefined) return;

  const graphObject = {
    equation,
    interval: [parseInt(interval0Input.value), parseInt(interval1Input.value)],
    n: nSlider.value,
  };

  if (JSON.stringify(graphObject) == JSON.stringify(lastGraph)) return;

  plot(equation, [parseInt(interval0Input.value), parseInt(interval1Input.value)], nSlider.value);

  lastGraph = graphObject;
};

equationInput.addEventListener("keyup", plotGraph);
nSlider.addEventListener("mousemove", () => {
  plotGraph();
  nSliderLabel.textContent = nSlider.value;
});
nSlider.addEventListener("change", () => {
  plotGraph();
  nSliderLabel.textContent = nSlider.value;
});
interval0Input.addEventListener("keyup", plotGraph);
interval1Input.addEventListener("keyup", plotGraph);

nSliderLabel.textContent = nSlider.value;
plot("0", [-5, 5], 7);

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
