// ===================================================================================	Exercício 1	
console.log('EXERCICIO 1')

class Usuario {
	constructor(_email, _senha){
		this.email = _email;
		this.senha = _senha;
	}
	isAdmin(){
		if (this.admin === true){
			return true;
		}else{ 
			return false;
		}
	}
}

class Admin extends Usuario {
	constructor(_email, _senha){
		super(_email, _senha);
		this.admin = true;
	}
}


const User1 = new Usuario('email@teste.com', 'senha123');
const Adm1 = new Admin('email@teste.com', 'senha123');
console.log(User1.isAdmin()) // false
console.log(Adm1.isAdmin()) // true



// ===================================================================================	Exercicio 2
console.log('EXERCICIO 2:')
const usuarios = [
 { nome: 'Diego', idade: 23, empresa: 'Rocketseat' },
 { nome: 'Gabriel', idade: 15, empresa: 'Rocketseat' },
 { nome: 'Lucas', idade: 30, empresa: 'Facebook' },
];

const map = usuarios.map(function(item, index){
	return(item.idade)
});

const filter = usuarios.filter(function(item){
	return item.idade > 18 && item.empresa == 'Rocketseat';
});

const find = usuarios.find(function(item){
	return item.empresa === 'Google';
});

let operacoes = usuarios.map(function(item, index){
	item.idade *= 2;
	return item;
});
operacoes = usuarios.filter(function(item){
	return item.idade <= 50;
});



// ===================================================================================	Exercicio 3
console.log('EXERCICIO 3:')

// 3.1
 const arr = [1, 2, 3, 4, 5];
// arr.map(function(item) {
//  return item + 10;
// });
const _arr = arr.map(item => item + 10);

// 3.2
// Dica: Utilize uma constante pra function
const usuario = { nome: 'Diego', idade: 23 };
// function mostraIdade(usuario) {
//  return usuario.idade;
// }
// mostraIdade(usuario);
const mostraIdade = usuario => usuario.idade;
console.log(mostraIdade(usuario))


// 3.3
// Dica: Utilize uma constante pra function
const nome = "Diego";
const idade = 23;
// function mostraUsuario(nome = 'Diego', idade = 18) {
//  return { nome, idade };
// }
const mostraUsuario = (nome = 'Diego', idade = 18) => ({nome, idade});
mostraUsuario(nome, idade);
mostraUsuario(nome);

// 3.4
// const promise = function() {
//  return new Promise(function(resolve, reject) {
//  return resolve('Sucesso!');
//  })
// }
const promise = () => new Promise((resolve, reject) => resolve('Sucesso!'));

promise()
.then(function(resolve){
	console.log(resolve);
})
.catch(function(error){
	console.log(error);
});



// ===================================================================================	Exercicio 4
console.log('EXERCICIO 4:');

const empresa = {
	nome: 'Rocketseat',
	endereco: {
		cidade: 'Rio do Sul',
		estado: 'SC',
	}
};
const {nome, endereco:{cidade, estado}} = empresa;
console.log(nome); // Rocketseat
console.log(cidade); // Rio do Sul
console.log(estado); // SC


function mostraInfo(usuario) {
	const {nome, idade} = usuario;
 return `${nome} tem ${idade} anos.`;
}
mostraInfo({ nome: 'Diego', idade: 23 })




// ===================================================================================	Exercicio 5
console.log('EXERCICIO 5:');
const arr = [1, 2, 3, 4, 5, 6]

var [x, ...y]= arr;
console.log(x); // 1
console.log(y); // [2, 3, 4, 5, 6]

function soma(...params) {
    return params.reduce((a, b) => a + b);
}
console.log(soma(1, 2, 3, 4, 5, 6)); // 21
console.log(soma(1, 2)); // 3


const usuario = {
	nome: 'Diego',
	idade: 23,
	endereco: {
		cidade: 'Rio do Sul',
		uf: 'SC',
		pais: 'Brasil',
	}
};
const usuario2 = {...usuario, nome: 'Gabriel'};
const usuario3 = {...usuario, endereco: {...usuario.endereco, cidade: 'Londrina'}};


// ===================================================================================	Exercicio 6
console.log('EXERCICIO 6:');

const usuario = 'Diego';
const idade = 23;
//console.log('O usuário ' + usuario + ' possui ' + idade + ' anos');
console.log(`O usuário ${usuario} possui ${idade} anos`);


// ===================================================================================	Exercicio 7
console.log('EXERCICIO 7:');

const nome = 'Diego';
const idade = 23;
const usuario = {
	nome,
	idade,
	cidade: 'Rio do Sul',
};