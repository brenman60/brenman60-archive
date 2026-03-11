import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../styles/articlePage.css";
import Sidebar from "../components/Sidebar";

const articleComponentLoaders = import.meta.glob("../articles/*/content.jsx");

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

const ArticlePage = () => {
  const { id } = useParams();
  const [articleData, setArticleData] = useState({});
  const [ArticleComponent, setArticleComponent] = useState(null);
  const [sidebarContent, setSidebarContent] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}articles/${id}/data.json`)
      .then((response) => response.json())
      .then((jsonData) => setArticleData(jsonData))
      .catch((error) => console.error("Error loading JSON: ", error));

    setArticleComponent(null);

    let cancelled = false;

    const loadContent = async () => {
      try {
        const matchKey = Object.keys(articleComponentLoaders).find((k) =>
          k.endsWith(`/${id}/content.jsx`) || k.includes(`/${id}/content.jsx`)
        );

        if (matchKey) {
          const mod = await articleComponentLoaders[matchKey]();
          if (!cancelled) {
            setArticleComponent(() => (mod && (mod.default || mod)));
            return;
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadContent();

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (articleData && articleData.title) document.title = articleData.title;
  }, [articleData]);

  useEffect(() => {
    if (!ArticleComponent || !contentRef.current) return;

    requestAnimationFrame(() => {
      const container = contentRef.current;
      const nodes = container.querySelectorAll(".sectionHeading, .subsectionHeading, #title");
      const newToc = [];
      const idCounts = {};
      let lastSection = null;

      nodes.forEach((node) => {
        const text = node.textContent.trim();
        let baseId = node.id ? node.id : slugify(text || "section");
        if (idCounts[baseId]) {
          idCounts[baseId] += 1;
          baseId = `${baseId}-${idCounts[baseId]}`;
        } else {
          idCounts[baseId] = 1;
        }
        node.id = baseId;

        if (node.id === "title" || node.classList.contains("sectionHeading")) {
          const section = { id: baseId, title: text, subsections: [] };
          newToc.push(section);
          lastSection = section;
        } else if (node.classList.contains("subsectionHeading")) {
          if (!lastSection) {
            const section = { id: "start", title: "Start", subsections: [] };
            newToc.push(section);
            lastSection = section;
          }
          lastSection.subsections.push({ id: baseId, title: text });
        }
      });

      setSidebarContent(newToc);
    });
  }, [ArticleComponent]);

  useEffect(() => {
    if (!contentRef.current) return;
    const headings = contentRef.current.querySelectorAll(".sectionHeading, .subsectionHeading, #title");
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        entries.forEach((entry) => {
          if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
        });
        if (best && best.target && best.target.id) setActiveId(best.target.id);
      },
      { root: null, rootMargin: "0px 0px -60% 0px", threshold: [0, 0.1, 0.25, 0.5, 1] }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [sidebarContent, ArticleComponent]);

  const navigateTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div
      key="article-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.5, ease: "anticipate" }}
    >
      <div className={"article-layout showSidebar-" + articleData.showSidebar}>
        {articleData.showSidebar !== false && <aside className="article-sidebar" aria-label="Article Table of Contents">
          <Sidebar sidebar={sidebarContent} activeId={activeId} onNavigate={navigateTo} />
        </aside>}

        <div ref={contentRef} id="content" className="markdown-body">
          {ArticleComponent ? <ArticleComponent /> : <></>}
        </div>
      </div>
    </motion.div>
  );
};

export default ArticlePage;
