import articles from './article-content';

const ArticleListPage = () => {
  return(
    <>
      <h1> Articles </h1>
      {articles.map(article => 
        <div>
          <h3>{article.title}</h3>
          <p>{article.content[0].substring(0, 150)}...</p>  
        </div>
        )}
    </>
  );
}

export default ArticleListPage;