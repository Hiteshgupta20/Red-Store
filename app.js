const express = require("express");
const fs=require("fs");
const path = require("path"); 
const app = express();
const mongoose = require('mongoose');
const bodyparser=require('body-parser');
mongoose.connect('mongodb://localhost/accountInfo', {useNewUrlParser: true});
const port =8000;

//define mongoose schema
const accountSchema = new mongoose.Schema({
    userName: String,
    password: String,
    email: String,
  });
  const Account = mongoose.model('account', accountSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('index.pug', params);
})
app.get('/account', (req, res)=>{ 
    const params = { }
    res.status(200).render('account.pug', params);
})
app.get('/products', (req, res)=>{ 
    const params = { }
    res.status(200).render('products.pug', params);
})
app.get('/product-details', (req, res)=>{ 
    const params = { }
    res.status(200).render('product-details.pug', params);
})
app.get('/cart', (req, res)=>{ 
    const params = { }
    res.status(200).render('cart.pug', params);
})
app.post('/account', (req, res)=>{ 
    var myData= new Account(req.body);
    myData.save().then(()=>{
      res.send("This item has been saved to the database")
        }).catch(()=>{
        res.status(400).send("item was not saved to the database")
        })
    }); 


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});