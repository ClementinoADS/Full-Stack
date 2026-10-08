// Desafio integrador aula 4

const pedidos = [450, 620, 520, 1200, 89.90, 499.99, 3599.60];

let faturamento = 0;
let freteGratisContador = 0;
let maiorPedido = pedidos[0];

for (let i = 0; i < pedidos.length; i++) {
    let valor = pedidos[i];
    let valorFrete = valor >= 500 ? 0 : 29.90;
    let textoFrete = valorFrete === 0 ? "Frete grátis" : `Frete R$ ${valorFrete.toFixed(2)}`;
    
    faturamento += valor + valorFrete;

    if (valorFrete === 0) {
        freteGratisContador++;
    }

    if (valor > maiorPedido) {
        maiorPedido = valor;
    }
    console.log(`Pedido ${i + 1}: R$ ${valor.toFixed(2)} | ${textoFrete}`);
}

console.log("----------------------------------");
console.log(`Faturamento:          R$ ${faturamento.toFixed(2)}`);
console.log(`Pedidos c/ frete grátis: ${freteGratisContador}`);
console.log(`Maior pedido:         R$ ${maiorPedido.toFixed(2)}`);