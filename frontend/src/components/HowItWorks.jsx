
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";



const HowItWorks = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate()
  return (
    <section className="howItWorks">
      <h3>How to Start?</h3>

      <div className="container">

        {!isAuthenticated && <div onClick={() => navigate("/register")} style={{ cursor: "pointer" }} className="card">
          <div className="icon">
            <LuUserPlus />
          </div>
          <h4>Create an Account</h4>
          <p>
            Sign up for a free account as a job seeker or employer. Set up your
            profile in minutes to start posting jobs or applying for jobs.

          </p>
        </div>}

        <div onClick={() => navigate("/jobs")} style={{ cursor: "pointer" }} className="card">
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


    </section>
  );
};

export default HowItWorks;