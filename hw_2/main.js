function checkTriangleExistence(a, b, c) {
  if (a + b > c && a + c > b && b + c > a) {
    return "Треугольник существует!";
  } else {
    return "Треугольник не существует!";
  }
}

function checkTriangle() {
  let sideA = Number(document.getElementById("side-a").value);
  let sideB = Number(document.getElementById("side-b").value);
  let sideC = Number(document.getElementById("side-c").value);

  if (sideA <= 0 || sideB <= 0 || sideC <= 0) {
    document.getElementById("result").innerHTML = "Некорректный ввод!";
    return;
  }

  let res = checkTriangleExistence(sideA, sideB, sideC);
  document.getElementById("result-1").textContent = res;
}

function power() {
  const Y = Number(document.getElementById("number-y").value);
  const calculator = {
    base: Y - 2,
    power: function (Y) {
      return Math.pow(Y - 2, Y);
    },
  };
  document.getElementById("result-2").textContent = calculator.power(Y);
}

let bankAccount = {
  balance: 500,

  deposit: function (amount) {
    this.balance += amount;
    updateBalance();
    localStorage.setItem("balance", this.balance);
  },

  withdraw: function (amount) {
    if (amount > this.balance) {
      alert("Недостаточно средств на счете");
    } else {
      this.balance -= amount;
      updateBalance();
      localStorage.setItem("balance", this.balance);
    }
  },
};

function updateBalance() {
  document.getElementById(
    "balance-text"
  ).textContent = `Текущий баланс: ${bankAccount.balance}`;
}

function showOptions() {
  let choice = prompt("Вы хотите снять или внести деньги?");
  if (choice.toLowerCase() === "внести" || choice.toLowerCase() === "снять") {
    let amount = prompt("Введите сумму:");
    if (choice === "внести") {
      bankAccount.deposit(Number(amount));
    } else if (choice === "снять") {
      bankAccount.withdraw(Number(amount));
    }
  } else {
    alert("Некорректный выбор операции.");
  }
}

const storedBalance = localStorage.getItem("balance");
if (storedBalance) {
  bankAccount.balance = Number(storedBalance);
}

updateBalance();
