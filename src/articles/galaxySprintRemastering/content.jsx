import { useState, useEffect } from "react";

import RowText from '../../components/articleComponents/RowText';
import RowTextImage from '../../components/articleComponents/RowTextImage';
import RowTextImages from '../../components/articleComponents/RowTextImages';
import RowImages from '../../components/articleComponents/RowImages';
import RowSeparator from "../../components/articleComponents/RowSeparator";

const BASE_URL = import.meta.env.BASE_URL;
const ARTICLES_URL = `${BASE_URL}articles/galaxySprintRemastering/images`;

export default function Article() {
  const [headerImageIndex, setHeaderImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderImageIndex((headerImageIndex) => (headerImageIndex + 1) % headerImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);
  
  const headerImages = [
    { src: `${ARTICLES_URL}/brennansMiniGame/5.png`, alt: "Screenshot of Brennan's Mini Game" }
  ];

  return (
    <>
      {headerImages.length > 0 && <div id="header-images">
        {headerImages.map((image) => (
          <img key={image} className={headerImageIndex == headerImages.indexOf(image) ? "active" : ""} src={image.src} alt={image.alt} />
        ))}
      </div>}
      <h1 id="title">Remastering Galaxy Sprint</h1>
      <main>
        <RowSeparator spacing={"50px"} />
        <p className="sectionHeading">Introduction</p>
        <RowText>
          <p>
            
          </p>
        </RowText>
      </main>
    </>
  );
}
