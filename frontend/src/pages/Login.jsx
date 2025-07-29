import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, login } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import "./loader.css"
import TestCredentials from "../components/TestCredentials"
import { RiLoginBoxLine } from "react-icons/ri";
import jobsearch from "../assets/jobsearch.bmp"
const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!role || !email || !password) {
      toast.error("All fields are required!")
      return
    }
    const formData = new FormData();
    formData.append("role", role);
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated]);

  return (
    <>
      <section className="authPage">
        <div className="container login-container">
          <div className="header">
            <h4 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><RiLoginBoxLine />Login here...</h4>
          </div>
          <TestCredentials />
          <form onSubmit={handleLogin}>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select style={{ color: "grey" }} value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Login as an Employer</option>
                  <option value="Job Seeker">Login as a Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email</label>
              <div>
                <input
                  type="email"
                  placeholder="xyz@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? <div style={{ display: "flex", justifyContent: "center" }}><div className="loader"></div></div> : "Login"}

            </button>
            <p style={{ color: "grey", fontStyle: "italic", fontSize: 14 }}>If you don't have an Account then click &nbsp;
              <Link style={{ background: "none", border: "none", fontSize: 14, display: "inline" }} to={"/register"}>Register Now</Link>
            </p>
          </form>
        </div>

        {/* rs */}

        <div style={{
          borderLeft: "2px solid grey", opacity: 0.8, width: "60%",

          background: "linear-gradient(159deg, rgba(8,146,208,1) 0%, rgba(75,0,130,1) 100%)",
          display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <p style={{color:"white",display:"block",padding:2}}>console.log("hi, devs!")</p>&nbsp;
          <img style={{ width: "60%", height: "60%", borderRadius: 210}} src={jobsearch} alt="js" />
        </div>

        {/*  */}
      </section>
    </>
  );
};

export default Login;