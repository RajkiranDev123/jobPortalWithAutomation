import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchJobSeekerApplications,
} from "../store/slices/applicationSlice";
import Spinner from "../components/Spinner";
import { VscGitStashApply } from "react-icons/vsc";

import { GrDocumentUser } from "react-icons/gr";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import moment from "moment"

const MyApplications = () => {
  const [page, setPage] = useState(1);


  const { loading, error, applications, message, pageCount } = useSelector(
    (state) => state.applications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobSeekerApplications(page));
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(fetchJobSeekerApplications(page));
    }
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    setPage(1)
    dispatch(deleteApplication(id));
   

  };

  // pagination 1

  const changePage = (event, value) => {
    dispatch(fetchJobSeekerApplications(value))
    setPage(value)
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <h1 style={{ marginTop: 12, height: 500 }}>
          You have not applied for any job.
        </h1>
      ) : (
        <>

          <p style={{ fontWeight: "bold", color: "#191970", fontSize: 25 ,marginTop:9}}>    <VscGitStashApply style={{ height: 22 }} />  My Application For Jobs</p>

          <div style={{ marginTop: 8, display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }}>
            {applications?.map((element) => {
              return (
                <div key={element._id}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.20) 0px 3px 8px",
                    borderTop: "2px dashed grey",
                    width: 195, padding: 3,
                    borderRadius: 3, fontSize: 12,
                    background: "#FAF9F6",margin:1,
                    borderTopRightRadius:19
                  }}
                >
                  <p style={{ fontSize: 12 }}>
                    ‣ For :  {element.jobInfo.jobTitle}
                  </p>

                  <p style={{ fontSize: 12 }}>
                    ‣ Location : &nbsp;
                    {element?.jobInfo?.jobId?.location[0]?.toUpperCase() + element?.jobInfo?.jobId?.location?.slice(1)}
                  </p>
                  <p style={{ fontSize: 12 }}>
                    ‣ Company : {element?.jobInfo?.jobId?.companyName}
                  </p>
                  <p style={{ fontSize: 12 }}>
                    ‣  Sal : {element?.jobInfo?.jobId?.salary}
                  </p>

                  <p style={{ fontSize: 12 }}>
                    ‣  Applied on :{moment(element?.createdAt).format("YYYY-MM-DD") }
                  </p>

                  <div style={{ marginTop: 3, display: "flex", gap: 23, flexWrap: "wrap", alignItems: "start" }}>
                    <button
                      style={{
                        fontSize: 14, display: "flex", alignItems: "center", gap: 2, background: "red", border: "none",
                        textDecoration: "none", color: "white", borderRadius: 3, cursor: "pointer", paddingLeft: 1, paddingRight: 1
                      }}
                      onClick={() => handleDeleteApplication(element._id)}
                    >
                      Delete
                    </button>
                    <Link
                      to={
                        element.jobSeekerInfo &&
                        element.jobSeekerInfo.resume.url
                      }
                      style={{
                        fontSize: 14, display: "flex", alignItems: "center", gap: 2, borderBottom: "1px solid grey",
                        textDecoration: "none", color: "black", borderRadius: 3, cursor: "pointer", paddingLeft: 1, paddingRight: 1
                      }}

                      target="_blank"
                    >
                      <GrDocumentUser size={9} /> Resume
                    </Link>
                  </div>

                </div>
              );
            })}

          </div>
          {/* pagin */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
            <Stack spacing={2}>
              <Pagination color="primary" onChange={changePage} page={page} count={pageCount} />
            </Stack>
          </div>
          {/* pagin */}

        </>
      )}
    </>
  );
};

export default MyApplications;