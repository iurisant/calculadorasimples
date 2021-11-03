var novoCalculo = true // Utilizado na função operadores()
var verificarResposta = false // Utilizado na função operadores() e inserir()
var guardarOp, n1, n2 // Utilizado na função operadores()

//Inseri no painel os dígitos (0...9 e ponto).
function inserir(caracteres) {
  var resultado = document.getElementById('resultado').innerHTML
  var verificarPonto = resultado.includes('.')

  if (verificarResposta) { //Vai apagar o campo resposta para ser colocado o novo numero a ser calculado.
    document.getElementById('resultado').innerHTML = null
    verificarResposta = false
  }

  if (caracteres == '.' && !verificarPonto && resultado) { //Adiciona o ponto.
    document.getElementById('resultado').innerHTML += caracteres
  } else if (caracteres != '.') {
    document.getElementById('resultado').innerHTML += caracteres
  }
}

//Apaga o último dígito das strings do parágrafo resultado.
function apagar() {
  var resultado = document.getElementById('resultado').innerHTML
  document.getElementById('resultado').innerHTML = resultado.substring(0,resultado.length - 1)
}

//Limpa os paragrafos do painel e zera o n1 e n2, para começar um novo calculo.
function limpar() {
  document.getElementById('resultado').innerHTML = null
  document.getElementById('historico').innerHTML = null
  n1 = 0
  n2 = 0
}

//Faz o adiciona ou remove do sinal (-) no início das strings do parágrafo resultado.
function mudarSinal() {
  var resultado = document.getElementById('resultado').innerHTML
  var verificarNegativo = resultado.includes('-')

  if (!verificarNegativo) {
    document.getElementById('resultado').innerHTML = '-' + resultado
  } else {
    document.getElementById('resultado').innerHTML = resultado.replace('-', '')
  }
}

//Adiciona e calcula utilizando os operadores matematicos com o parâmetro (op).
function operadores(op) { //(op) - Guarda os operadores +/-/×/÷
  var resultado = document.getElementById('resultado').innerHTML
  var historico = document.getElementById('historico').innerHTML
  var verificarIgual = historico.includes('=')

  if (verificarIgual) { //Se houver o igual no campo historico ele vai apagar para receber uma nova conta.
    document.getElementById('historico').innerHTML = null
  }
  
  if (resultado) { 
    if (novoCalculo) {
      n1 = parseFloat(document.getElementById('resultado').innerHTML)
      if (n1 < 0) { //Sempre que um numero for negativo irá concatenar com parênteses a exibição do historico. 
        document.getElementById('historico').innerHTML += '(' + n1 + ')' + op
      } else {
        document.getElementById('historico').innerHTML += n1 + op
      }
      novoCalculo = false
    } else {
      //Adição
      if (guardarOp == '+') {
        n2 = parseFloat(document.getElementById('resultado').innerHTML)
        if (n2 < 0) {
          document.getElementById('historico').innerHTML += '(' + n2 + ')' + op
        } else {
          document.getElementById('historico').innerHTML += n2 + op
        }
        document.getElementById('resultado').innerHTML = n1 + n2
      }
      //Subtração
      if (guardarOp == '-') {
        n2 = parseFloat(document.getElementById('resultado').innerHTML)
        if (n2 < 0) {
          document.getElementById('historico').innerHTML += '(' + n2 + ')' + op
        } else {
          document.getElementById('historico').innerHTML += n2 + op
        }
        document.getElementById('resultado').innerHTML = n1 - n2
      }
      //Multiplicação
      if (guardarOp == '×') {
        n2 = parseFloat(document.getElementById('resultado').innerHTML)
        if (n2 < 0) {
          document.getElementById('historico').innerHTML += '(' + n2 + ')' + op
        } else {
          document.getElementById('historico').innerHTML += n2 + op
        }
        document.getElementById('resultado').innerHTML = n1 * n2
      }
      //Divisão
      if (guardarOp == '÷') {
        n2 = parseFloat(document.getElementById('resultado').innerHTML)
        if (n2 < 0) {
          document.getElementById('historico').innerHTML += '(-' + n2 + ')' + op
        } else {
          document.getElementById('historico').innerHTML += n2 + op
        }
        document.getElementById('resultado').innerHTML = n1 / n2
      }
      n1 = parseFloat(document.getElementById('resultado').innerHTML)
    }
    verificarResposta = true
    guardarOp = op
  }
}

//Chama a função operadores para executar os calculos e trata e exibição no historico.
function exibir() {
  operadores(guardarOp)

  resposta = document.getElementById('historico').innerHTML
  historico = document.getElementById('historico').innerHTML
  historico = historico.substring(0, historico.length -1)
  document.getElementById('historico').innerHTML = historico + "="

  novoCalculo = true
}