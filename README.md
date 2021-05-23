# ES6+

# **O que é**

ES6, ECMAScript 6 ou ES2015, é simplesmente a mais nova versão do JavaScript.

Na verdade, o nome mais usado atualmente é ES2015. A ideia do comitê responsável (conhecido como [TC39](http://www.ecma-international.org/memento/TC39.htm)) pelas atualizações da linguagem é justamente fazer um *release* anual. Então nesse ano teremos o ES2016 (ou ES7). E assim sucessivamente.

Porém nesse *post* usarei o nome ES6 porque é o mais conhecido pela comunidade.

# **ECMAScript x JavaScript x ES**

Uma dúvida bem comum é o porquê dessa mudança do nome.Na verdade não houve nenhuma mudança: JavaScript é como nós chamamos a linguagem, só que esse nome é um *trademark* da Oracle (que veio após a compra da *Sun*). O nome oficial da linguagem é ECMAScript. E ES é simplesmente uma abreviação do mesmo.

# **Objetivos do ES6**

O TC39 focou em alguns objetivos no desenvolvimento do ES6:

- Ser uma linguagem melhor para construir aplicações complexas
- Resolver problemas antigos do JavaScript
- Facilidade no desenvolvimento de *libraries*

Esses objetivos ficarão mais claros quando olharmos na prática as *features* do ES6.

# **Como usar**

No momento que esse *post* está sendo escrito, a grande maioria dos *browsers* ainda não dão suporte ao ES6, então o que podemos fazer para contornar essa limitação?

Podemos usar um *transpiler* como o [Babel](https://babeljs.io/).

O Babel transforma o seu código de ES6 para ES5 (versão que a maioria dos *browsers* dá suporte hoje).

# **Transpilando ES6**

Agora vamos iniciar o npm com:

```
npm init
```

Aceite todas as opções e agora entre com o comando:

```
npm install -D @babel/core @babel/cli @babel/preset-env
```

Vamos agora abrir o **index.js** para escrever código em ES6:

O Babel por si só não sabe como *transpilar* o código. Por isso ele precisa de alguns plugins.

Numa aplicação real uma recomendação seria utilizar o ***WebPack*** com o Babel. 

# **Quais as novidades do ES6**

Agora que já sabemos o que é o ES6 e como podemos usá-lo hoje mesmo com o Babel, podemos então ver as *features* que ele adicionará na linguagem e seus benefícios.

# **Declaração de variáveis**

### **var x let**

A diferença principal entre o *var* e o *let* é que enquanto o primeiro tem escopo de função, o segundo possui escopo de bloco:

```
// escopo de função com var
function doSomething() {
  var a = 1;
  if (true) {
    var b = 2; // b é declarado dentro do if mas é visível fora
  }
  var c = a + b; // 3
}

//escopo de bloco com let
function doSomethingElse() {
  let a = 1
  if (true) {
    let b = 2 // b é declarado dentro do if e não é visível fora
  }
  let c = a + b // Uncaught ReferenceError: b is not defined
}
```

Um outro exemplo de coisas inesperadas que acontecem quando usamos o *var*:

```
for (var i = 0; i < 5; i++) { /* do something */ }
for (let j = 0; j < 5; j++) { /* do something else */}

console.log(i); // 5
console.log(j); // Uncaught ReferenceError: j is not defined
```

Em resumo, *let* conserta o antigo problema causado pelo *hoisting* (contextos de execução, sugere que as declarações de variáveis e funções são fisicamente movidas para o topo do seu código) fazendo com que a declaração de variáveis funcione da forma esperada pela maioria dos desenvolvedores.

### **let x const**

*const* funciona de forma semelhante. A única diferença é que as variáveis criadas não podem ser reatribuídas:

```
let a = 1
a = 2

const b = 1
b = 2 // Uncaught SyntaxError "b" is read-only
```

Isso não é verdade. As propriedades de um objeto, por exemplo, podem ser alteradas:

```
const object = {
  property: 1
}

object.property = 2
console.log(object.property) // 2
```

A minha opinião é de que devemos declarar todas as variáveis com *const* e quando a variável precisa ser reatribuída, e somente nesse caso, devemos usar o *let*. Não devemos usar o *var* (praticamente) nunca.

# **Parâmetro de funções**

Algumas pequenas alterações foram adicionadas em relação a parametrização de funções. Apesar dessas mudanças serem pequenas, elas trazem enormes benefícios.

### **default parameters**

Os parâmetros de funções tem *undefined* como valor *default*. Porém, em alguns casos, pode ser necessário utilizar um outro valor. Com a versão atual do JavaScript (ES5) nós já podemos fazer isso dessa forma:

```
var multiply = function(x, y) {
   y = y | 1;
   return x * y;
};

multiply(3, 2); // 6
multiply(3); // 3
```

O ES6 introduziu uma nova forma, bem mais simples, de se fazer isso. Basta adicionar o valor *default* na definição do parâmetro desejado:

```
const multiply = (x, y = 1) => {
  return x * y
}

multiply(3, 2) // 6
multiply(3) // 3
```

Ou então, com apenas uma linha:

```
const multiply = (x, y = 1) => x * y

multiply(3, 2) // 6
multiply(3) // 3
```

### **rest parameters**

Na versão atual do JavaScript podemos utilizar o objeto *arguments* para pegar todos os parâmetros de uma função:

```
var sum = function() {
    var result = 0;
    for (var i=0; i < arguments.length; i++) {
        result += arguments[i];
    }
    return result;
}

sum(1, 2, 3, 4, 5); // 15
```

O *arguments* porém, apresenta alguns problemas:

1. O objeto parece com um *array*, mas não é exatamente um.
2. Todos os parâmetros da função são automaticamente atribuídos ao *arguments*. Não temos uma forma clara de diferenciar os parâmetros.

Com esses problemas em mente, os *Rest Parameters* foram adicionados no ES6. O mesmo exemplo da soma poderia ser reescrito dessa forma:

```
function sum(...numbers) {
  let result = 0
  numbers.forEach((number) => {
    result += number
  })
  return result
}

sum(1, 2, 3, 4, 5) // 15
```

Ou dessa forma mais funcional:

```
const sum = (...numbers) => 
    numbers.reduce((acc, current) => acc + current, 0)

sum(1, 2, 3, 4, 5) // 15
```

Agora vamos imaginar o mesmo problema da soma, só que o primeiro parâmetro seria de onde a soma começaria e os próximos parâmetros seriam os números a serem somados:

Ou então:

```
function sum(start, ...numbers) {
  let result = start;
  numbers.forEach((number) => {
    result += number;
  });
  return result;
}

sum(10, 1, 2, 3, 4, 5); // 25
```

## **Programação Funcional**

### **arrow functions**

Os *arrow functions* são excelentes na criação de funções. Uma função que seria escrita dessa forma em ES5:

```
var sum = function(x, y) {
  return x + y;
};

sum(1, 2); // 3
```

Pode ser escrita dessa forma em ES6 com o uso das *arrow functions*:

```
const sum = (x, y) => {
  return x + y
}

sum(1, 2) // 3
```

Dessa forma mais resumida:

```
const sum = (x, y) => x + y

sum(1, 2) // 3
```

Com funções de apenas uma linha, podemos simplesmente omitir o *return* e as chaves.

Mas o verdadeiro benefício das *arrows functions* não está na expressividade, ele se encontra na resolução de um antigo problema da linguagem: o **this**.

No exemplo abaixo em ES5, podemos observar o this sendo utilizado de forma errada:

```
function Widget() {
    var button = document.getElementById('button');
    button.addEventListener('click', function() {
        this.doSomething(); // o 'this' não aponta para Widget como esperado e provocará um erro.
    });
}
```

Uma das formas mais comuns de resolver esse problema, é usando o **bind()** ou então com **self = this**. Porém com as *arrow functions* isso não é necessário. O **this** funcionará exatamente da forma esperada:

```
function Widget() {
    const button = document.getElementById('button')
    button.addEventListener('click', () => {
        this.doSomething() // o 'this' aponta para Widget e não provocará nenhum erro.
    })
}
```

### **destructuring**

Uma nova forma de declarar variáveis extraindo valores de objetos e *arrays* é através do *destructuring*. Ela funciona dessa forma:

```
const [a, b] = [1, 2]

console.log(a) // 1
console.log(b) // 2
```

E com *rest parameters*:

```
const [a, b, ...rest] = [1, 2, 3, 4, 5]

console.log(a) // 1
console.log(b) // 2
console.log(rest) // 3, 4, 5
```

Com objetos ela funciona desse jeito:

```
const person = { name: 'Matheus', age: 26 }

const {name, age} = person

console.log(name) // 'Matheus'
console.log(age) // 26
```

Provavelmente, o uso mais comum vai ser no *import* de *libs*. Vamos ter o poder de transformar isso:

```
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var Router = ReactRouter.Router;
```

Nisso:

```
const { 
  Route, 
  Link, 
  Router
} = require('react-router')
```

## **Orientação a Objetos**

### **Classes**

Classes nos dão uma sintaxe amigável que definem o estado e o comportamento de objetos que representam as abstrações que usamos diariamente.

### **constructor**

Por exemplo, se necessitarmos de uma abstração para animais em que cada animal possui um nome, poderíamos implementar da seguinte forma:

```
class Animal {
  constructor(name) {
    this._name = name
  }

  getName() {
    return this._name
  }

  setName(name) {
    this._name = name
  }
}

const animal = new Animal('dog')
animal.getName() // dog
animal.setName('cat')
animal.getName() // cat
```

O método *constructor* tem como tarefa fazer a inicialização da instância. Ele é chamado automaticamente na criação da mesma e garante que ela esteja em um estado válido.

### **getters/setters**

Como *getters* e *setters* são muito comuns na utilização de classes, o ES6 veio com um *syntax sugar* para lidar com os mesmos. Então podemos reescrever o exemplo anterior dessa forma melhorada:

```
class Animal {
  constructor(name) {
    this._name = name
  }

  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }
}

const animal = new Animal('dog')
animal.name // dog
animal.name = 'cat'
animal.name // cat
```

Lembrando que a principal função dos *getters/setters* é proteger os dados internos das instâncias de um objeto.

O *underscore* antes da propriedade *name*, é de que isso é uma convenção que indica que essa variável deve ser mantida privada.

### **herança**

Vamos pensar em um caso em que além de um nome, um Animal também terá um novo comportamento: emitir um som.

Podemos utilizar o conceito de herança com o *extends* e implementar dessa forma:

```
class Animal {
  constructor(name) {
    this._name = name
  }
   
  speak() {
    console.log(`${this._name} makes a noise`)
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this._name} barks`)
  }
}

class Cat extends Animal {
  speak() {
    console.log(`${this._name} meows`)
  }
}

const dog = new Dog('Rex')
dog.speak() // Rex barks

const cat = new Cat('Napoleon')
cat.speak() // Napoleon meows
```

## **ES6 Modules**

A maioria dos desenvolvedores que já trabalhou em projetos grandes sabe a importância dos módulos: organizar o sistema, aumentar o reuso e diminuir a complexidade de cada pequeno trecho do seu *code base*.

### **export/import**

Exportar módulos é bem simples. Após criarmos uma função podemos simplesmente adicionar a palavra *export* antes da definição da mesma:

```
// lib.js
export function sum(x, y) {
  return x + y
}
```

E para importar esse módulo em outro arquivo também é simples:

```
import { sum } from 'lib'

sum(1, 2) // 3
```

Com múltiplas funções é bem semelhante:

```
// lib.js
export function sum(x, y) {
  return x + y
}

export function mult(x, y) {
  return x * y
}
```

E para importar:

```
import { sum, mult } from 'lib'

sum(1, 2) // 3
mult(1, 2) // 2
```

Podemos também importar o módulo completo:

```
import * as lib from 'lib'

lib.sum(1, 2) // 3
lib.mult(1, 2) // 2
```

### **classes**

Para importar e exportar classes também não há muitas mudanças, basta criar uma classe com o *export* na frente:

```
// developer.js
export class Developer {
  constructor(name) {
    this._name = name
  }

  get name() {
    return this._name
  }
}
```

Agora podemos importá-la assim:

```
import { Developer } from 'developer'

const dev = new Developer('Matheus')
dev.name // 'Matheus'
```

### **default**

É comum termos a necessidade de exportar apenas uma função/classe por arquivo. Nesse cenário podemos utilizar a exportação *default*:

```
// square.js
export default function (x) {
  return x * x
}
```

Uma das vantagens é que o cliente (quem faz o *import*) é que vai *setar* o nome do módulo como bem quiser:

```
import square from 'square'

square(2) // 4
```
