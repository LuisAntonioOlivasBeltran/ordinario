const express = require('express')
const bodyParser = require('body-parser')
const monedas = require('./monedas') 
const { Op } = require('sequelize') 

const app = express()
const puerto = 3000

app.use(bodyParser.json())

app.listen(puerto, () => {
    console.log('servidor iniciado')
})

app.post('/convertir/', async (req, res) => {
    const { origen, destino, cantidad } = req.body;
    let resultado = 0;
    
    const data = await monedas.findOne({
        where: {
            [Op.and]: [{ origen }, { destino }],
        }
    });
    if (!data) {
        res.sendStatus(404);
    }
    const { valor } = data;
    resultado = cantidad * valor;

    res.send({
        origen,
        destino,
        cantidad,
        resultado
    })

})

app.post('/agregar/', async (req, res) => {
    const { origen, destino, valor } = req.body;
    
    const data = await monedas.create({
        origen,
        destino,
        valor
    });
    res.send(data)
})

app.put('/actualizar/:id', async (req, res) => {
    const { id } = req.params; 
    
   
    const data = await monedas.findOne({
      where: { id }
    });
  
    if (!data) {
      return res.sendStatus(404); 
    } else {
      const { origen, destino, valor } = req.body;
      
      await monedas.update(
        { origen, destino, valor },
        { where: { id } }
      );
     
      const nuevoValor = await monedas.findOne({
        where: { id }
      });
      
      res.json(nuevoValor);
    }
  });
  

app.get('/monedas/', async (req, res) => {
    const data = await monedas.findAll();
    res.send(data)

})