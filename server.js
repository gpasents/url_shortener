require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const parser = require('body-parser');
const dns = require('dns');
const URL = require('url').URL

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(parser());
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let array = [];

app.post("/api/shorturl",(req,res)=>{
  let url = req.body.url;
  let urlObj = new URL(url);
  if (array.includes(url)){
    res.json("Url already included at index "+ array.indexOf(url));
  }else if (url.includes("ftp")){
    res.json({error: 'invalid url'});
  }
  else{
    array.push(url);
    console.log(array);
      res.json({"original_url":url,"short_url":array.indexOf(url)});
  }
});

app.get("/api/shorturl/:index",(req,res)=>{
  let i = req.params.index;
  if(array[i]){
    res.redirect(array[i]);
  }
  res.json({"error":"url not in memory"});
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
