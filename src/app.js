const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

/**** Item 2

Criar a string de conexão com o mongo, lembre-se que o nome do banco será :
cursos. Lembre-se de criar a conexão e validar se realmente o banco está logado
exibindo uma mensagem de suceso no console.

*/

mongoose.connect("mongodb+srv://wpss:m0ng0wpss@cluster0.iq4a8.mongodb.net/cursos?retryWrites=true&w=majority", {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

let db = mongoose.connection;

db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function (){
  console.log("conexão feita com sucesso.")
})

/******/

//rotas
const cursos = require("./routes/cursosRoute")

//configurar body parser
app.use(bodyParser.json());
// app.use(express.json()); - Podemos usar a propria função de parser de json do express, sem a necessidade de instalar o body parser 

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
  })

app.use("/cursos", cursos)

module.exports = app
