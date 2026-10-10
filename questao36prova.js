// questao 36

class Lampada {
    constructor() {
        this.ligada = false;
    }
    // alternar(), inverte o estado, se tiver false vira true, se for true vira false
    alternar() {
        this.ligada = !this.ligada;
    }

    // retorna "Ligada" se for true, e "Desligada" se for false
    estado() {
        return this.ligada ? "Ligada" : "Desligada"; // if e else ia ficar grande demais pra isso
    }
}

const lampada = new Lampada();
console.log(lampada.estado()); // desligada

lampada.alternar();
console.log(lampada.estado()); // ligada

lampada.alternar();
console.log(lampada.estado()); // desliga denovo, output desligada