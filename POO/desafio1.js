class CartaoFidelidade {
    #pontos;

    constructor() {
        this.#pontos = 0;
    }

    get buscarPontos() {
        return this.#pontos;
    }

    adicionar(valor) {
        return this.#pontos += valor;
    }

    resgatar(qtd) {
        if (qtd > this.#pontos) return false;

        this.#pontos -= qtd;
        return true;
    }
}

const cartao = new CartaoFidelidade();
console.log(`Total de pontos: ${cartao.buscarPontos}`);
cartao.adicionar(89.90);
cartao.adicionar(129.90);
console.log(`Total de pontos após adicionar: ${cartao.buscarPontos}`);
cartao.resgatar(300); // true
console.log(`Resgatei 300 pontos e fiquei com ${cartao.buscarPontos} pontos.`);
cartao.resgatar(500); // false
console.log(`Resgatei 500 pontos e fiquei com ${cartao.buscarPontos} pontos.`);

