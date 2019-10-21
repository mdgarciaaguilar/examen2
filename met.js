const request = require('request')

// https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers

const obtenerObjeto = function(objeto, callback) {
  const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + objeto


  request({ url, json: true }, function(error, response) {
    if (response) {
      if (response.body.total === 0) {
        callback('No se encontro ningun objeto', undefined)
      } else {
        callback(undefined, response.body.objectIDs)
      }
    } else {
      callback('No se pudo conectar con met', undefined)
    }


  })
}


const obtenerInfo = function(id, search, callback) {
  const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id

  request({ url, json: true }, function(error, response) {
    if (response) {
      callback(undefined, {
        searchTerm : search,
        artist : response.body.constituents[0].name,
        title: response.body.title,
        year: response.body.objectEndDate,
        technique: response.body.medium,
        metUrl: response.body.objectURL
      })
    } else {
      callback('No se pudo conectar con met', undefined)
    }
  })


  // artist : constituents[0].name,
  // title: title,
  // year: objectEndDate,
  // technique: medium,
  // metUrl: objectURL
}


module.exports = {
  obtenerObjeto : obtenerObjeto,
  obtenerInfo: obtenerInfo
}
