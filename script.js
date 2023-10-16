var form = document.getElementById("formData");
var form2 = document.getElementById("myForm");

function replaceAllOccurrences(
  inputString,
  substringToReplace,
  replacementChar
) {
  let index = inputString.indexOf(substringToReplace);
  while (index !== -1) {
    inputString =
      inputString.substring(0, index) +
      replacementChar +
      inputString.substring(index + substringToReplace.length);
    index = inputString.indexOf(substringToReplace);
  }
  return inputString;
}

function createFormWithInputs(n) {
  // console.log(form2);
  const form = document.getElementById("myForm");

  if (!document.getElementById("ins")) {
    const ins = document.createElement("div");
    ins.setAttribute("id", "ins");
    ins.setAttribute("style", "margin-right: 2%;");
    form.parentNode.insertBefore(ins, form);
    katex.render("y^{primeCount}(x) = y", ins);
  } else {
    document.getElementById("ins").innerText = "";
    katex.render("y^{primeCount}(x) = y", document.getElementById("ins"));
  }

  for (let i = 1, j = 1, k = 1; i <= 3 * n; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "inputField" + j++;
    if (j == 2) {
      input.name = "^" + k;
    } else if (j == 3) {
      input.name = "x" + k;
    } else {
      input.name = "y" + k;
      k++;
    }
    form.appendChild(input);

    const label = document.createElement("label");
    if (j == 2) {
      label.textContent = "y^(";
      label.setAttribute("class", "label1");
    } else if (j == 3) {
      label.textContent = ")(";
    } else {
      label.textContent = ")=";
    }
    input.parentNode.insertBefore(label, input);

    if (i % 3 == 0) {
      const lineBreak = document.createElement("br");
      form.appendChild(lineBreak);
      j = 1;
    }
  }

  const submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.classList.add("btn2");
  submitButton.value = "Get Particular Solution";

  form.appendChild(submitButton);

  form2 = document.getElementById("myForm");
  // console.log(form2);
}

var flag = 1;

form.addEventListener("input", function () {
  document.getElementById("error").innerText = "";
  document.getElementById("order").innerText = "";
  document.getElementById("myForm").innerHTML = "";
  document.getElementById("eq").innerText = "";
  document.getElementById("ans").innerText = "";
  document.getElementById("partAns").innerText = "";
  if (document.getElementById("ins")) {
    document.getElementById("ins").innerText = "";
  }
  flag = 1;
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (flag) {
    // console.log(document.getElementById("myFrom"));
    document.getElementById("error").innerText = "Solving...";
    document.getElementById("order").innerText = "";
    document.getElementById("myForm").innerHTML = "";
    document.getElementById("eq").innerText = "";
    document.getElementById("ans").innerText = "";
    document.getElementById("partAns").innerText = "";
    if (document.getElementById("ins")) {
      document.getElementById("ins").innerText = "";
    }

    const equation = document.getElementById("odeEq").value;

    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://odesolver.evan30102001fla.repl.co/odeSolve",
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        document.getElementById("myForm").innerHTML = "";
        document.getElementById("partAns").innerText = "";

        const response = JSON.parse(xhr.responseText);
        const enteredEq = response[0];
        const generalEq = response[1];
        const orderEq = response[2];
        const inputEq = response[3];
        console.log(response);
        flag = 1;

        if (
          enteredEq.startsWith("Deg") ||
          enteredEq.startsWith("Don") ||
          enteredEq.startsWith("An") ||
          enteredEq.startsWith("Can")
        ) {
          document.getElementById("error").innerText = enteredEq;
        } else {
          document.getElementById("odeEq").value = inputEq;
          document.getElementById("error").innerText =
            "Enter particular points";
          document.getElementById("order").innerText = orderEq;
          const order = orderEq.split("order")[1];
          // console.log(parseInt(order));
          createFormWithInputs(parseInt(order));
          renderEquation(enteredEq, document.getElementById("eq"));
          renderEquation(generalEq, document.getElementById("ans"));
        }
      }
    };
    xhr.send(JSON.stringify({ equation: equation }));
    flag = 0;
  }
});

var flag2 = 1;
form2.addEventListener("submit", function (event) {
  event.preventDefault();
  if (flag2) {
    document.getElementById("error").innerText = "Solving...";
    var form2 = document.getElementById("myForm");

    const formData = new FormData(form2);

    var max = 0;
    var data = {};
    var f = 1;
    formData.forEach((value, key) => {
      if (value < 0 && key.startsWith("^")) {
        document.getElementById("error").innerText =
          "y's power can't be negative";
        document.getElementById("partAns").innerText = "";
        data = {};
        f = 0;
      } else if (isNaN(value)) {
        document.getElementById("error").innerText =
          "All conditions should be a number";
        document.getElementById("partAns").innerText = "";
        data = {};
        f = 0;
      } else if (value && f) {
        data[key] = value;
        if (key.startsWith("^")) {
          if (parseInt(value) > max) {
            max = value;
          }
        }
      } else if (f) {
        document.getElementById("error").innerText =
          "All conditions are required";
        document.getElementById("partAns").innerText = "";
        data = {};
        f = 0;
      }
    });

    if (f) {
      var arr = [];
      for (var i = 0; i <= max; i++) {
        arr[i] = [];
      }
      for (
        let i = 0;
        i <
        parseInt(document.getElementById("order").innerText.split("order")[1]);
        i++
      ) {
        arr[data["^" + (i + 1)]].push(parseInt(data["x" + (i + 1)]));
        arr[data["^" + (i + 1)]].push(parseInt(data["y" + (i + 1)]));
      }
      // console.log(arr);
      // console.log(max);
      // console.log(data);

      const equation = document.getElementById("odeEq").value;

      var xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://odesolver.evan30102001fla.repl.co/odeSolve",
        true
      );
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          // console.log(response[0]);
          flag2 = 1;

          if (response[0].startsWith("Can")) {
            document.getElementById("error").innerText = response[0];
          } else {
            document.getElementById("error").innerText = "";
            renderEquation2(response[0], document.getElementById("partAns"));
          }
        }
      };
      xhr.send(JSON.stringify({ equation: equation, inCon: arr }));
      flag2 = 0;
    }
  }
});

function renderEquation(response, element) {
  response = response.replace("\\left[", "");
  response = response.replace("\\right]", "");
  // console.log(response);
  if (response.includes(", \\  y")) {
    response = response.split(",");
  } else {
    response = response.split("?");
  }
  element.innerHTML = "";

  for (let i = 0; i < response.length; i++) {
    const childElement = document.createElement("div");
    childElement.classList.add("field");
    element.appendChild(childElement);

    const newElement = document.createElement("div");
    newElement.classList.add("lable");
    if (element.id == "eq") {
      newElement.textContent = "Entered ODE:";
    } else {
      response[i] = replaceAllOccurrences(
        response[i],
        "y{\\left(x \\right)}",
        "y"
      );
      newElement.textContent = "General Solution " + (i + 1) + ":";
    }
    childElement.parentNode.insertBefore(newElement, childElement);

    katex.render(response[i], childElement);
  }
}

function renderEquation2(response, element) {
  response = replaceAllOccurrences(response, "y{\\left(x \\right)}", "y");
  // console.log(response);
  element.innerHTML = "";

  const childElement = document.createElement("div");
  childElement.classList.add("field");
  element.appendChild(childElement);

  const newElement = document.createElement("div");
  newElement.classList.add("lable");
  newElement.textContent = "Particular Solution:";

  childElement.parentNode.insertBefore(newElement, childElement);

  katex.render(response, childElement);
}
