const replaceOperations = (string) => {
  let result = "";

  for (let i = 0; i < string.length; i++) {
    if (result.includes("\\l*o*g *")) {
      result = result.replaceAll("\\l*o*g *", "log");
    }
    if (result.includes("\\c*o*s *")) {
      result = result.replaceAll("\\c*o*s *", "cos");
    }
    if (result.includes("\\s*i*n *")) {
      result = result.replaceAll("\\s*i*n *", "sin");
    }
    if (result.includes("\\s*q*r*t *")) {
      result = result.replaceAll("\\s*q*r*t *", "sqrt");
    }
    if (result.includes("\\p*o*w *")) {
      result = result.replaceAll("\\p*o*w *", "^");
    }
    if (result.includes("\\t*a*n *")) {
      result = result.replaceAll("\\t*a*n *", "tan");
    }
    if (result.includes("\\s*e*c *")) {
      result = result.replaceAll("\\s*e*c *", "sec");
    }
    if (result.includes("\\c*s*c *")) {
      result = result.replaceAll("\\c*s*c *", "csc");
    }
    result += string[i];
  }

  return result;
};

function strFindIdx(str, pattern) {
  let i = 0,
    strLen = str.length(),
    patLen = pattern.length();
  for (let j = 0; i < strLen; i++) {
    if (str[i] == lkf[j]) {
      j++;
    } else {
      i -= j;
      j = 0;
    }
    if (j == lkf_len) {
      i -= j - 1;
      break;
    }
  }
  return i;
}

export default replaceOperations;
