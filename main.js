

// Обект с курсами 3-х валют
const rates = {};
// Елементы для отображения курса валют
const elementUSD = document.querySelector('[data-value="USD"]');

const elementEUR = document.querySelector('[data-value="EUR"]');

const elementGBP = document.querySelector('[data-value="GBP"]');

// Елементы формы,ввод суммы , выбор валюты,поле с результатом

const input = document.querySelector('#input');

const result = document.querySelector('#result');

const select = document.querySelector('#select');


getCurrencies();

setInterval(getCurrencies,10000);
//Функцыя получения курса валют и отображения их на странице

async function getCurrencies () {

    const response = await fetch(`https://www.cbr-xml-daily.ru/daily_json.js`);

    const data = await response.json();

    const result = await data;

    // console.log(result)

    // console.log(result.Valute.USD.Value)


rates.USD = result.Valute.USD;

rates.EUR= result.Valute.EUR;

rates.GBP= result.Valute.GBP;

console.log(rates);

elementUSD.textContent = rates.USD.Value.toFixed(2);

elementEUR.textContent = rates.EUR.Value.toFixed(2);

elementGBP.textContent = rates.GBP.Value.toFixed(2);

//Color for informer USD

if (rates.USD.Value > rates.USD.Previous) {

    elementUSD.classList.add('top');

} else {

    elementUSD.classList.add('bottom');

}

//Color for informer EUR

if (rates.EUR.Value > rates.EUR.Previous) {

    elementEUR.classList.add('top');

} else {

    elementEUR.classList.add('bottom');

}

//Color for informer GBP

if (rates.GBP.Value > rates.GBP.Previous) {

    elementGBP.classList.add('top');

} else {

    elementGBP.classList.add('bottom');

}

}

//Слушаем изминения в текстовом поле и в Select

input.oninput = convertValue;
select.oninput = convertValue;

//Функцыя конвертацыи

function convertValue () {
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
}