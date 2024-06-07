import { FaGithubSquare } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <span>© 2024 StayHuBnb, Inc.</span>
        <span>·</span>
        <span>Terms</span>
        <span>|</span>
        <span>Sitemap</span>
        <span>|</span>
        <span>Privacy</span>
        <span>|</span>
        <span>Your Privacy Choices</span>
      </div>
      <div className="footer-right">
        <a href="https://github.com/jsingh0507/StayHuBnb" target="_blank" rel="noopener noreferrer">
          <FaGithubSquare className="github-icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
