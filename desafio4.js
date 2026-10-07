class Produto {
    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
    }
    
    calcularFrete() {
        return 0;
    }
}

class ProdutoFisico extends Produto {
    calcularFrete() {
        return 15;
    }
}

class ProdutoPesado extends ProdutoFisico {
    calcularFrete() {
        return 40;
    }
}

class CursoOnline extends Produto {} // vai usar tudo da classe Produto

const itens = [
    new ProdutoPesado("Monitor", 999.90),
    new ProdutoFisico("Mouse", 59.90),
    new CursoOnline("Programador Full Stack", 50.00)
];

let totalFrete = 0;

for(const i of itens) {
    totalFrete += i.calcularFrete();
}

console.log(`Total pago de frete: R$ ${totalFrete.toFixed(2)}`);