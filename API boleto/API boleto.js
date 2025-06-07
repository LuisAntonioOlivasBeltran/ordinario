const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
    console.log('servidor web iniciado')
})

app.get('/boleto/:cantidad/:dia/:seccion',(req,res)=>{
    const {cantidad,dia,seccion} = req.params;
    if (dia <1 || dia > 3){
        res.sendStatus(400);
    }

    if (seccion <1 || dia > 4){
        res.sendStatus(400);
    }

    if (cantidad<1){
        res.sendStatus(400);
    }

    let precioboleto,descuentodia=0,descuentocantidad=0;
    switch(seccion){
        case '1':
            if (dia==3){
                descuentodia=300*0.16;
                precioboleto=300-descuentodia;
            }else{
                precioboleto = 300;
            }
            break;
        case '2':
            if (dia==3){
                descuentodia=490*0.16;
                precioboleto=490-descuentodia;
            }else{
                precioboleto = 490;
            }
            break;
        case '3':    
        if (dia==3){
                descuentodia=670*0.16;
                precioboleto=670-descuentodia;
            }else{
                precioboleto = 670;
            }
            break;
        case '4':    
        if (dia==3){
                descuentodia=899*0.16;
                precioboleto=899-descuentodia;
            }else{
                precioboleto = 899;
            }
            break;
    }

    preciototal = precioboleto * cantidad;

    if (cantidad > 1){
        descuentocantidad = preciototal *0.05;
    }
    preciototal= preciototal-descuentocantidad;

    const data = {
        cantidad,
        dia,
        seccion,
        descuentocantidad,
        descuentodia,
        precioboleto,
        preciototal
    };
    res.send(data);

})