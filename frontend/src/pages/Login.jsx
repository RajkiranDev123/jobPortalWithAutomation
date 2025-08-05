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
            <h4 style={{ display: "flex", alignItems: "center", justifyContent: "center",color:"grey",fontSize:30 }}><RiLoginBoxLine />Login here...</h4>
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




            <button style={{ margin: 3,background:"blue",cursor:"pointer" }} type="submit" disabled={loading}>
              {loading ? <div style={{ display: "flex", justifyContent: "center" }}><div className="loader"></div></div> : "Login"}

            </button>
            <p style={{ color: "grey", fontStyle: "italic", fontSize: 14 }}>If you don't have an Account then click &nbsp;
              <Link style={{ margin: 0, background: "none", border: "none", fontSize: 14, display: "inline" }} to={"/register"}>Register Now</Link>
            </p>
            <Link style={{ margin: 0, color: "red", background: "none", border: "none", fontSize: 14, display: "inline" }} to={"/forgot/password"}>Click here if you Forgot your Password ?</Link>

          </form>
        </div>

        {/* rs */}

        <div style={{
          opacity: 0.8,
          width: "50%",
          background: "",


          display: "flex", justifyContent: "center",
        }}>

          <div style={{ display: "flex", justifyContent: "center",alignItems:"center", flexDirection:"column",background:""}}>
            <p style={{ color:"grey",fontSize:35,fontWeight:"bold",fontFamily:"monospace",margin:12}}>Find your dream job today!</p>
            <img style={{
              width: "400px", height: "400px", borderRadius: 190,
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
            }} src={jobsearch} alt="js" />
          </div>


        </div>

        {/*  */}
      </section>
    </>
  );
};

export default Login;