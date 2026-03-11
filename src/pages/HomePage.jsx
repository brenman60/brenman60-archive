import { motion } from "framer-motion";
import { useArticles } from "../contexts/ArticlesContext";
import Article from "../components/Article";
import { useState } from "react";
import "../styles/home.css";

const HomePage = () => {
  document.title = "Home";

  const articlesPerPage = 10;
  
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setCurrentPage] = useState(0);

  const { loading, error, getAllArticles } = useArticles();
  const currentArticles = getAllArticles(page * articlesPerPage, (page + 1) * articlesPerPage);

  return (
    <motion.div
      key="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.5, ease: "anticipate" }}
    >
      <h3 id="description">I will primarily write about anything I'm doing currently, mainly game development as well as games I've played and possibly books I've read recently.</h3>
      <p id="recentArticlesTitle">Recent Articles</p>
      <div id="recentArticles">
        <input
          id="searchbar"
          placeholder={"Search articles..."}
          type="search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(0);
          }}
          aria-label="Search articles"
        />

        <div id="recentArticlesContent">
          {loading && <p>Loading articles...</p>}
          {error && <p className="error">Error: {error}</p>}

          {!loading && !error && (!currentArticles || currentArticles.length === 0) && (
            <p>No articles found.</p>
          )}

          {!loading &&
            !error &&
            currentArticles &&
            currentArticles.slice(page * articlesPerPage).filter((article) => {
                if (!searchTerm) return true;
                const term = searchTerm.toLowerCase();
                const inTitle = article.title?.toLowerCase().includes(term);
                const inSummary = article.summary?.toLowerCase().includes(term);
                const inTags = (article.tags || []).join(" ").toLowerCase().includes(term);
                return inTitle || inSummary || inTags;
              })
              .sort((a, b) => {
                const dateA = new Date(a.formattedDate);
                const dateB = new Date(b.formattedDate);
                return dateB - dateA;
              })
              .map((article) => (
                <Article key={article.slug} article={article} />
              ))}
        </div>

        {!loading && !error && (currentArticles && currentArticles.length !== 0) && (
          <div id="recentArticlesPagination">
            <button className="pageButton" onClick={() => setCurrentPage(page != 0 ? page - 1 : 0)}>
              {"<"}
            </button>
            <span>Page:</span>
            <input
              id="pageInput"
              placeholder={page >= 0 ? page + 1 : 1}
              type="number"
              onChange={(e) => {
                setCurrentPage(parseInt(e.target.value) - 1);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setCurrentPage(parseInt(e.target.value) - 1);
                  e.target.value = "";
                }
              }}
              onBlur={(e) => e.target.value = ""}
              aria-label="Change page"
            />
            <button className="pageButton" onClick={() => setCurrentPage(page != currentArticles.length - 1 ? page + 1 : page)}>
              {">"}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HomePage;
