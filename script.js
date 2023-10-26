var form = document.getElementById("formData");
var form2 = document.getElementById("myForm");
var order = 0;

const themeToggle = document.getElementsByClassName("toggle-label")[0];
const body = document.body;
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  document.getElementsByClassName("bar")[0].classList.toggle("light-mode");
  document.getElementsByClassName("bar")[1].classList.toggle("light-mode");
  document.getElementsByClassName("bar")[2].classList.toggle("light-mode");
  document.querySelector(".btn").classList.toggle("light-mode");
  document.querySelector(".glass-panel").classList.toggle("light-mode");
  document.querySelector(".inputField").classList.toggle("light-mode");
  if (document.querySelector(".inputField1")) {
    for (
      let i = 0;
      i < document.getElementsByClassName("inputField1").length;
      i++
    ) {
      document
        .getElementsByClassName("inputField1")
        [i].classList.toggle("light-mode");
    }
  }
  if (document.querySelector(".inputField2")) {
    for (
      let i = 0;
      i < document.getElementsByClassName("inputField2").length;
      i++
    ) {
      document
        .getElementsByClassName("inputField2")
        [i].classList.toggle("light-mode");
    }
  }
  if (document.querySelector(".inputField3")) {
    for (
      let i = 0;
      i < document.getElementsByClassName("inputField3").length;
      i++
    ) {
      document
        .getElementsByClassName("inputField3")
        [i].classList.toggle("light-mode");
    }
  }
  if (document.querySelector(".btn2")) {
    document.querySelector(".btn2").classList.toggle("light-mode");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  f = 1;
  const sidebar = document.querySelector(".sidebar");
  const burger = document.querySelector("#burger");

  function openSidebar() {
    sidebar.style.transform = "scale(1)";
    sidebar.style.right = "0%";
    burger.classList.add("change");
    document.getElementsByClassName("container")[0].style.filter = "blur(15px)";
  }

  function closeSidebar() {
    if (sidebar.clientWidth < 700) {
      sidebar.style.right = "-80%";
    } else {
      sidebar.style.right = "-50%";
    }
    f = 0;
    setTimeout(() => {
      sidebar.style.transform = "scale(0)";
      f = 1;
    }, 300);
    burger.classList.remove("change");
    document.getElementsByClassName("container")[0].style.filter = "blur(0px)";
  }

  burger.addEventListener("click", function () {
    if (
      (sidebar.style.right == "-50%" ||
        sidebar.style.right == "-80%" ||
        sidebar.style.right == "") &&
      f
    ) {
      openSidebar();
    } else if (f) {
      closeSidebar();
    }
  });
});

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
  const form = document.getElementById("myForm");

  if (!document.getElementById("ins")) {
    const ins = document.createElement("div");
    ins.setAttribute("id", "ins");
    ins.setAttribute("style", "padding-right: 3%;");
    form.parentNode.insertBefore(ins, form);
    katex.render("y^{deriv.No.}(x) = y", ins);
  } else {
    document.getElementById("ins").innerText = "";
    katex.render("y^{deriv.No.}(x) = y", document.getElementById("ins"));
  }

  for (let i = 1, j = 1, k = 1; i <= 3 * n; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "inputField" + j++;
    if (document.getElementById("themeToggle").checked) {
      input.classList.add("light-mode");
    }
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
      label.textContent = "y^";
      label.setAttribute("class", "label1");
    } else if (j == 3) {
      label.textContent = "(";
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
  if (document.getElementById("themeToggle").checked) {
    submitButton.classList.add("light-mode");
  }
  submitButton.value = "Get Particular Soln";

  form.appendChild(submitButton);

  form2 = document.getElementById("myForm");
}

var flag = 1;

form.addEventListener("input", function () {
  if (
    document.getElementById("error").innerText !=
    "Please wait, it's taking longer than usual."
  ) {
    document.getElementById("error").innerText = "";
  }
  document.getElementById("homo").innerText = "";
  document.getElementById("myForm").innerHTML = "";
  document.getElementById("eq").innerText = "";
  document.getElementById("ans").innerText = "";
  document.getElementById("partAns").innerText = "";
  if (document.getElementById("ins")) {
    document.getElementById("ins").innerText = "";
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (flag) {
    var f = 1;
    setTimeout(() => {
      if (f) {
        document.getElementById("error").innerText =
          "Please wait, it's taking longer than usual.";
      }
    }, 8000);
    document.getElementById("error").innerText = "";
    document.getElementsByClassName("btn")[0].innerText = "Solving equation...";
    document.getElementById("homo").innerText = "";
    document.getElementById("myForm").innerHTML = "";
    document.getElementById("eq").innerText = "";
    document.getElementById("ans").innerText = "";
    document.getElementById("partAns").innerText = "";
    if (document.getElementById("ins")) {
      document.getElementById("ins").innerText = "";
    }
    flag2 = 1;

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
        f = 0;
        document.getElementById("error").innerText = "";
        document.getElementById("myForm").innerHTML = "";
        document.getElementById("partAns").innerText = "";

        const response = JSON.parse(xhr.responseText);
        const enteredEq = response[0];
        const generalEq = response[1];
        const orderEq = response[2];
        const inputEq = response[3];
        // console.log(response);
        flag = 1;

        if (
          enteredEq.startsWith("Order") ||
          enteredEq.startsWith("Don") ||
          enteredEq.startsWith("An") ||
          enteredEq.startsWith("Can")
        ) {
          document.getElementById("error").innerText = enteredEq;
          document.getElementsByClassName("btn")[0].innerText =
            "Get General Solution";
        } else {
          document.getElementById("odeEq").value = inputEq;
          document.getElementById("error").innerText = "Enter Conditions";
          document.getElementsByClassName("btn")[0].innerText =
            "Get General Solution";
          order = orderEq.split("order")[1];
          document.getElementById("homo").innerText = orderEq.split("order")[0];
          createFormWithInputs(parseInt(order));
          renderEquation(
            enteredEq,
            document.getElementById("eq"),
            parseInt(order)
          );
          renderEquation(
            generalEq,
            document.getElementById("ans"),
            parseInt(order)
          );
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
    var f2 = 1;
    setTimeout(() => {
      if (f2) {
        document.getElementById("error").innerText =
          "Please wait, it's taking longer than usual.";
      }
    }, 8000);
    document.getElementById("error").innerText = "";
    document.getElementsByClassName("btn2")[0].value = "Solving equation...";
    var form2 = document.getElementById("myForm");

    const formData = new FormData(form2);

    var max = 0;
    var data = {};
    var f = 1;
    formData.forEach((value, key) => {
      if (value < 0 && key.startsWith("^")) {
        f2 = 0;
        document.getElementsByClassName("btn2")[0].value =
          "Get Particular Soln";
        document.getElementById("error").innerText =
          "Derivative Number of y can't be negative.";
        document.getElementById("partAns").innerText = "";
        data = {};
        f = 0;
      } else if (isNaN(value)) {
        f2 = 0;
        document.getElementsByClassName("btn2")[0].value =
          "Get Particular Soln";
        document.getElementById("error").innerText =
          "All values should be a number.";
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
        f2 = 0;
        document.getElementsByClassName("btn2")[0].value =
          "Get Particular Soln";
        document.getElementById("error").innerText = "All values are required.";
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
      for (let i = 0; i < parseInt(order); i++) {
        arr[data["^" + (i + 1)]].push(parseInt(data["x" + (i + 1)]));
        arr[data["^" + (i + 1)]].push(parseInt(data["y" + (i + 1)]));
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
          f2 = 0;
          document.getElementById("error").innerText = "";
          const response = JSON.parse(xhr.responseText);
          flag2 = 1;

          if (response[0].startsWith("Can")) {
            document.getElementsByClassName("btn2")[0].value =
              "Get Particular Soln";
            document.getElementById("error").innerText = response[0];
          } else {
            document.getElementsByClassName("btn2")[0].value =
              "Get Particular Soln";
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

function renderEquation(response, element, order) {
  response = response.replace("\\left[", "");
  response = response.replace("\\right]", "");
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
      // response[i] = replaceAllOccurrences(
      //   response[i],
      //   "y{\\left(x \\right)}",
      //   "y"
      // );
      newElement.textContent = `Order ${order}, Entered ODE:`;
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
