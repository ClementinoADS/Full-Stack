class Pagamento {
    calcularTotal(valor) {
        return valor;
    }
}

class Pix extends Pagamento {
    calcularTotal(valor) {
        return valor * 0.05;
    }
}

class Cartao extends Pagamento {} // usar o método calcularTotal da classe Pagamento

class Boleto extends Pagamento {
    calcularTotal(valor) {
        return valor + 3.50;
    }
}

for (const p of [new Pix(), new Cartao(), new Boleto()]) {
    console.log(p.calcularTotal(359.60).toFixed(2));
}
