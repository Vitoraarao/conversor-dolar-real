let usdInput = document.querySelector("#usd");
let brlInput = document.querySelector("#brl");
let dolar = 5.8; // Valor inicial, será atualizado pela API

// Função para buscar a cotação do dólar
function fetchDollarRate() {
    fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
        .then(response => response.json())
        .then(data => {
            dolar = parseFloat(data.USDBRL.bid); // Atualiza o valor do dólar com a cotação atual
            console.log("Cotação atual do dólar: " + dolar);
            convert("usd-to-brl"); // Atualiza o valor convertido quando a cotação é carregada
        })
        .catch(error => console.error('Erro ao buscar a cotação:', error));
}

// Chamar a função para obter a cotação ao carregar a página
fetchDollarRate();

usdInput.addEventListener("keyup", () => {
    convert("usd-to-brl");
});

brlInput.addEventListener("keyup", () => {
    convert("brl-to-usd");
});

usdInput.value = "1000,00";
convert("usd-to-brl");

// Funções

function formatCurrency(value) {
    // Ajustar o valor
    let fixedValue = fixValue(value);
    let options = {
        useGrouping: false,
        minimumFractionDigits: 2
    };
    let formatter = new Intl.NumberFormat("pt-BR", options);
    return formatter.format(fixedValue);
}

function fixValue(value) {
    let fixedValue = value.replace(",", ".");
    let floatValue = parseFloat(fixedValue);
    if (isNaN(floatValue)) {
        floatValue = 0;
    }
    return floatValue;
}

function convert(type) {
    if (type == "usd-to-brl") {
        let fixedValue = fixValue(usdInput.value);

        let result = fixedValue * dolar;
        result = result.toFixed(2);

        brlInput.value = formatCurrency(result);
    }

    if (type == "brl-to-usd") {
        let fixedValue = fixValue(brlInput.value);

        let result = fixedValue / dolar;
        result = result.toFixed(2);

        usdInput.value = formatCurrency(result);
    }
}
