// Desafio integrador aula 6

const nomes = ["Mouse", "Teclado", "Headset", "Webcam", 'Monitor 24"'];
const valores = [49.90, 189.90, 229.90, 159.90, 899.90];

function adicionar(carrinho, item) {
  carrinho.push(item);
}

function remover(carrinho, item) {
  const indice = carrinho.indexOf(item);
  if (indice !== -1) {
    carrinho.splice(indice, 1);
    return true;
  }
  return false;
}

function calcularSubtotal(carrinho) {
  let subtotal = 0;
  for (let i = 0; i < carrinho.length; i++) {
    const item = carrinho[i];
    const indiceNoCatalogo = nomes.indexOf(item);
    if (indiceNoCatalogo !== -1) {
      subtotal += valores[indiceNoCatalogo];
    }
  }
  return subtotal;
}

function calcularFrete(subtotal) {
  if (subtotal >= 500) {
    return 0;
  } else {
    return 29.90;
  }
}

const carrinho = [];
adicionar(carrinho, "Headset");
adicionar(carrinho, "Mouse");
adicionar(carrinho, "Teclado");
adicionar(carrinho, "Mouse");
adicionar(carrinho, "Impressora");

console.log(remover(carrinho, "Teclado")); 
console.log(remover(carrinho, "Monitor"));
console.log("");

const subtotal = calcularSubtotal(carrinho);
const frete = calcularFrete(subtotal);
const total = subtotal + frete;

console.log("Carrinho:", carrinho.join(", "));
console.log("Subtotal:   R$", subtotal.toFixed(2));
console.log("Frete:      R$", frete.toFixed(2));
console.log("------------------------------");
console.log("TOTAL:      R$", total.toFixed(2));