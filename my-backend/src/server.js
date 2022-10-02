import express from 'express';

const app = express();
app.use(express.json());

app.post('/hello', (req, res)=>{
  console.log(req.body);
  const user = req.body;
  res.send(`Hello! ${user.name}`);
});

app.get('/hello/:name', (req, res) => {
  const { name } = req.params;
  res.send(`Hello ${name}!!`);
});


app.listen(8000, ()=> {
  console.log("Server is listening on port 8000");
})