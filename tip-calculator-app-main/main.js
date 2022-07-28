'use strict'
const billInpContainer = document.querySelector(".billinpcont");
const customersInpContainer = document.querySelector(".customersinpcont");
const billInp = document.querySelector(".billinp");
const customersInp = document.querySelector(".customersinp");
const tipBtnArr = document.querySelectorAll(".btn");
const tipInp = document.querySelector(".customtip");
const tipOutput = document.querySelector(".tipamountout");
const totalOutput = document.querySelector(".totalamountout");
const resetBtn = document.querySelector(".reset");
let tipAmount = 0;
let tiptotal = 0;
let total = 0;

for (let i = 0; i < tipBtnArr.length; i++) {
    tipBtnArr[i].addEventListener("click", function () {
        tipInp.value = "";
        if (this.classList.contains("val")) {
            this.classList.remove("val");
            tipAmount = 0
        } else {
            for (let j = 0; j < tipBtnArr.length; j++) {
                tipBtnArr[j].classList.remove("val");
                this.classList.add("val");
                tipAmount = this.value;
            }
        }
        console.log(tipAmount);
    });
}

tipInp.addEventListener("input", function () {
    for (let j = 0; j < tipBtnArr.length; j++) {
        tipBtnArr[j].classList.remove("val");
    }
    tipAmount = tipInp.value;
    console.log(tipAmount);
});

billInp.addEventListener("input", inputReactor);
customersInp.addEventListener("input", inputReactor);
tipInp.addEventListener("input", inputReactor);

function inputReactor() {
    if (billInp.value > 0 && customersInp.value > 0) {
        resetBtn.disabled = false;
    } else {
        resetBtn.disabled = true;
    }

    if (tipAmount > 0) {
        tiptotal = (billInp.value / 100)* tipAmount;
        total = Number(billInp.value) + tiptotal;
    }

    if (tipAmount > 0 && billInp.value > 0 && customersInp.value > 0) {
        tipOutput.innerHTML = `<img src="./images/cyan-icon-dollar.svg" alt="...dollar sign">${getRoundedNumber(tiptotal / customersInp.value)}`
        totalOutput.innerHTML = `<img src="./images/cyan-icon-dollar.svg" alt="...dollar sign">${getRoundedNumber(total / customersInp.value)}`;
    }

}

const numberFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

function getRoundedNumber(number) {
    return number.toString().indexOf(".") == -1 ? number : numberFormatter.format(number);
}

resetBtn.addEventListener("click", function(){
    billInp.value = "";
    customersInp.value = "";
    tipInp.value = "";
    inputReactor()
});