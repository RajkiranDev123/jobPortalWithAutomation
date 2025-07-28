import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { VscGitStashApply } from "react-icons/vsc";

const Applications = () => {
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchEmployerApplications());
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications?.length <= 0 ? (
        <h1 style={{ marginTop: 12, height: 500, color: "blue" }}>You have no applications from job seekers.</h1>
      ) : (
        <>
          <div >
            <h3 style={{ color: "blue", display: "flex", alignItems: "center" }}>
              <VscGitStashApply style={{ height: 22, color: "blue" }} /> Applicant's For Your Posted Jobs</h3>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap",gap:4 }}>
              {applications?.map((element) => {
                return (
                  <div style={{
                    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                    padding:3,
                    borderRadius:3
                  }} key={element._id}>
                    <p style={{ fontSize: 14 }}>
                      <span style={{ fontSize: 14 }}>Job Title : </span> {element.jobInfo.jobTitle}
                    </p>
                    <p style={{ fontSize: 14 }}>
                      <span style={{ fontSize: 14 }}> Name : </span>{" "}
                      {element.jobSeekerInfo.name}
                    </p>
                    <p style={{ fontSize: 14 }}>
                      <span style={{ fontSize: 14 }}> Email :</span>{" "}
                      {element.jobSeekerInfo.email}
                    </p>
                    <p style={{ fontSize: 14 }}>
                      <span style={{ fontSize: 14 }}> Phone : </span>{" "}
                      {element.jobSeekerInfo.phone}
                    </p>
                    <p style={{ fontSize: 14 }}>
                      <span style={{ fontSize: 14 }}> Address : </span>{" "}
                      {element.jobSeekerInfo.address}
                    </p>
                    <p style={{ fontSize: 14 }}>
                      <span style={{ fontSize: 14 }}>CoverLetter : </span>
                      <textarea style={{ fontSize: 14, display: "block" }}
                        value={element.jobSeekerInfo.coverLetter}
                        rows={2}
                        cols={30}
                        disabled
                      ></textarea>
                    </p>
                    <div style={{}}>
                      <button style={{ background: "red", color: "white", border: "none", borderRadius: 5, padding: 2, margin: 2, fontSize: 14 }}

                        onClick={() => handleDeleteApplication(element._id)}
                      >
                        Delete
                      </button>
                      &nbsp;
                      <Link style={{ fontSize: 14, textDecoration: "none", borderBottom: "1px solid grey", color: "grey" }}
                        to={
                          element.jobSeekerInfo &&
                          element.jobSeekerInfo.resume.url
                        }

                        target="_blank"
                      >
                        See Resume
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Applications;