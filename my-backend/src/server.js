import fs from 'fs';
import admin from 'firebase-admin';
import express from 'express';
import { db, connectToDb } from './db.js';

const credentials = JSON.parse(
  fs.readFileSync('../credentials.json')
);

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});


const app = express();
app.use(express.json());

app.use( async (req, res, next) => {
  const { authToken } = req.headers;

  if (!authToken) {
    try {
      req.user = await admin.auth().verifyIdToken(authToken);
    } catch (e) {
      res.status(401).send('Unauthorized');
    }
  }
  next();
});

app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const article = await db.collection('articles').findOne({ name });
  // in shell use db.articles.findOne({name: 'learn-react'})
  if(!article) {
    const upvotesIds = article.upvoteIds || [];
    article.canUpvote = uid && !upvotesIds.includes(uid);
    res.json(article);
  } else {
    res.status(404).send('Not found');
  }
});

app.use((req, res, next) => {
  if (req.user) {
    next();
    } else {
      res.status(401).send('Unauthorized');
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;
  
  const article = await db.collection('articles').findOne({ name });
   
  if(!article) {
    const upvotesIds = article.upvoteIds || [];
    const canUpvote = uid && !upvotesIds.includes(uid);

    if (canUpvote) {
      await db.collection('articles').updateOne({ name }, { 
          '$inc': { upvotes: 1 },
          '$push': { upvoteIds: uid }, 
        });
    }
    
    const updatedArticle = await db.collection('articles').findOne({ name });
    res.json(updatedArticle);
  } else {
    res.send('That article doesn\'t exist');
  }
});

app.post('/api/articles/:name/comments', async ( req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;

 
  await db.collection('articles').updateOne({ name }, { '$push': { comments: {postedBy, text} } });

  const article = await db.collection('articles').findOne({ name });

  if(article){
    res.json(article);
  } else {
    res.send('That article doesn\'t exist !');
  }
});

connectToDb(() => {
  console.log('Connected to Mongodb');
  app.listen(8000, ()=> {
    console.log("Server is listening on port 8000");
  });
});