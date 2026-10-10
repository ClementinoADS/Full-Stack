// Exceção personalizada para erros de negócio da biblioteca
class BibliotecaError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = "BibliotecaError";
    }
}
class Usuario {
    #id;
    #nome;
    #email;
    #multasPendentes;

    constructor(id, nome, email) {
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#multasPendentes = 0;
    }

    // Getters
    get id() { return this.#id; }
    get nome() { return this.#nome; }
    get email() { return this.#email; }
    get multasPendentes() { return this.#multasPendentes; }

    // Setter com validação
    set email(novoEmail) {
        if (!novoEmail.includes("@")) {
            throw new BibliotecaError("E-mail inválido.");
        }
        this.#email = novoEmail;
    }

    adicionarMulta(valor) {
        this.#multasPendentes += valor;
    }

    pagarMulta(valor) {
        if (valor > this.#multasPendentes) {
            this.#multasPendentes = 0;
        } else {
            this.#multasPendentes -= valor;
        }
    }
}

// 2. Classe Livro com encapsulamento de estoque
class Livro {
    #isbn;
    #titulo;
    #autor;
    #exemplaresDisponiveis;

    constructor(isbn, titulo, autor, exemplaresDisponiveis) {
        this.#isbn = isbn;
        this.#titulo = titulo;
        this.#autor = autor;
        this.#exemplaresDisponiveis = exemplaresDisponiveis;
    }

    get isbn() { return this.#isbn; }
    get titulo() { return this.#titulo; }
    get autor() { return this.#autor; }
    get exemplaresDisponiveis() { return this.#exemplaresDisponiveis; }

    emprestar() {
        if (this.#exemplaresDisponiveis <= 0) {
            throw new BibliotecaError(`O livro "${this.#titulo}" não tem exemplares disponíveis.`);
        }
        this.#exemplaresDisponiveis--;
    }

    devolver() {
        this.#exemplaresDisponiveis++;
    }
}

// 3. Classe Empréstimo (Gerencia a relação entre Usuário e Livro)
class Emprestrimo {
    #id;
    #usuario;
    #livro;
    #dataEmprestimo;
    #dataDevolucaoPrevista;
    #devolvido;

    constructor(id, usuario, livro, diasPrazo = 7) {
        this.#id = id;
        this.#usuario = usuario;
        this.#livro = livro;
        this.#dataEmprestimo = new Date();
        
        // Define a data de devolução somando os dias de prazo
        const devolucao = new Date();
        devolucao.setDate(devolucao.getDate() + diasPrazo);
        this.#dataDevolucaoPrevista = devolucao;
        
        this.#devolvido = false;

        // Executa a regra de negócio ao criar o empréstimo
        livro.emprestar();
    }

    get id() { return this.#id; }
    get usuario() { return this.#usuario; }
    get livro() { return this.#livro; }
    get dataDevolucaoPrevista() { return this.#dataDevolucaoPrevista; }
    get devolvido() { return this.#devolvido; }

    realizarDevolucao() {
        if (this.#devolvido) {
            throw new BibliotecaError("Este empréstimo já foi finalizado.");
        }

        const hoje = new Date();
        // Verifica se há atraso (comparação de datas)
        if (hoje > this.#dataDevolucaoPrevista) {
            const diasAtraso = Math.ceil((hoje - this.#dataDevolucaoPrevista) / (1000 * 60 * 60 * 24));
            const multa = diasAtraso * 2.50; // R$2,50 por dia de atraso
            this.#usuario.adicionarMulta(multa);
            console.log(`[ATRASO] Livro devolvido com ${diasAtraso} dia(s) de atraso. Multa gerada: R$ ${multa.toFixed(2)}`);
        }

        this.#livro.devolver();
        this.#devolvido = true;
        console.log(`[SUCESSO] Livro "${this.#livro.titulo}" devolvido por ${this.#usuario.nome}.`);
    }
}

// 4. Classe Controladora: Biblioteca (Gerencia coleções e fluxos)
class Biblioteca {
    #livros;
    #usuarios;
    #emprestimos;

    constructor() {
        this.#livros = new Map(); // Usar Map para buscar por ID/ISBN
        this.#usuarios = new Map();
        this.#emprestimos = [];
    }

    cadastrarLivro(livro) {
        this.#livros.set(livro.isbn, livro);
    }

    cadastrarUsuario(usuario) {
        this.#usuarios.set(usuario.id, usuario);
    }

    realizarEmprestimo(idEmprestimo, usuarioId, livroIsbn) {
        const usuario = this.#usuarios.get(usuarioId);
        const livro = this.#livros.get(livroIsbn);

        if (!usuario) throw new BibliotecaError("Usuário não encontrado.");
        if (!livro) throw new BibliotecaError("Livro não encontrado.");

        if (usuario.multasPendentes > 0) {
            throw new BibliotecaError(`Usuário possui multas pendentes de R$ ${usuario.multasPendentes.toFixed(2)}. Regularize antes de pegar livros.`);
        }

        const emprestimo = new Emprestrimo(idEmprestimo, usuario, livro);
        this.#emprestimos.push(emprestimo);
        console.log(`[EMPRÉSTIMO] Livro "${livro.titulo}" emprestado para ${usuario.nome}.`);
        return emprestimo;
    }
}

// Testando
const minhaBiblioteca = new Biblioteca();

// Cadastro
minhaBiblioteca.cadastrarLivro(new Livro("978-85", "Clean Code", "Robert Martin", 1));
minhaBiblioteca.cadastrarUsuario(new Usuario(1, "Carlos Silva", "carlos@email.com"));

try {
    // 1. Empréstimo bem sucedido
    const emp1 = minhaBiblioteca.realizarEmprestimo("EMP-01", 1, "978-85");

    // 2. Tentativa de pegar o mesmo livro emprestado (vai falhar pois só tinha 1 exemplar)
    // minhaBiblioteca.realizarEmprestimo("EMP-02", 1, "978-85");

    // Simulando a devolução
    emp1.realizarDevolucao();

} catch (erro) {
    if (erro instanceof BibliotecaError) {
        console.error(`Erro de Negócio: ${erro.message}`);
    } else {
        console.error(`Erro Inesperado: ${erro.message}`);
    }
}