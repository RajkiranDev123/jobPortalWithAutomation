import { Link } from "react-router-dom";

const Intro = () => {
    return (
        <section className="hero">
            <h1>Find Your Dream Job Today!</h1>
            <h4>
                Connecting Developers to Opportunities — From Junior to Senior, Nationwide
            </h4>
            <div className="box">
                Your next web development opportunity starts here. Discover roles across all levels—from junior developers to senior engineers and tech leads.
                Whether you're just starting out or looking to advance your career, our platform connects you with the right web dev jobs—quickly and effortlessly.
            </div>

            <p style={{color:"white",fontSize:30}}>Are you busy ? <Link style={{color:"white",fontSize:30}} to={"/login"}> Click here to start demo!</Link></p>
        </section>
    );
};

export default Intro;