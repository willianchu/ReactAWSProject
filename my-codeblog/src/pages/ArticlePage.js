import { useParams } from 'react-router-dom'

const ArticlePage = () => {
  const { articleId }  = useParams();
  
  return(
    <h1> Single Article PAGE ID: {articleId}</h1>
  );
}

export default ArticlePage;