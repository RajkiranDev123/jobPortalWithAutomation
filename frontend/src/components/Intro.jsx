import { Link } from "react-router-dom";

import BarGraph from "./BarGraph";
import { useSelector } from "react-redux";
import "../pages/loader2.css"
import ParseResume from "../pages/ParseResume";
const Intro = () => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const { monthlyPostedJobs } = useSelector((state) => state.meta);




    return (
        <section className="hero">
            <h1 style={{ color: "#321414" }}>Find Your Dream Job Today!</h1>
            <h4>
                Connecting Developers to Opportunities — From Junior to Senior, Nationwide
            </h4>
            <div style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }} className="box">
                Your next web development opportunity starts here. Discover roles across all levels—from junior developers to senior engineers and tech leads.
                Whether you're just starting out or looking to advance your career, our platform connects you with the right web dev jobs—quickly and effortlessly.
            </div>


            <div>
                <p style={{ color: "#0E3386", fontWeight: "bold" }}>Our Montly Jobs Added Counts :</p>

                {monthlyPostedJobs?.length > 0 ? <BarGraph /> : <div style={{ display: "flex", justifyContent: "center" }}><div className="loader"></div></div>}
            </div>

            {!isAuthenticated && <p style={{ color: "white", fontSize: 30 }}>Are you busy ? <Link style={{ color: "white", fontSize: 30 }} to={"/login"}> Click here to start demo!</Link></p>}




            <div>
 
                <ParseResume/>
            </div>

        </section>
    );
};

export default Intro;