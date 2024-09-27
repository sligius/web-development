//ex 1
function isPalindrome(line) {
  const lineReverse = line.split("").reverse().join("");
  return lineReverse === line;
}

function checkPalindrome() {
  const line = document.getElementById("line").value;
  const result = document.getElementById("result-1");
  if (isPalindrome(line)) {
    result.innerHTML = "Строка является палиндромом";
    result.style.color = "rgb(18, 90, 0)";
  } else {
    result.innerHTML = "Строка не является палиндромом";
    result.style.color = "rgb(109, 1, 1)";
  }
}

//ex 2
let min = 1;
let max = 100;

let secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;

document.getElementById("min").textContent = min;
document.getElementById("max").textContent = max;

function checkGuess() {
  let guess = Number(document.getElementById("guess").value);
  let result = document.getElementById("result-2");

  if (isNaN(guess)) {
    result.textContent = "Введите число!";
    result.style.color = "rgb(109, 1, 1)";
    return;
  }

  if (guess < secretNumber) {
    result.textContent = "Слишком мало! Попробуйте еще.";
    result.style.color = "black";
  } else if (guess > secretNumber) {
    result.textContent = "Слишком много! Попробуйте еще.";
    result.style.color = "black";
  } else {
    result.textContent = "Поздравляю! Вы угадали!";
    result.style.color = "rgb(18, 90, 0)";
  }
}

function clearInput() {
  document.getElementById("guess").value = "";
}

//ex 3
function checkMarks() {
  const namesInput = document.getElementById("names");
  const marksInput = document.getElementById("marks");
  const result = document.getElementById("result-3");

  const names = namesInput.value.trim().split(",");
  const marks = marksInput.value.trim().split(" ");

  if (names.length !== marks.length) {
    result.textContent = "Количество имен и оценок должно быть одинаковым!";
    return;
  }

  const students = [];
  for (let i = 0; i < names.length; i++) {
    const name = names[i].trim();
    const marksArray = marks[i].split("-");

    if (
      marksArray.length !== 3 ||
      marksArray.some((mark) => isNaN(Number(mark)))
    ) {
      result.textContent = `Неверный формат оценок для ученика ${name}!`;
      return;
    }

    const marksNumbers = marksArray.map(Number);
    const averageMark =
      marksNumbers.reduce((sum, mark) => sum + mark, 0) / marksNumbers.length;
    students.push({ name, averageMark });
  }

  if (students.length === 1) {
    result.textContent = `Ученик всего один: ${
      students[0].name
    } - ${students[0].averageMark.toFixed(2)}`;
    return;
  }

  let lowestMarkStudent = students[0];
  for (let i = 1; i < students.length; i++) {
    if (students[i].averageMark < lowestMarkStudent.averageMark) {
      lowestMarkStudent = students[i];
    }
  }

  let highestMarkStudent = students[0];
  for (let i = 1; i < students.length; i++) {
    if (students[i].averageMark > highestMarkStudent.averageMark) {
      highestMarkStudent = students[i];
    }
  }

  result.innerHTML = `Самый низкий балл: ${
    lowestMarkStudent.name
  } - ${lowestMarkStudent.averageMark.toFixed(2)}<br>
    Самый высокий балл: ${
      highestMarkStudent.name
    } - ${highestMarkStudent.averageMark.toFixed(2)}`;
}

//ex 4
function checkCalories() {
  const namesInput = document.getElementById("products");
  const bjuInput = document.getElementById("bju");
  const result = document.getElementById("result-4");

  const names = namesInput.value.trim().split(" ");
  const bju = bjuInput.value.trim().split(" ");
  console.log(names.length);
  console.log(bju.length);
  if (names.length !== bju.length) {
    result.textContent =
      "Количество названий продуктов и значений БЖУ должно быть одинаковым!";
    return;
  }

  const products = [];
  for (let i = 0; i < names.length; i++) {
    const name = names[i].trim();
    const bjuArray = bju[i].split("-");

    if (
      bjuArray.length !== 3 ||
      bjuArray.some((value) => isNaN(Number(value)))
    ) {
      result.textContent = `Неверный формат БЖУ для продукта ${name}!`;
      return;
    }

    const bjuNumbers = bjuArray.map(Number);
    const totalCalories =
      0.4 * bjuNumbers[0] + 0.3 * bjuNumbers[1] + 0.3 * bjuNumbers[2];
    products.push({ name, totalCalories, bju: bjuNumbers });
  }

  if (products.length === 1) {
    result.textContent = `Продукт всего один: ${
      products[0].name
    } - ${products[0].totalCalories.toFixed(2)} ккал`;
    return;
  }

  let lowestCalorieProduct = products[0];
  for (let i = 1; i < products.length; i++) {
    if (products[i].totalCalories < lowestCalorieProduct.totalCalories) {
      lowestCalorieProduct = products[i];
    }
  }

  let highestCalorieProduct = products[0];
  for (let i = 1; i < products.length; i++) {
    if (products[i].totalCalories > highestCalorieProduct.totalCalories) {
      highestCalorieProduct = products[i];
    }
  }

  result.innerHTML = `Самый низкокалорийный продукт: ${
    lowestCalorieProduct.name
  } - ${lowestCalorieProduct.totalCalories.toFixed(2)} ккал<br>
Самый высококалорийный продукт: ${
    highestCalorieProduct.name
  } - ${highestCalorieProduct.totalCalories.toFixed(2)} ккал`;
}

//ex 5
function addInputRowSale() {
  const inputContainer = document.getElementById("input-container-sale");
  const newRow = document.createElement("div");
  newRow.classList.add("input-row-sale");

  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.placeholder = "Название товара, прибыль";
  inputElement.classList.add("sale-data");

  newRow.appendChild(inputElement);
  inputContainer.appendChild(newRow);
}

function analyzeSales() {
  const inputRows = document.querySelectorAll(".input-row-sale");
  const profitByProduct = {};

  for (const row of inputRows) {
    const saleData = row.querySelector(".sale-data").value.trim();
    if (saleData === "") {
      continue;
    }

    const [productName, profitStr] = saleData.split(",");
    const profit = Number(profitStr.trim());

    if (productName in profitByProduct) {
      profitByProduct[productName] += profit;
    } else {
      profitByProduct[productName] = profit;
    }
  }

  let maxProfitProduct = null;
  let maxProfit = 0;
  for (const product in profitByProduct) {
    if (profitByProduct[product] > maxProfit) {
      maxProfitProduct = product;
      maxProfit = profitByProduct[product];
    }
  }

  const result = document.getElementById("result-5");
  result.textContent = `Товар с максимальной суммарной прибылью: ${maxProfitProduct}, прибыль: ${maxProfit}`;
}

addInputRowSale();

//ex 6
function addInputRowConcert() {
  const inputContainer = document.getElementById("input-container-concert");
  const newRow = document.createElement("div");
  newRow.classList.add("input-row-concert");

  const bandInput = document.createElement("input");
  bandInput.type = "text";
  bandInput.placeholder = "Название группы";
  bandInput.classList.add("band-name");

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.placeholder = "Дата концерта";
  dateInput.classList.add("concert-date");

  newRow.appendChild(bandInput);
  newRow.appendChild(dateInput);
  inputContainer.appendChild(newRow);
}

function analyzeConcerts() {
  const inputRows = document.querySelectorAll(".input-row-concert");
  const concertsByBand = {};
  let hasConcertsIn2025 = false;

  for (const row of inputRows) {
    const bandName = row.querySelector(".band-name").value.trim();
    const concertDate = row.querySelector(".concert-date").value.trim();

    if (bandName === "" || concertDate === "") {
      continue;
    }

    const year = new Date(concertDate).getFullYear();
    if (year === 2025) {
      hasConcertsIn2025 = true;
      if (bandName in concertsByBand) {
        concertsByBand[bandName]++;
      } else {
        concertsByBand[bandName] = 1;
      }
    }
  }

  const result = document.getElementById("result-6");

  if (!hasConcertsIn2025) {
    result.textContent = "Нет ни одного концерта в 2025.";
    return;
  }

  let maxConcertsBand = null;
  let maxConcerts = 0;
  for (const band in concertsByBand) {
    if (concertsByBand[band] > maxConcerts) {
      maxConcertsBand = band;
      maxConcerts = concertsByBand[band];
    }
  }

  result.textContent = `Группа с наибольшим количеством концертов в 2025 году: ${maxConcertsBand}, количество концертов: ${maxConcerts}`;
}

addInputRowConcert();

//ex 7
let inputCounter = 1;

function addInputRowProduct() {
  inputCounter++;
  const inputContainer = document.getElementById("input-container-product");
  const newRow = document.createElement("div");
  newRow.classList.add("input-row-product");

  const productNameInput = document.createElement("input");
  productNameInput.type = "text";
  productNameInput.placeholder = "Название продукта";
  productNameInput.classList.add("product-name");

  if (inputCounter % 2 === 0) {
    productNameInput.style.border = "2px solid rgb(190, 153, 228)";
  } else {
    productNameInput.style.border = "2px solid rgb(102, 28, 177)";
  }

  const priceInputs = [];
  for (let i = 1; i <= 3; i++) {
    const priceInput = document.createElement("input");
    priceInput.type = "number";
    priceInput.placeholder = `Цена в магазине ${i}`;
    priceInput.classList.add("product-price");

    if (inputCounter % 2 === 0) {
      priceInput.style.border = "2px solid rgb(190, 153, 228)";
    } else {
      priceInput.style.border = "2px solid rgb(102, 28, 177)";
    }

    priceInputs.push(priceInput);
  }

  newRow.appendChild(productNameInput);
  priceInputs.forEach((input) => newRow.appendChild(input));
  inputContainer.appendChild(newRow);
}

function analyzePrices() {
  const inputRows = document.querySelectorAll(".input-row-product");
  const productPrices = {};

  for (const row of inputRows) {
    const productName = row.querySelector(".product-name").value.trim();
    const prices = [];
    for (let i = 0; i < 3; i++) {
      const priceInput = row.querySelectorAll(".product-price")[i];
      const price = Number(priceInput.value.trim());
      if (!isNaN(price)) {
        prices.push(price);
      }
    }

    if (productName !== "" && prices.length === 3) {
      productPrices[productName] = prices;
    }
  }

  const sortedProducts = Object.entries(productPrices).sort((a, b) => {
    const avgA = a[1].reduce((sum, price) => sum + price, 0) / a[1].length;
    const avgB = b[1].reduce((sum, price) => sum + price, 0) / b[1].length;
    if (avgA === avgB) {
      return a[0].localeCompare(b[0]);
    } else {
      return avgA - avgB;
    }
  });

  const result = document.getElementById("result-7");
  result.textContent = "";

  sortedProducts.forEach(([productName, prices]) => {
    result.innerHTML += `${productName}<br>`;
  });
}

addInputRowProduct();
