//usei o express pra criar e configurar meu servidor
const express = require("express");
const server = express();
const db = require("./db")

//configurar arquivos estáticos(css,scripts,imgs)

server.use(express.static("public"));

//habilitar uso do reqbody
server.use(express.urlencoded({
  extended: true
}))

//configuracao do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
  express: server,
  noCache: true,

})

//criei uma rota '/'
//e capturo o pedido do cliente para responder
server.get("/", function (req, res) {

  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err)
      return res.send("erro no banco de dados!")
    }

    const reversedIdeas = [...rows].reverse()

    let lastIdeas = []
    for (let idea of reversedIdeas) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea)
      }
    }
    //  console.log(lastIdeas.length)
    return res.render("index.html", {
      ideas: lastIdeas
    })
  })

})

server.get("/ideias", function (req, res) {
  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err)
      return res.send("erro no banco de dados!")
    }
    const reversedIdeas = [...rows].reverse()
    return res.render("ideias.html", {
      ideas: reversedIdeas
    })
  })
})

server.post("/", function (req, res) {
  //inserir dado na tabela 
  const query = `
       INSERT INTO ideas(
           image,
           title,
           category,
           description,
           link
       ) VALUES (?,?,?,?,?);
   `
  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link
  ]

  db.run(query, values, function (err) {
    if (err) {
      console.log(err)
      return res.send("erro no banco de dados!")
    }

    return res.redirect("/ideias")
  })
})
//liguei meu servidor na porta 3000
server.listen(3000);