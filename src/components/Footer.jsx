import "../styles/footer.css";
import githubIcon from "../assets/icons/github.png";

const Footer = () => {
  return (
    <div id="footer">
      <div id="footerIcons">
        <img className="footerIcon" onClick={() => window.open("https://github.com/brenman60/brenman60-archive")} src={githubIcon} alt="GitHub" />
      </div>
    </div>
  );
};

export default Footer;
