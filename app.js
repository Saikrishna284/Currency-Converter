const message = document.getElementById("message");
const inputAmount = document.getElementById("input-amount");
const errMessage = document.getElementById("err-message");
const fromCurrency = document.getElementById("from-currencyList");
const toCurrency = document.getElementById("to-currencyList");
const convertBtn = document.getElementById("convert-btn");
const result1 = document.getElementById("result-1");
const result2 = document.getElementById("result-2");

convertBtn.addEventListener("click", conversion);

message.innerText = `Exchange Rate Today`;

async function conversion() {
  let inputAmountValue = inputAmount.value;
  if (inputAmountValue == "" || inputAmountValue == 0) {
    triggerError();
  } else {
    errMessage.innerText = ``;
    let selectedFromCurrency = fromCurrency.value;
    let selectedToCurrency = toCurrency.value;
    let url = `https://v6.exchangerate-api.com/v6/854fde7fcdb45665ba2bf39a/latest/${selectedFromCurrency}`;

    const response = await fetch(url);
    const data = await response.json();

    let convertedResult = data.conversion_rates[selectedToCurrency];
    message.innerText = `${selectedFromCurrency} to ${selectedToCurrency} Exchange Rate Today`;

    display(
      inputAmountValue,
      selectedFromCurrency,
      selectedToCurrency,
      convertedResult
    );
  }
}
function display(
  inputAmountValue,
  selectedFromCurrency,
  selectedToCurrency,
  convertedResult
) {
  let finalResult = inputAmountValue * convertedResult;
  result1.innerText = ` ${selectedFromCurrency} ${inputAmountValue}  =  ${selectedToCurrency}  ${finalResult.toFixed(
    3
  )} `;
  result2.innerText = `1  ${selectedFromCurrency}  =  ${selectedToCurrency}  ${convertedResult.toFixed(
    3
  )} `;
}

function triggerError() {
  errMessage.innerText = `Please Enter valid Amount !`;
}
