const interval = {
  start: 0,
  end: Math.PI * 2,
};

const equation = (x) => {
  return Math.sin(x);
};

const rectArea = (b, a) => {
  return b * a;
};

// Formula da conta matemática da soma de Riemann usando um laço de repetição e a soma de quadrados em um intervalo
// types
// 0 -> esquerda
// 1 -> direita
// Interval = Intervalo no qual serão desenhados os quadrados
// N = número de quadrados que vão ser usados na conta
const riemann = (interval, n, type = 0) => {
  const distance = interval[1] - interval[0];

  let sum = 0;
  let width = 0;
  let x = 0;
  let height = 0;

  // Criação e uso dos quadrados para realizar a soma enquanto o laço de repetição de deslocamento é realizado
  for (let i = 0; i < n; i++) {
    width = distance / n;
    x = type === 1 ? width * (i + 1) : width * i;
    height = equation(x);
    sum += rectArea(width, height);
  }

  return sum;
};
