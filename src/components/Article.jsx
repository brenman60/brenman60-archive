import "../styles/article.css";
import { useNavigate } from "react-router-dom";

const Article = (props) => {
  const navigate = useNavigate();
  const article = props.article ?? props;

  return (
    <div className="article" onClick={() => navigate(`/brenman60-archive/article/${article.slug}`)}>
      {article.type == "game-dev" && 
      <div>
        {article.coverImage && <img className="articleCover" src={article.coverImage} alt="Cover Image"></img>}
        <h1 className="articleTitle">{article.title}</h1>
        <p className="articleSummary">{article.summary}</p>
        <p className="articleDate">{article.date}</p>
      </div>}

      {article.type == "review" &&
      <div>
        {article.coverImage && <img className="articleCover" src={article.coverImage} alt="Cover Image"></img>}
        <h1 className="articleTitle">{article.title}</h1>
        <p className={"articleRating rating-" + article.rating}>{article.rating + "%"}</p>
        <p className="articleDate">{article.date}</p>
      </div>}
    </div>
  );
};

export default Article;
