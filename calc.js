"use strict";

function calculate() {
    const quantityField = document.getElementById("quantity");
    const productField = document.getElementById("product");
    const errorBox = document.getElementById("error");
    const result = document.getElementById("result");
    const quantityText = quantityField.value.trim();
    const pattern = /^[1-9]\d*$/;

    function fail(message) {
        errorBox.textContent = message;
        quantityField.classList.add("invalid");
        result.textContent = "";
    }

    errorBox.textContent = "";
    quantityField.classList.remove("invalid");

    if (quantityText === "") {
        fail("Введите количество товара.");
        return;
    }

    if (!pattern.test(quantityText)) {
        fail("Введите количество товара целым положительным числом (только цифры, без пробелов и знаков).");
        return;
    }

    const quantity = parseInt(quantityText, 10);

    if (quantity > 1000000) {
        fail("Максимальное количество — 1 000 000 шт.");
        return;
    }

    const price = parseInt(productField.value, 10);
    const name = productField.options[productField.selectedIndex].text;
    const total = (price * quantity).toLocaleString("ru-RU");

    result.textContent = "Стоимость заказа (" + name + ", " + quantity +
            "\u00A0шт.): " + total + "\u00A0₽";
}

function init() {
    const button = document.getElementById("calc-button");
    const form = document.getElementById("calc-form");

    button.addEventListener("click", calculate);
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        calculate();
    });
}

document.addEventListener("DOMContentLoaded", init);
