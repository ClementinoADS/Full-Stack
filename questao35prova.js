// questao 35

function contarPares(lista) {
    let contador = 0; // variavel pra guardar qtd de pares

    // o for passa por cada item da array, o if verifica se o numero atual é par / tem resto 0 
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] % 2 === 0) {
            contador++; // se for par, soma mais 1 ao contador
        }
    }
    return contador; // devolve o total de numeros pares
}
console.log(contarPares([1, 4, 6, 7])); // 2