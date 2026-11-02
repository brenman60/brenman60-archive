import { useState, useEffect } from "react";

import RowText from '../../components/articleComponents/RowText';
import RowTextImage from '../../components/articleComponents/RowTextImage';
import RowTextImages from '../../components/articleComponents/RowTextImages';
import RowImages from '../../components/articleComponents/RowImages';
import RowSeparator from "../../components/articleComponents/RowSeparator";

const BASE_URL = import.meta.env.BASE_URL;
const ARTICLES_URL = `${BASE_URL}articles/tankStrikeDevLog1/images`;

export default function Article() {
  const [headerImageIndex, setHeaderImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderImageIndex((headerImageIndex) => (headerImageIndex + 1) % headerImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);
  
  const headerImages = [
    { src: `${ARTICLES_URL}/1.png`, alt: "alt text type temp" }
  ];

  return (
    <>
      {headerImages.length > 0 && <div id="header-images">
        {headerImages.map((image) => (
          <img key={image} className={headerImageIndex == headerImages.indexOf(image) ? "active" : ""} src={image.src} alt={image.alt} />
        ))}
      </div>}
      <h1 id="title">Dev Log 1</h1>
      <main>
        <RowSeparator spacing={"50px"} />
        <p className="sectionHeading">Overview</p>
        <RowText>
          <p>
            Recently development of Tank Strike has been speeding up quite a bit and I felt like doing some sort of dev log to show and talk about some of the progress I've been making.
            I've never done any dev logs before, so I'm not sure of the formatting or how to go about it or anything.
          </p>

          <p>
            Getting into the new changes, the past month I've been primarily working on optimizations, fixes, and preparations for the next few features I'm planning.
            
          </p>
        </RowText>
      </main>
    </>
  );
}
