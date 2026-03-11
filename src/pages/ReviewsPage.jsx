import { motion } from "framer-motion";
import "../styles/reviews.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useArticles } from "../contexts/ArticlesContext";
import Article from "../components/Article";

const ReviewsPage = () => {
  document.title = "Reviews";

  const reviews = [
    { id: "game", title: "Game" },
    { id: "book", title: "Book" },
  ];

  const [selectedReviews, setSelectedReview] = useState(reviews[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setCurrentPage] = useState(0);
  const [searchParams] = useSearchParams();

  const articlesPerPage = 10;

  const { articles, loading, error, getArticlesByType } = useArticles();
  const currentArticles = getArticlesByType("review", selectedReviews.id);

  useEffect(() => {
    const tag = searchParams.get("tag");
    const reviewParam = searchParams.get("review");

    if (tag) {
      setSearchTerm(tag);
      setCurrentPage(0);
    }

    if (reviewParam) {
      const found = reviews.find((review) => review.id === reviewParam);
      if (found) setSelectedReview(found);
      setCurrentPage(0);
    }

  }, [searchParams.toString()]);

  return (
    <motion.div
      key="reviews-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.5, ease: "anticipate" }}
    >
      <h1 id="title">Reviews</h1>
      <div id="reviews">
        {reviews.map((review) => (
          <a
            key={review.id}
            className={"review " + (selectedReviews.title == review.title ? "selected" : "unselected")}
            onClick={() => {
              setSelectedReview(review);
              setSearchTerm("");
              setCurrentPage(0);
            }}
            role="button"
            tabIndex={0}
          >
            {review.title}
          </a>
        ))}
      </div>

      <div id="reviewArticles">
        <input
          id="searchbar"
          placeholder={"Search " + selectedReviews.title + " reviews..."}
          type="search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(0);
          }}
          aria-label="Search games"
        />

        <div id="reviewArticlesContent">
          {loading && <p>Loading articles...</p>}
          {error && <p className="error">Error: {error}</p>}

          {!loading && !error && (!currentArticles || currentArticles.length === 0) && (
            <p>No articles found for {selectedReviews.title}.</p>
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
          <div id="reviewArticlesPagination">
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

export default ReviewsPage;
