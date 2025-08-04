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
import "../pages/loader2.css"
//modal
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const MyJobs = () => {
  //modal
  const [open, setOpen] = useState(false);

  const [passToDelete, setPassToDelete] = useState("abc123");
  const [typePass, setTypePass] = useState("");

  const [delId, setDelId] = useState("");

  const handleOpen = (id) => {
    setDelId(id)
    setOpen(true);
  }
  const handleClose = () => setOpen(false);


  //
  const [page, setPage] = useState(1)

  const { loading, error, myJobs, message, pageCount, isDeleted } = useSelector(
    (state) => state.jobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      handleClose()
      setDelId("")
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      setPage(1)
      handleClose()
      setDelId("")
      dispatch(resetJobSlice());
    }
    dispatch(getMyJobs(page));//call api
  }, [dispatch, error, message]);

  const handleDeleteJob = () => {
    dispatch(deleteJob(delId));
    handleClose()
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
            <p style={{
              display: "flex", alignItems: "center", gap: 3, color: "blue", marginTop: 10
              , borderRadius: 3, paddingLeft: 3, borderBottom: "2px ridge grey",
              boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"
            }}>
              <TfiLayoutListPost style={{ height: 22 }} /> My Posted Jobs</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 5, flexWrap: "wrap", marginTop: 5 }}>
              {myJobs?.map((element) => (
                <div
                  style={{
                    padding: 5, borderRadius: 3, background: "#FAFAFA", height: 400, position: "relative",
                    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
                  }}
                  key={element?._id} >
                  <p style={{ fontSize: 14 }} >
                    <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />Job Title : </span>
                    {element.title}
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />Job Niche : </span>
                    {element.jobNiche[0]?.toUpperCase() + element.jobNiche?.slice(1)}
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />Salary : </span> {element.salary} p.a.
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />Location : </span>
                    {element.location[0]?.toUpperCase() + element.location?.slice(1)}
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />Job Type : </span> {element.jobType}
                  </p>
                  <p style={{ fontSize: 14 }} >
                    <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />Company Name : </span> {element.companyName}
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />Introduction :</span>
                    <textarea readOnly style={{ display: "block", fontSize: 12, outline: "none", border: "none" }} rows={2} cols={35}>{element.introduction}</textarea>
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />Qualifications :</span>
                    <textarea readOnly style={{ display: "block", fontSize: 12, outline: "none", border: "none" }} rows={2} cols={35}>{element?.qualifications}</textarea>

                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />Responsibilities :</span>
                    <textarea readOnly style={{ display: "block", fontSize: 12, outline: "none", border: "none" }} rows={2} cols={35}>{element.responsibilities}</textarea>

                  </p>
                  {element.offers && (
                    <p style={{ fontSize: 14 }}>
                      <span style={{ fontSize: 14 }}><TbArrowBadgeRightFilled size={10} />What Are We Offering :</span>
                      <textarea readOnly style={{ display: "block", fontSize: 12, outline: "none", border: "none" }}
                        rows={2} cols={35}>{element?.offers}</textarea>


                    </p>
                  )}
                  <button style={{ position: "absolute", bottom: 5, background: "red", color: "white", border: "none", borderRadius: 5, padding: 2, margin: 2, fontSize: 14 }}

                    // onClick={() => handleDeleteJob(element._id)}
                    onClick={() => handleOpen(element?._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

          </div>
          {isDeleted && <div style={{ display: "flex", justifyContent: "center", }}><div className="loader2"></div></div>}
          {/* pagin */}
          <div style={{ display: "flex", justifyContent: "center", margin: 3 }}>
            <Stack spacing={2}>
              <Pagination color="primary" onChange={changePage} page={page} count={pageCount} />
            </Stack>
          </div>
          {/* pagin */}
        </>
      )}
      {/* modal */}
      <div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <p style={{ color: "grey", fontSize: 14 }}>Ask password from Head Admin to delete!</p>
            <input value={typePass} onChange={(e) => setTypePass(e.target.value)} placeholder="Password"
              type="password" style={{ padding: 3, border: "1px solid grey", borderRadius: 4, width: "100%" }} />

            {(passToDelete == typePass) && <button style={{
              background: "red", color: "white", border: "none",
              borderRadius: 5, padding: 2, margin: 2, fontSize: 14
            }}
              onClick={() => handleDeleteJob()}
            >
              Delete
            </button>}

          </Box>
        </Modal>
      </div>







      {/* modal */}
    </>
  );
};

export default MyJobs;