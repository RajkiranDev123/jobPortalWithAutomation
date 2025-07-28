import { useEffect } from "react";
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

const MyJobs = () => {
  const { loading, error, myJobs, message } = useSelector(
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
    dispatch(getMyJobs());//call api
  }, [dispatch, error, message]);

  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
  };

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
            <h3 style={{display:"flex",alignItems:"center",gap:3,color:"blue",marginTop:9}}> <TfiLayoutListPost style={{ height: 22 }} /> My Posted Jobs</h3>
            <div style={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
              {myJobs?.map((element) => (
                <div
                  style={{
                    border: "1px solid grey", padding: 3, borderRadius: 3,background:"#F9F6EE"
                  }}
                  key={element?._id} >
                  <p style={{ fontSize: 14 }} >
                    <span style={{ fontSize: 14 }}>Job Title : </span>
                    {element.title}
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}>Job Niche :</span> {element.jobNiche}
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}>Salary : </span> {element.salary}
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}>Location :</span> {element.location}
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}>Job Type :</span> {element.jobType}
                  </p>
                  <p style={{ fontSize: 14 }} >
                    <span style={{ fontSize: 14 }}>Company Name :</span> {element.companyName}
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}>Introduction :</span>
                    <textarea style={{ display: "block", fontSize: 12 }} rows={2} cols={35}>{element.introduction}</textarea>
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}>Qualifications :</span> {element.qualifications}
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}>Responsibilities:</span>
                    <textarea style={{ display: "block", fontSize: 12 }} rows={2} cols={35}>{element.responsibilities}</textarea>

                  </p>
                  {element.offers && (
                    <p style={{ fontSize: 14 }}>
                      <span style={{ fontSize: 14 }}>What Are We Offering :</span> {element.offers}
                    </p>
                  )}
                  <button style={{ background: "red", color: "white", border: "none", borderRadius: 5, padding: 2, margin: 2 }}

                    onClick={() => handleDeleteJob(element._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyJobs;