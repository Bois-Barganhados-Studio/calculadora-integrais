import plot from "./src/plot.js";
import riemann from "./src/riemann.js";
import replaceOperations from "./src/replaceOperations.js";

const MQ = MathQuill.getInterface(2);

const resultText = document.getElementById("equation-input-result-text");
const staticValue = MQ.StaticMath(resultText);
const mathquillInput = document.getElementById("mathquill-input");

const piButtonInf = document.getElementById("btn-check-p-1");
const piButtonSup = document.getElementById("btn-check-p-2");
const expoButtonInf = document.getElementById("btn-check-e-1");
const expoButtonSup = document.getElementById("btn-check-e-2");

const interval0Input = document.getElementById("interval0");
const interval1Input = document.getElementById("interval1");
const nSlider = document.getElementById("n-slider");
const nSliderLabel = document.querySelector(".n-slider-label span");

const mathField = MQ.MathField(mathquillInput, {
  handlers: {
    edit: async () => {
      const plotted = plotGraph();
      if (plotted) {
        const result = riemann(
          replaceOperations(mathField.text()),
          [parseFloat(piButtonInf.checked ? interval0Input.value * Math.PI : expoButtonInf.checked ?
            interval0Input.value * Math.E : interval0Input.value), parseFloat(piButtonSup.checked ? interval1Input.value * Math.PI : expoButtonSup.checked ?
              interval1Input.value * Math.E : interval1Input.value)],
          nSlider.value
        );
        if (result) staticValue.latex(`dx \\approx ${result.toFixed(3)}`);
        else staticValue.latex(`dx \\approx`);
      }
    },
  },
});

let lastGraph;
const plotGraph = () => {
  const equation = replaceOperations(mathField.text());
  if (math.parse(equation).evaluate({ x: 1 }) == undefined) return;

  const graphObject = {
    equation,
    interval: [parseFloat(interval0Input.value), parseFloat(interval1Input.value)],
    n: nSlider.value,
  };
  if (JSON.stringify(graphObject) == JSON.stringify(lastGraph)) return;
  plot(
    equation,
    [parseFloat(interval0Input.value), parseFloat(interval1Input.value)],
    nSlider.value
  );
  lastGraph = graphObject;

  return true;
};

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

document.querySelectorAll(".dropdown li ").forEach((op) => {
  op.addEventListener("click", () => {
    writeExp(op.id);
  });
});

function writeExp(exp) {
  let operations = {
    POW: "^",
    SQRT: "\\sqrt",
    SIN: "\\sin",
    COS: "\\cos",
    PI: "\\Pi",
    TAN: "\\tan",
    SEC: "\\sec",
    LN: "\\ln",
    E: "\\E",
    LOG: "\\log",
  };
  mathField.focus();
  mathField.cmd(operations[exp]);
}

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
