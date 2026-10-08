// O carrinho completo, Desafio integrador aula 5:

const nomes = ["Mouse", "Teclado", "Headset", "Webcam", "Monitor 24\""];
const valores = [49.90, 189.90, 229.90, 159.90, 899.90];

const carrinho = [];

carrinho.push("Headset");
carrinho.push("Mouse");
carrinho.push("Teclado");
carrinho.push("Mouse");
carrinho.push("Impressora");

let posicaoTeclado = carrinho.indexOf("Teclado");

if (posicaoTeclado !== -1) {
  carrinho.splice(posicaoTeclado, 1);
}

let subtotal = 0;
let itens = 0;

for (let i = 0; i < carrinho.length; i++) {
  let posicao = nomes.indexOf(carrinho[i]);

  if (posicao !== -1) {
    console.log(carrinho[i].padEnd(16) + "R$ " + valores[posicao].toFixed(2));
    subtotal = subtotal + valores[posicao];
    itens = itens + 1;
  } else {
    console.log("Não encontrado: " + carrinho[i]);
  }
}
let frete = subtotal >= 500 ? 0 : 29.90;
let total = subtotal + frete;

console.log("----------------------------");
console.log("Itens:".padEnd(16) + itens);
console.log("Subtotal:".padEnd(16) + "R$ " + subtotal.toFixed(2));
console.log("Frete:".padEnd(16) + "R$ " + frete.toFixed(2));
console.log("----------------------------");
console.log("TOTAL:".padEnd(16) + "R$ " + total.toFixed(2));
