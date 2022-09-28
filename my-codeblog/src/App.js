import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="App">
      <h1>My Code Blog</h1>
      <div id="page-body">
        <HomePage />
        <AboutPage />
        <ArticleListPage />
        <ArticlePage />
        <NotFoundPage />
      </div>
    </div>
  );
}

export default App;
