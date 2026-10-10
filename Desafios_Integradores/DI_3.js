//Desafio integrador aula 3

let precoUnitario = 899.90;
let quantidade = 4;
let formaPagamento = "Pix";
let pctDescontoQtd = 0;

if (quantidade >= 6) {
    pctDescontoQtd = 0.10;
} else if (quantidade >= 3) {
    pctDescontoQtd = 0.05;
} else {
    pctDescontoQtd = 0;
}
let totalBruto = precoUnitario * quantidade;
let valorDescontoQtd = totalBruto * pctDescontoQtd;
let subtotal = totalBruto - valorDescontoQtd;
let valorDescontoPag = 0;

switch (formaPagamento) {
    case "Pix":
        valorDescontoPag = subtotal * 0.05;
        break;
    case "Débito":
        valorDescontoPag = 0;
        break;
    case "Crédito":
        valorDescontoPag = 0;
        break;
}

let totalComPagamento = subtotal - valorDescontoPag;

let valorFrete = totalComPagamento >= 500 ? 0 : 29.90;

let mensagemFrete = valorFrete === 0 ? "Frete grátis!" : `R$ ${valorFrete.toFixed(2)}`;

let totalFinal = totalComPagamento + valorFrete;

console.log("==========================================");
console.log("CAIXA - Loja de Informática");
console.log("==========================================");
console.log(`Monitor 24" x ${quantidade}               R$ ${totalBruto.toFixed(2)}`);

if (pctDescontoQtd > 0) {
    console.log(`Desconto quantidade (${pctDescontoQtd * 100}%)      -R$ ${valorDescontoQtd.toFixed(2)}`);
}

console.log(`Subtotal                      R$ ${subtotal.toFixed(2)}`);

if (formaPagamento === "Pix") {
    console.log(`Pix (5% de desconto)          -R$ ${valorDescontoPag.toFixed(2)}`);
}

console.log(`${mensagemFrete}`);
console.log("------------------------------------------");
console.log(`TOTAL                         R$ ${totalFinal.toFixed(2)}`);