import { createContext, useContext, useEffect, useRef, useState } from "react";

const ArticlesContext = createContext(null);

export function ArticlesProvider({ children, initialSlugs = null }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    loadArticles(initialSlugs).catch((err) => {
      setError(err);
    });
  }, []);

  async function loadArticles(slugsOverride = null) {
    setLoading(true);
    setError(null);
    try {
      let slugs = slugsOverride;
      if (!slugs) {
        const res = await fetch(`${import.meta.env.BASE_URL}articles/index.json`, { cache: "no-cache" });
        if (!res.ok) throw new Error("Could not load articles index");
        slugs = await res.json();
      }

      const fetches = slugs.map(async (slug) => {
        try {
          const r = await fetch(`${import.meta.env.BASE_URL}articles/${slug}/data.json`, { cache: "no-cache" });
          if (!r.ok) throw new Error(`Failed to fetch data for ${slug}`);
          const data = await r.json();
          return { slug, data };
        } catch (e) {
          console.error(e);
          return null;
        }
      });

      const results = await Promise.all(fetches);
      const items = results.filter(Boolean).map((item) => ({
        slug: item.slug,
        ...item.data,
      }));
      setArticles(items);
      setLoading(false);
      return items;
    } catch (e) {
      setError(e);
      setLoading(false);
      throw e;
    }
  }

  function getArticlesByType(type, subType) {
    if (!type || !subType) return articles;
    return articles.filter((a) => a.type === type && a.subType == subType);
  }

  function getAllArticles(start, end) {
    return articles.slice(start, end);
  }

  const value = {
    articles,
    loading,
    error,
    refresh: () => loadArticles(initialSlugs),
    getArticlesByType,
    getAllArticles,
    loadArticles,
  };

  return <ArticlesContext.Provider value={value}>{children}</ArticlesContext.Provider>;
}

export function useArticles() {
  const ctx = useContext(ArticlesContext);
  if (!ctx) throw new Error("useArticles must be used within ArticlesProvider");
  return ctx;
}

export default ArticlesProvider;
