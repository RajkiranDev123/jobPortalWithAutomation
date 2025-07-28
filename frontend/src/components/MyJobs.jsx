import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { TfiLayoutListPost } from "react-icons/tfi";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
//
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const MyJobs = () => {
  const [page, setPage] = useState(1)

  const { loading, error, myJobs, message, pageCount } = useSelector(
    (state) => state.jobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
    dispatch(getMyJobs(page));//call api
  }, [dispatch, error, message]);

  const handleDeleteJob = (id) => {
    setPage(1)
    dispatch(deleteJob(id));
  };

  // pagination 1

  const changePage = (event, value) => {
    dispatch(getMyJobs(value));
    setPage(value)
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : myJobs && myJobs?.length <= 0 ? (
        <h1 style={{ fontSize: "1rem", marginTop: 8, height: 500 }}>
          You have not posted any job!
        </h1>
      ) : (
        <>
          <div >
            <p style={{ display: "flex", alignItems: "center", gap: 3, color: "blue", marginTop: 10 }}>
              <TfiLayoutListPost style={{ height: 22 }} /> My Posted Jobs</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 5, flexWrap: "wrap",marginTop:5 }}>
              {myJobs?.map((element) => (
                <div
                  style={{
                    padding: 3, borderRadius: 3, background: "#FAFAFA",
                    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
                  }}
                  key={element?._id} >
                  <p style={{ fontSize: 14 }} >
                    <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />Job Title : </span>
                    {element.title}
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />Job Niche :</span> {element.jobNiche}
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />Salary : </span> {element.salary}
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />Location :</span> {element.location}
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />Job Type :</span> {element.jobType}
                  </p>
                  <p style={{ fontSize: 14 }} >
                    <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />Company Name :</span> {element.companyName}
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />Introduction :</span>
                    <textarea style={{ display: "block", fontSize: 12, outline: "none", border: "none" }} rows={2} cols={35}>{element.introduction}</textarea>
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />Qualifications :</span> {element.qualifications}
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />Responsibilities :</span>
                    <textarea style={{ display: "block", fontSize: 12, outline: "none", border: "none" }} rows={2} cols={35}>{element.responsibilities}</textarea>

                  </p>
                  {element.offers && (
                    <p style={{ fontSize: 14 }}>
                      <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />What Are We Offering :</span> {element.offers}
                    </p>
                  )}
                  <button style={{ background: "red", color: "white", border: "none", borderRadius: 5, padding: 2, margin: 2, fontSize: 14 }}

                    onClick={() => handleDeleteJob(element._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

          </div>
          {/* pagin */}
          <div style={{ display: "flex", justifyContent: "center",margin:3 }}>
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

export default MyJobs;