// Desafio integrador aula 8

class Produto {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }

  calcularFrete(qtd) {
    return 0;
  }
}

class ProdutoFisico extends Produto {
  #estoque;

  constructor(nome, preco, estoque) {
    super(nome, preco);
    this.#estoque = estoque;
  }

  get estoque() {
    return this.#estoque;
  }

  vender(qtd) {
    if (this.#estoque >= qtd) {
      this.#estoque -= qtd;
      return true;
    }
    return false;
  }

  calcularFrete(qtd) {
    return 15 * qtd;
  }
}

class CursoOnline extends Produto {
  constructor(nome, preco, link) {
    super(nome, preco);
    this.link = link;
  }

  vender(qtd) {
    return true; 
  }

  calcularFrete(qtd) {
    return 0; 
  }
}

class Carrinho {
  constructor() {
    this.itens = [];
  }

  adicionar(produto, qtd) {
    if (produto.vender(qtd)) {
      this.itens.push({ produto, qtd });
      return true;
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
    let totalFrete = 0;
    for (let i = 0; i < this.itens.length; i++) {
      totalFrete += this.itens[i].produto.calcularFrete(this.itens[i].qtd);
    }
    return totalFrete;
  }
  total() {
    return this.subtotal() + this.frete();
  }
}

class Pix {
  calcularTotal(valor) {
    return valor * 0.95; // multiplicar por 0.95 equivalea 5% de desconto
  }
}

class Cartao {
  calcularTotal(valor) {
    return valor;
  }
}
class Boleto {
  calcularTotal(valor) {
    return valor + 3.50; 
  }
}

class Pedido {
  constructor(carrinho, pagamento) {
    this.carrinho = carrinho;
    this.pagamento = pagamento;
  }

  calcularTotal() {
    return this.pagamento.calcularTotal(this.carrinho.total());
  }
}

const headset = new ProdutoFisico("Headset", 229.90, 4);
const mouse = new ProdutoFisico("Mouse", 49.90, 15);
const cursoJS = new CursoOnline("JavaScript", 197.00, "https://link.com");
const webcam = new ProdutoFisico("Webcam", 159.90, 0);

const carrinho = new Carrinho();

const res1 = carrinho.adicionar(headset, 1);
const res2 = carrinho.adicionar(mouse, 2);
const res3 = carrinho.adicionar(cursoJS, 1);
const res4 = carrinho.adicionar(webcam, 1);

console.log(`adicionar: ${res1} · ${res2} · ${res3} · ${res4} (Webcam)`);
console.log("");

// exibir
console.log("Subtotal: R$", carrinho.subtotal().toFixed(2));
console.log("Frete:    R$", carrinho.frete().toFixed(2));
console.log("Total:    R$", carrinho.total().toFixed(2));
console.log("----------------------------------");

// formas de pagamento
const pix = new Pix();
const cartao = new Cartao();
const boleto = new Boleto();

const pedidoPix = new Pedido(carrinho, pix);
const pedidoCartao = new Pedido(carrinho, cartao);
const pedidoBoleto = new Pedido(carrinho, boleto);

console.log("Pix:     R$", pedidoPix.calcularTotal().toFixed(2));
console.log("Cartao:  R$", pedidoCartao.calcularTotal().toFixed(2));
console.log("Boleto:  R$", pedidoBoleto.calcularTotal().toFixed(2));

console.log(`Estoque:  Headset ${headset.estoque} · Mouse ${mouse.estoque}`);