
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";
import { useSelector } from "react-redux";

import { FcHome } from "react-icons/fc";
import { RxDashboard } from "react-icons/rx";
import { FcSearch } from "react-icons/fc";
import { RiLoginCircleFill } from "react-icons/ri";

import { Link } from "react-router-dom"

const HowItWorks = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <section className="howItWorks">
      <h3>How to Start?</h3>

      <div className="container">

        <div className="card">
          <div className="icon">
            <LuUserPlus />
          </div>
          <h4>Create an Account</h4>
          <p>
            Sign up for a free account as a job seeker or employer. Set up your
            profile in minutes to start posting jobs or applying for jobs.
            Customize your profile to highlight your skills or requirements.
          </p>
        </div>

        <div className="card">
          <div className="icon">
            <VscTasklist />
          </div>
          <h4>Post or Browse Jobs</h4>
          <p>
            Employers can post detailed job descriptions, and job seekers can
            browse a comprehensive list of available positions. Utilize filters
            to find jobs that match your skills and preferences.
          </p>
        </div>

        <div className="card">
          <div className="icon">
            <BiSolidLike />
          </div>
          <h4>Hire or Get Hired</h4>
          <p>
            Employers can shortlist candidates and extend job offers. Job
            seekers can review job offers and accept positions that align with
            their career goals.
          </p>
        </div>

      </div>
      {/* container */}


      {/*  */}
      <div className="navbar" style={{ background: "none" }}>
        <div className="links">
          <ul>

            <li>
              <Link style={{
                display: "flex", alignItems: "center",
                background: "linear-gradient(159deg, rgba(8, 146, 208, 1) 0%, rgba(75, 0, 130, 1) 100%)",
                padding: 3, borderRadius: 3
              }} to={"/jobs"} onClick={() => setShow(!show)}>
                Click here to see Jobs
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;