const express = require('express');
const cors = require("cors")

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const parcels = [
    {
       id: 1,
       product: "Phone",
       description: "An Apple iPhone",
       deliveryDate: new Date(),
   },
    {
       id: 2,
       product: "Laptop",
       description: "A MacBook Air",
       deliveryDate: new Date(),
   },
    {
       id: 3,
       product: "Bag",
       description: "A Birkin Bag",
       deliveryDate: new Date(),
   }
   
   ]

app.get('/parcels', (req, res) => {
    res.json({
        data: parcels 
    })
})

app.get('/parcels/:id', (req, res) => {
    const { id } = req.params;
    console.log('Id ', id)
    let found = parcels.find((parcel) => parcel.id === parseInt(id) )
    if (found){
        res.status(200).json({data: found})
    }
    else{
        res.sendStatus(404)
    }
});

app.post('/parcels', (req, res) => {
    const parcel = req.body;
    try{
        
        parcels.push(parcel);
        res.status(201).json({data: parcel})
    }
    catch(err){
        res.status(400).json({
            err
        })
    }
})

app.put('/parcels/:parcelId/edit', (req, res) => {
  let found = parcels.find((parcel) => {
    return parcel.id === parseInt(req.params.parcelId)
  });

  if (found){
    let updated = {
        id: found.id,
        product: req.body.product,
        description: req.body.description,
        deliveryDate: new Date()
    };

    let targetIndex = parcels.indexOf(found);

    parcels.splice(targetIndex, 1, updated);
    res.sendStatus(204)
  }
  else {
    res.sendStatus(400);
  }
})


app.listen(PORT, () => {
    console.log(`connected to PORT ${PORT}`);
});