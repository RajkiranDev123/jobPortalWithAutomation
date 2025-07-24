import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import appLogo from "../assets/jobdev.png"
import { FcHome } from "react-icons/fc";
import { RxDashboard } from "react-icons/rx";
import { FcSearch } from "react-icons/fc";
import { RiLoginCircleFill } from "react-icons/ri";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <nav className={show ? "navbar show_navbar" : "navbar"}>
        <div style={{ display: "flex", alignItems: "center" }}>

          <div style={{ background: "white", width: 38, height: 38, borderRadius: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img style={{ width: 18, height: 18 }} src={appLogo} alt="appLogo" />

          </div>
          <p style={{ fontFamily: "monospace", color: "white" }}>Jobs4orDevs</p>


        </div>
        <div className="links">
          <ul>
            <li>
              <Link style={{
                display: "flex", alignItems: "center",
                background: "linear-gradient(159deg, rgba(8, 146, 208, 1) 0%, rgba(75, 0, 130, 1) 100%)",
                padding: 3, borderRadius: 3
              }} to={"/"} onClick={() => setShow(!show)}>
                <FcHome />Home
              </Link>
            </li>
            <li>
              <Link style={{
                display: "flex", alignItems: "center",
                background: "linear-gradient(159deg, rgba(8, 146, 208, 1) 0%, rgba(75, 0, 130, 1) 100%)",
                padding: 3, borderRadius: 3
              }} to={"/jobs"} onClick={() => setShow(!show)}>
                <FcSearch />Jobs
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link style={{
                  display: "flex", alignItems: "center",
                  background: "linear-gradient(159deg, rgba(8, 146, 208, 1) 0%, rgba(75, 0, 130, 1) 100%)",
                  padding: 3, borderRadius: 3
                }} to={"/dashboard"} onClick={() => setShow(!show)}>
                  <RxDashboard /> Dashboard
                </Link>
              </li>
            ) : (
              <li>
                <Link style={{
                  display: "flex", alignItems: "center",
                  background: "linear-gradient(159deg, rgba(8, 146, 208, 1) 0%, rgba(75, 0, 130, 1) 100%)",
                  padding: 3, borderRadius: 3
                }} to={"/login"} onClick={() => setShow(!show)}>
                  <RiLoginCircleFill /> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </nav>
    </>
  );
};

export default Navbar;