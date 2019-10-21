const express = require('express')

const app = express()

const met = require('./met.js')

const port = process.env.PORT || 3000

const matricula = 'A01281919'
const name = 'Monica Daniela Garcia Aguilar'

app.get('/', function(req, res) {
  res.send('<h1>Bienvenido, modifica tu ruta con /students/ o /met?search= para comenzar </h1>')
})

app.get('/students/:id', function(req, res) {
  if (req.params.id === matricula) {
    res.send({
      id: req.params.id,
      fullname: name,
      nickname: 'Dany',
      age: '21'
    })
  } else {
    res.send({
      error: 'Matricula incorrecta'
    })
  }

})


app.get('/met', function(req, res) {

  //return res.send(req.query.search)
  if ( !req.query.search ) {
    res.send({
      error: 'Debes enviar el nombre de un objeto'
    })
  } else {
      met.obtenerObjeto(req.query.search, function(error, response) {
        if (response) {
          let objeto = response[0]
          // res.send({
          //   objeto: objeto
          // })

          met.obtenerInfo(objeto, req.query.search, function(error, response) {
            if (response) {
              res.send(response)
            } else {
              res.send({
                error: error
              })
            }
          })


          // res.send(response)
        } else {
          res.send({
            error: error
          })
        }

      })



  }
})




app.get('*', function(req, res) {
  res.send({
    error: 'Ruta no valida. Intenta con /students/ o /met?search='
  })
})


app.listen(port, function() {
  console.log('Up and running!')
})
