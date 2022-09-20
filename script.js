import plot from "./src/plot.js";
import riemann from "./src/riemann.js";
import replaceOperations from "./src/replaceOperations.js";

const MQ = MathQuill.getInterface(2);

const resultText = document.getElementById("equation-input-result-text");
const staticValue = MQ.StaticMath(resultText);
const mathquillInput = document.getElementById("mathquill-input");

const piButtonSup = document.getElementById("btn-check-p-2");
const expoButtonSup = document.getElementById("btn-check-e-2");
const piButtonInf = document.getElementById("btn-check-p-1");
const expoButtonInf = document.getElementById("btn-check-e-1");

piButtonSup.addEventListener("click", () => {
  if (expoButtonSup.checked) {
    expoButtonSup.checked = false;
  }
  plotGraph();
});
expoButtonSup.addEventListener("click", () => {
  if (piButtonSup.checked) {
    piButtonSup.checked = false;
  }
  plotGraph();
});
expoButtonInf.addEventListener("click", () => {
  if (piButtonInf.checked) {
    piButtonInf.checked = false;
  }
  plotGraph();
});
piButtonInf.addEventListener("click", () => {
  if (expoButtonInf.checked) {
    expoButtonInf.checked = false;
  }
  plotGraph();
});
const interval0Input = document.getElementById("interval0");
const interval1Input = document.getElementById("interval1");
const nSlider = document.getElementById("n-slider");
const nSliderLabel = document.querySelector(".n-slider-label span");
const stepSlider = document.getElementById("step-slider");
const stepSliderLabel = document.querySelector(".step-slider-label span");

const getIntervalValue = () => {
  const interval0 = parseFloat(
    piButtonInf.checked
      ? interval0Input.value * Math.PI
      : expoButtonInf.checked
      ? interval0Input.value * Math.E
      : interval0Input.value
  );
  const interval1 = parseFloat(
    piButtonSup.checked
      ? interval1Input.value * Math.PI
      : expoButtonSup.checked
      ? interval1Input.value * Math.E
      : interval1Input.value
  );
  return [interval0, interval1];
};

const calcIntegral = () => {
  const result = riemann(replaceOperations(mathField.text()), getIntervalValue(), nSlider.value);
  if (result) staticValue.latex(`dx \\approx ${result.toFixed(3)}`);
  else staticValue.latex(`dx \\approx`);
};

const mathField = MQ.MathField(mathquillInput, {
  handlers: {
    edit: async () => {
      const plotted = plotGraph();
      if (plotted) {
        calcIntegral();
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
    interval: getIntervalValue(),
    n: nSlider.value,
    stepSize: stepSlider.value,
  };
  if (JSON.stringify(graphObject) == JSON.stringify(lastGraph)) return;
  plot(equation, getIntervalValue(), nSlider.value, parseFloat(stepSlider.value));
  lastGraph = graphObject;
  calcIntegral();
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
interval0Input.addEventListener("change", plotGraph);
interval1Input.addEventListener("keyup", plotGraph);
interval1Input.addEventListener("change", plotGraph);

nSliderLabel.textContent = nSlider.value;

stepSlider.addEventListener("mousemove", () => {
  plotGraph();
  stepSliderLabel.textContent = stepSlider.value;
});
stepSlider.addEventListener("change", () => {
  plotGraph();
  stepSliderLabel.textContent = stepSlider.value;
});

stepSliderLabel.textContent = stepSlider.value;

plot("0", [-5, 5], 7);

document.querySelectorAll(".dropdown li ").forEach((op) => {
  op.addEventListener("click", () => {
    writeExp(op.id);
  });
});

function writeExp(exp) {
  let operations = {
    POW: "^{}",
    SQRT: "\\sqrt\\left({}\\right)",
    SIN: "\\sin\\left({}\\right)",
    COS: "\\cos\\left({}\\right)",
    TAN: "\\tan\\left({}\\right)",
    SEC: "\\sec\\left({}\\right)",
    COSSEC: "\\csc\\left({}\\right)",
    PI: "\\pi",
    e: "e",
    LOG: "\\log\\left({}\\right)",
  };
  if (operations[exp]) {
    mathField.focus();
    mathField.write(operations[exp]);
    mathField.keystroke("Left");
    if (exp == "SQRT") mathField.keystroke("Left");
  }
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
