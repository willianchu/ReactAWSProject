# ReactAWSProject

This project creates my personal blog that it will based in AWS platform

* node v17.9.1

* npm install react-router-dom

<BrowserRouter>
  <Routes>
    <Route path="" element{<page>}>
    </Route>
  <Routes>
</BrowserRouter>

NavBar.js - (Link)react-router-dom

ArticlePage.js - (useParams)react-router-dom


Back-end Node V17.9.1

npm init -y
npm install express
in package.json
add "type":"module",

npm install nodemon --save-dev
npx nodemon src/server.js (development)

create a script in package.json
"dev": "npx nodemon src/server.js",

npm run dev (shortcut)

Mongo DB Version 3.6.3
start
sudo start mongodb 
or
sudo service mongodb start

mongo (use react-blog-db)
db.articles.insertMany( JSON.parse(articles) )

to check
db.articles.find({upvotes: 0}).pretty()

npm install mongodb


AXIOS Front-end

npm install axios

Fix CORS Error
package.json "proxy": "http://localhost:8000",



