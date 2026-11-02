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
    { src: `${ARTICLES_URL}/brennansMiniGame/5.png`, alt: "Screenshot of Brennan's Mini Game" }
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
        <p className="sectionHeading">The Issue</p>
        <RowText>
          <p>
            So recently I've been thinking about strategies for splitting up levels in Tank Strike into areas, which would allow for easier scaling in each level.
            Previously, there were "areas" which were basically just objectives that players would have to complete to beat a level. It sounds pretty straightforward at first,
            but it got kind of complicated when I started thinking about how I had partly programmed enemies AI to attack any objectives in the entire level.
          </p>
        </RowText>
      </main>
    </>
  );
}
