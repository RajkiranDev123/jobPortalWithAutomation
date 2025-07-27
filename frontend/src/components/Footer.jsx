import appLogo from "../assets/jobdev.png"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <footer >
        <div style={{visibility:"hidden"}}>
        
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>Bengaluru, India</li>
            <li>rajtech645@gmail.com</li>
            <li>+91 8293620595</li>
          </ul>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li >
              <Link to={"/"}>Home</Link>
            </li>
            <li >
              <Link to={"/jobs"}>Jobs</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <ul>
           
      
            <li>
              <Link to={"/"}>
                <span>
                  <FaYoutube />
                </span>
                <span>Youtube</span>
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <span>
                  <FaLinkedin />
                </span>
                <span>LinkedIn</span>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      <div className="copyright">
        &copy; CopyRight 2024. All Rights Reserved By Rajkiran Upadhyay
      </div>
    </>
  );
};

export default Footer;