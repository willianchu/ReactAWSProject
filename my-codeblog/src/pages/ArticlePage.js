import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import articles from './article-content';


const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  const { articleId } = useParams();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };
    
    loadArticleInfo();
  }, []);

  const article = articles.find(article=>article.name === articleId);

  const addUpvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvote`);
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };


  if(!article) {
    return <NotFoundPage />
  }
  console.log(articleInfo.comments);
  return(
    <>
    <h1>{article.title}</h1>
    <div className="upvotes-section">
      <button onClick={addUpvote}>Like!</button>
      <p> This is a test {articleInfo.upvotes} upvote(s) </p>
    </div>
    {article.content.map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ))}
    <AddCommentForm 
      articleName={articleId} 
      onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
    <CommentsList comments={articleInfo.comments} />
    </>
  );
}

export default ArticlePage;