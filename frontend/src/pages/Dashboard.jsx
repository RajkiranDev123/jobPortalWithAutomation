import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, clearAllUserErrors } from "../store/slices/userSlice";
import { LuMoveRight } from "react-icons/lu";
import { FcStatistics } from "react-icons/fc";
import MyProfile from "../components/MyProfile";
import UpdateProfile from "../components/UpdateProfile";
import UpdatePassword from "../components/UpdatePassword";
import MyJobs from "../components/MyJobs";
import JobPost from "../components/JobPost";
import Applications from "../components/Applications";
import MyApplications from "../components/MyApplications";

import { CiUser } from "react-icons/ci";
import { TfiWrite } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsFillPostcardFill } from "react-icons/bs";
import { TfiLayoutListPost } from "react-icons/tfi";
import { VscGitStashApply } from "react-icons/vsc";
import { IoIosLogOut } from "react-icons/io";

import { RxDashboard } from "react-icons/rx";
import EmployerDashboard from "../components/EmployerDashboard";
import JobSeekerDashboard from "../components/JobSeekerDashboard";
import { MdOutlineManageAccounts } from "react-icons/md";


const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("My Profile");

  const { loading, isAuthenticated, error, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated]);

  return (
    <>
      <section className="account">
        <div className="component_header">
          <p style={{ display: "flex", alignItems: "center" }}><RxDashboard /> Dashboard</p>
          <p>
            hi! <span>{user && user?.name}</span>
          </p>
        </div>
        <div className="container">
          {/* sb */}
          <div className={show ? "sidebar showSidebar" : "sidebar"}>
            <ul className="sidebar_links">
             <h5 style={{display:"flex",alignItems:"center"}} ><MdOutlineManageAccounts/>Start Managing!</h5>

              <li>
                <button
                  onClick={() => {
                    setComponentName("My Profile");
                    setShow(!show);
                  }}
                >
                  <CiUser style={{ height: 13 }} />  My Profile
                </button>
              </li>
              {user && user?.role === "Employer" && (
                <li>
                  <button
                    onClick={() => {
                      setComponentName("Employer Dashboard");
                      setShow(!show);
                    }}
                  >
                    <FcStatistics style={{ height: 13 }} />  Stats
                  </button>
                </li>)}
              {user && user?.role === "Job Seeker" && (
                <li>
                  <button
                    onClick={() => {
                      setComponentName("JobSeeker Dashboard");
                      setShow(!show);
                    }}
                  >
                    <FcStatistics style={{ height: 13 }} />  Stats
                  </button>
                </li>)}
              <li>
                <button
                  onClick={() => {
                    setComponentName("Update Profile");
                    setShow(!show);
                  }}
                >
                  <TfiWrite style={{ height: 13 }} />   Update Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setComponentName("Update Password");
                    setShow(!show);
                  }}
                >
                  <RiLockPasswordLine style={{ height: 13 }} />   Update Password
                </button>
              </li>

              {user && user?.role === "Employer" && (
                <li>
                  <button
                    onClick={() => {
                      setComponentName("Job Post");
                      setShow(!show);
                    }}
                  >
                    <BsFillPostcardFill style={{ height: 13 }} />   Post New Job
                  </button>
                </li>
              )}
              {user && user?.role === "Employer" && (
                <li>
                  <button
                    onClick={() => {
                      setComponentName("My Jobs");
                      setShow(!show);
                    }}
                  >
                    <TfiLayoutListPost style={{ height: 13 }} />    My Posted Jobs
                  </button>
                </li>
              )}
              {user && user?.role === "Employer" && (
                <li>
                  <button
                    onClick={() => {
                      setComponentName("Applications");
                      setShow(!show);
                    }}
                  >
                    <VscGitStashApply style={{ height: 13 }} />   Applications
                  </button>
                </li>
              )}
              {user && user?.role === "Job Seeker" && (
                <li>
                  <button
                    onClick={() => {
                      setComponentName("My Applications");
                      setShow(!show);
                    }}
                  >
                    <VscGitStashApply style={{ height: 13 }} />    My Applications
                  </button>
                </li>
              )}
              <li>
                <button style={{ color: "red" }} onClick={handleLogout}><IoIosLogOut style={{ height: 13 }} /> Logout</button>
              </li>
            </ul>
          </div>
          {/* sb ends */}

          <div className="banner" style={{ border: "0px solid red" }}>
            <div style={{ border: "2px solid white" ,marginLeft:5}}
              className={
                show ? "sidebar_icon move_right" : "sidebar_icon move_left"
              }
            >
              <LuMoveRight style={{}}
                onClick={() => setShow(!show)}
                className={show ? "left_arrow" : "right_arrow"}
              />
            </div>
            {(() => {
              switch (componentName) {
                case "My Profile":
                  return <MyProfile />;
                case "Employer Dashboard":
                  return <EmployerDashboard />;

                case "JobSeeker Dashboard":
                  return <JobSeekerDashboard />

                case "Update Profile":
                  return <UpdateProfile />;

                case "Update Password":
                  return <UpdatePassword />;

                case "Job Post":
                  return <JobPost />;

                case "My Jobs":
                  return <MyJobs />;

                case "Applications":
                  return <Applications />;

                case "My Applications":
                  return <MyApplications />;


                default:
                  return <MyProfile />;

              }
            })()}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;