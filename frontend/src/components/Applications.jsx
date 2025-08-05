import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  deleteApplication,
  viewedApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { VscGitStashApply } from "react-icons/vsc";
//
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FaFilePdf } from "react-icons/fa";
import { pdfDownload, clearMetaErrors } from "../store/slices/metaSlice"
import "../pages/loader2.css"

const Applications = () => {
  const [page, setPage] = useState(1)
  // const [elId, setElId] = useState("")
  const { downloading } = useSelector((state) => state.meta);

  const { applications, loading, error, message, pageCount, viewed, isDeleted } = useSelector(
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
      dispatch(resetApplicationSlice());//back to normal state after success
    }
    dispatch(fetchEmployerApplications(page));
  }, [error, message]);

  const handleDeleteApplication = (id) => {
    setPage(1)

    dispatch(deleteApplication(id));
  };

  const handleViewedApplication = (id, jobTitle, email) => {
    dispatch(viewedApplication(id, jobTitle, email));
  };

  // pagination 1

  const changePage = (event, value) => {
    dispatch(fetchEmployerApplications(value));
    setPage(value)
  }



  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications?.length <= 0 ? (
        <h1 style={{ marginTop: 12, height: 500, color: "blue" }}>You have no applications from job seekers.</h1>
      ) : (
        <>
          <div >
            <p style={{
              color: "#0E3386", display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap", justifyContent: "space-between", margin: 6
              , borderRadius: 3, paddingLeft: 3, borderBottom: "2px ridge grey",
              boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"
            }}>
              <span> <VscGitStashApply style={{ height: 22, color: "#0E3386" }} />Applicant's For Your Posted Jobs</span>
              <button
                onClick={() => dispatch(pdfDownload())}
                style={{
                  display: "flex", alignItems: "center", background: "red", color: "white", border: "none", borderRadius: 4,
                  fontSize: 14, padding: 2

                }}>{downloading ?
                  <div style={{ display: "flex", justifyContent: "center", margin: 2 }}><div style={{ color: "red" }} className="loader"></div></div>
                  : "Download pdf"}<FaFilePdf /></button>
            </p>

            <p style={{color:"grey",fontSize:14,textAlign:"center",margin:2}}>Note : If you click Set as Viewed? then mail also will be sent to the job seeker !</p>

            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
              {applications?.map((element) => {
                return (
                  <div style={{
                    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                    padding: 3,
                    borderRadius: 3
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
                    <p>
                      <Link style={{ fontSize: 14, textDecoration: "none", borderBottom: "1px solid grey", color: "grey" }}
                        to={
                          element.jobSeekerInfo &&
                          element.jobSeekerInfo.resume.url
                        }

                        target="_blank"
                      >
                        See Resume
                      </Link>
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
                      <button style={{ width: "100%", background: "red", color: "white", border: "none", borderRadius: 5, padding: 2, margin: 2, fontSize: 14 }}

                        onClick={() => handleDeleteApplication(element._id)}
                      >
                        Delete
                      </button>


                      {/*  */}
                      {element?.viewed == false && <button style={{ width: "100%", display: "flex", justifyContent: "center", background: "green", color: "white", border: "none", borderRadius: 5, padding: 1, margin: 2, fontSize: 14 }}

                        onClick={() => { handleViewedApplication(element._id, element.jobInfo.jobTitle, element.jobSeekerInfo.email) }}
                      >
                        Set as Viewed?
                      </button>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {/* loader for set as viewed */}
      {(isDeleted || viewed) && <div style={{ display: "flex", justifyContent: "center", margin: 2 }}><div style={{ color: "red" }} className="loader2"></div></div>}


      {/*  */}
      {/* pagin */}
      {applications?.length > 0 && <div style={{ display: "flex", justifyContent: "center", margin: 3 }}>
        <Stack spacing={2}>
          <Pagination color="primary" onChange={changePage} page={page} count={pageCount} />
        </Stack>
      </div>}
      {/* pagin */}
    </>
  );
};

export default Applications;