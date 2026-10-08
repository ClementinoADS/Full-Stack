// DESAFIO INTEGRADOR aula 7

const produtos = [
    { nome: "Headset", preco: 99.90 },
    { nome: "Mouse", preco: 114.90 },
    { nome: "Teclado", preco: 150.00 }
];
class Carrinho {
    constructor() {
        this.itens = [];
    }
    adicionar(produto, qtd = 1) {
        this.itens.push({ produto: produto, qtd: qtd });
    }
    remover(nome) {
        for (let i = 0; i < this.itens.length; i++) {
            if (this.itens[i].produto.nome === nome) {
                this.itens.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    subtotal() {
        let soma = 0;
        for (let i = 0; i < this.itens.length; i++) {
            soma += this.itens[i].produto.preco * this.itens[i].qtd;
        }
        return soma;
    }
    frete() {
        let sub = this.subtotal();
        if (sub >= 500) {
            return 0;
        } else {
            return 29.90;
        }
    }

    total() {
        return this.subtotal() + this.frete();
    }
}
const carrinho = new Carrinho();

carrinho.adicionar(produtos[0], 1); // headset x1
carrinho.adicionar(produtos[1], 2); // Mouse x2
carrinho.adicionar(produtos[2], 1); // teclado x1

console.log('carrinho.remover("Teclado")', carrinho.remover("Teclado")); 
console.log('carrinho.remover("Monitor")', carrinho.remover("Monitor")); 

console.log("\n--- IMPRIMINDO O RESUMO ---");

let itensTexto = "";
for (let i = 0; i < carrinho.itens.length; i++) {
    itensTexto += carrinho.itens[i].produto.nome + " x" + carrinho.itens[i].qtd;
    if (i < carrinho.itens.length - 1) {
        itensTexto += ", ";
    }
}
console.log("Itens:     " + itensTexto);
console.log("Subtotal:  R$ " + carrinho.subtotal().toFixed(2));
console.log("Frete:     R$ " + carrinho.frete().toFixed(2));
console.log("-----------------------------------");
console.log("TOTAL:     R$ " + carrinho.total().toFixed(2));