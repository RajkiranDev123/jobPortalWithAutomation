
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {

  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";
import { FcHome } from "react-icons/fc";
import { CgWorkAlt } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { FaHandsHelping } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { GiGiftOfKnowledge } from "react-icons/gi";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <footer style={{padding:10,   boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"}} >
        <div style={{visibility:"hidden"}}>
        
        </div>
        <div>
          <h4 style={{display:"flex",alignItems:"center"}}><FaHandsHelping/>Support</h4>
          <ul>
            <li><IoLocationOutline/>Bengaluru, India</li>
            <li><MdOutlineMailOutline/> rajtech645@gmail.com</li>
            <li><CiPhone/>+91 8293620595</li>
          </ul>
        </div>

        <div>
          <h4 style={{display:"flex",alignItems:"center",gap:1}}><FaExternalLinkAlt/>Quick Links</h4>
          <ul>
            <li >
              <Link to={"/"}><FcHome/>Home</Link>
            </li>
            <li >
              <Link to={"/jobs"}><CgWorkAlt/>Jobs</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to={"/dashboard"}><RxDashboard/>Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h4 style={{display:"flex",alignItems:"center",gap:1}}><GiGiftOfKnowledge/>Know Us</h4>
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