import { useState } from "react";

const Sidebar = ({ sidebar = [], activeId, onNavigate }) => {
  if (!sidebar || !sidebar.length) return <div className="sidebar-empty">No table of contents</div>;

  return (
    <nav>
      <div className="sidebar-title">On this page</div>
      <ul className="sidebar-list">
        {sidebar.map((section) => (
          <li key={section.id} className="sidebar-section">
            <a
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(section.id);
              }}
              className={activeId === section.id ? "sidebar-active" : ""}
            >
              {section.title}
            </a>

            {section.subsections && section.subsections.length ? (
              <ul className="sidebar-sublist">
                {section.subsections.map((ss) => (
                  <li key={ss.id}>
                    <a
                      href={`#${ss.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(ss.id);
                      }}
                      className={activeId === ss.id ? "sidebar-active" : ""}
                    >
                      {ss.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
