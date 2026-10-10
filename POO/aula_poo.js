class Produto {
  #estoque;
  #preco;

  constructor(nome, preco, estoque) {
    this.nome = nome;
    this.#preco = preco;
    this.#estoque = estoque;
  }

  vender(qtd) {
    if (qtd > this.#estoque) return false;

    this.#estoque -= qtd;
    return true;
  }

  calcularFrete() {
    return 0;
  }

  get buscarEstoque() {
    return this.#estoque;
  }

  get buscarPreco() {
    return this.#preco;
  }

  set alterarPreco(valor) {
    if (valor <= 0) return false;

    this.#preco = valor;
    return true;
  }
}

class ProdutoFisico extends Produto {
  #estoque;

  constructor(nome, preco, estoque) {
    super(nome, preco, estoque);
    this.nome = nome;
    this.preco = preco;
    this.#estoque = estoque;
  }

  calcularFrete() {
    return 15;
  }
}

const headset = new Produto("Headset", 229.90, 4);
const monitor = new Produto("Monitor", 1299.90, 5);
const mouse = new Produto("Mouse", 59.90, 10);

const itens = [headset, monitor, mouse];
let total = 0;

for (const p of itens) {
  total += p.calcularFrete();
}

console.log(`Total: ${total}`); // 0

const headset2 = new ProdutoFisico("Headset2", 229.90, 4);
const monitor2 = new ProdutoFisico("Monitor2", 1299.90, 5);
const mouse2 = new ProdutoFisico("Mouse2", 59.90, 10);

const itens2 = [headset2, monitor2, mouse2];
let total2 = 0;

for (const p2 of itens2) {
  total2 += p2.calcularFrete();
}

console.log(`Total: ${total2}`); 


