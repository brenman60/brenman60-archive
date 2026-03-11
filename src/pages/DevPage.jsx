import { motion } from "framer-motion";
import "../styles/gameDev.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useArticles } from "../contexts/ArticlesContext";
import Article from "../components/Article";

const DevPage = () => {
  document.title = "Development";

  const games = [
    { id: "general", title: "General" },
    { id: "galaxy-sprint", title: "Galaxy Sprint" },
    { id: "darkening", title: "Darkening" },
    { id: "forlorn", title: "Forlorn" },
    { id: "tank-strike", title: "Tank Strike" },
  ];

  const [selectedGame, setSelectedGame] = useState(games[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setCurrentPage] = useState(0);
  const [searchParams] = useSearchParams();

  const articlesPerPage = 10;

  const { articles, loading, error, getArticlesByType } = useArticles();
  const currentArticles = getArticlesByType("game-dev", selectedGame.id);

  useEffect(() => {
    const tag = searchParams.get("tag");
    const gameParam = searchParams.get("game");

    if (tag) {
      setSearchTerm(tag);
      setCurrentPage(0);
    }

    if (gameParam) {
      const found = games.find((game) => game.id === gameParam);
      if (found) setSelectedGame(found);
      setCurrentPage(0);
    }

  }, [searchParams.toString()]);

  return (
    <motion.div
      key="dev-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.5, ease: "anticipate" }}
    >
      <h1 id="title">Development</h1>
      <div id="games">
        {games.map((game) => (
          <a
            key={game.id}
            className={"game " + (selectedGame.title == game.title ? "selected" : "unselected")}
            onClick={() => {
              setSelectedGame(game);
              setSearchTerm("");
              setCurrentPage(0);
            }}
            role="button"
            tabIndex={0}
          >
            {game.title}
          </a>
        ))}
      </div>

      <div id="gameArticles">
        <input
          id="searchbar"
          placeholder={"Search " + selectedGame.title + " dev logs..."}
          type="search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(0);
          }}
          aria-label="Search games"
        />

        <div id="gameArticlesContent">
          {loading && <p>Loading articles...</p>}
          {error && <p className="error">Error: {error}</p>}

          {!loading && !error && (!currentArticles || currentArticles.length === 0) && (
            <p>No articles found for {selectedGame.title}.</p>
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
          <div id="gameArticlesPagination">
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

export default DevPage;
