// Desafio integrador aula 2

const processador = 899.90;
const memoriaRAM = 289.90;
const ssd = 349.90;
const fonte = 279.90;
const gabinete = 199.90;

const maquinas = 5;

const custoPorMaquina = processador + memoriaRAM + ssd + fonte + gabinete;
const subtotal = custoPorMaquina * maquinas;
const valorDesconto = subtotal * 0.08;
const frete = 150.00;
const totalFinal = subtotal - valorDesconto + frete;

const formatarMoeda = (valor) => {
    return valor.toFixed(2).replace('.', ',');
};

console.log("========================================");
console.log("       ORÇAMENTO - TechSolutions Ltda   ");
console.log("========================================");
console.log("Máquinas:            " + maquinas);
console.log("Custo por máquina:   R$ " + formatarMoeda(custoPorMaquina));
console.log("Subtotal:            R$ " + formatarMoeda(subtotal));
console.log("Desconto (8%):      -R$ " + formatarMoeda(valorDesconto));
console.log("Frete:              +R$ " + formatarMoeda(frete));
console.log("----------------------------------------");
console.log("TOTAL FINAL:         R$ " + formatarMoeda(totalFinal));