const express = require('express');
const router = require('./routes/authRoutes');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
app.use('/api/v1/',router);
const PORT = 1327;
app.listen(PORT, ()=>{
  console.log('app is listening at port:', PORT);
})