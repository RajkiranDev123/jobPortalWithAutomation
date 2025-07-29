import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";

import { Link } from "react-router-dom";
//
import QRCode from "react-qr-code"
//
import downloadPdf from "../utils/downloadAsPdf.js"
import pdfIcon from "../assets/pdfDown.png"
//
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const Jobs = () => {
  const pdfRefs = useRef({})
  const [city, setCity] = useState("");
  const [page, setPage] = useState(1);




  const [niche, setNiche] = useState("");

  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, loading, error, pageCount } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.user);



  const dispatch = useDispatch();

  useEffect(() => {

    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(city, niche, searchKeyword, 1));
    console.log(pdfRefs)

  }, [dispatch, error, city, niche]);

  const handleSearch = () => {
    if (!searchKeyword) {
      toast.error("Search bar can't be empty!")
      return
    }
    dispatch(fetchJobs(city, niche, searchKeyword, 1));
  };



  const cities = ["All", "Hyderabad", "Bengaluru", "Chennai"];

  const nichesArray = ["All", "Frontend", "Backend", "Full-Stack"];

  // pagination 1

  const changePage = (event, value) => {
    dispatch(fetchJobs("", "", "", value))
    setPage(value)
  }

  const clearSearch = () => {
    setSearchKeyword("")
    setPage(1)
    setCity("")
    setNiche("")
    dispatch(fetchJobs("", "", "", 1))
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">

          {/* search */}
          <div style={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap", margin: 4 }}>

            <input style={{ border: "none", outline: "none", padding: 2, borderRadius: 3,fontSize:14 }}
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder=" Role / Company / etc"
            />

            <button style={{ background: "rgba(8, 146, 208, 1)", color: "#fff", border: "none", outline: "none", padding: 2, borderRadius: 3 }}
              onClick={handleSearch}>Search</button>
            <button style={{ background: "rgba(20, 189, 11, 1)", color: "#fff", border: "none", outline: "none", padding: 2, borderRadius: 3 }}
              onClick={() => clearSearch()}>Clear</button>


          </div>
          {/* search ends */}

          {/* nf */}
          <div style={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap", margin: 3 }}>
            <select style={{ outline: "none", borderRadius: 3, border: "none", color: "grey" }} value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">Filter By City</option>
              {cities.map((city, index) => (
                <option value={city} key={index}>
                  {city}
                </option>
              ))}
            </select>
            <select style={{ outline: "none", borderRadius: 3, border: "none", color: "grey" }}
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
            >
              <option value="">Filter By Niche</option>
              {nichesArray.map((niche, index) => (
                <option value={niche} key={index}>
                  {niche}
                </option>
              ))}
            </select>
          </div>

          {/* nf */}

          {/* instructions */}
          {user && user?.role == "Employer" && <p style={{
            color: "red", fontSize: 13, textAlign: "center",
            background: "white", padding: 2, borderTopRightRadius: 9, margin: "auto", borderBottomLeftRadius: 9, width: "30%"
          }}>
            ***Employer can only view Job but Can't Apply!</p>}

          {user && user?.role == "Job Seeker" && <p style={{
            color: "red", fontSize: 13, textAlign: "center",
            background: "white", padding: 2, borderTopRightRadius: 9, margin: "auto", borderBottomLeftRadius: 9, width: "30%"
          }}>
            ***Job Seeker can only Apply to Jobs but Can't Post!</p>}

          {user && Object.keys(user)?.length === 0 &&
            <p style={{
              color: "red", fontSize: 13, textAlign: "center",
              background: "white", padding: 2, borderTopRightRadius: 9, margin: "auto", borderBottomLeftRadius: 9, width: "40%"
            }}>***
              Login as a Job seeker to Apply jobs or Login as an Employer to post a new Job!
              &nbsp; <Link to={"/login"} style={{ fontSize: 13 }}>Login</Link>
            </p>}
          {/* instructions */}

          {/* jnf */}
          {jobs && jobs.length <= 0 && <p style={{ textAlign: "center", color: "grey" }}>Jobs Not Found!</p>}
          {/* jnf */}

          {/* <div className="wrapper"> */}
          {/* display jobs here */}
          <div
            style={{
              border: "0px solid red", padding: 5, marginTop: 3,
              display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 5,
              // overflowY: "scroll"
            }}>
            {jobs && jobs.length > 0 ? (jobs.map((element) => {

              if (!pdfRefs.current[element._id]) {
                pdfRefs.current[element._id] = React.createRef();
              }

              return (
                <div
                  style={{
                    border: "0px solid grey", padding: 5, display: "flex", flexDirection: "column", gap: 3,
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px", background: "white", borderRadius: 3,
                    height: "16.375rem",
                  }}
                  ref={pdfRefs.current[element._id]} key={element._id}>

                  {element.hiringMultipleCandidates === "Yes" ? (
                    <p >
                      <span style={{ color: "white", background: "green", fontSize: 12, padding: 2, borderRadius: 3 }}>Hiring Multiple Candidates!</span>
                    </p>
                  ) : (
                    <p ><span style={{ color: "white", background: "blue", fontSize: 12, padding: 2, borderRadius: 3 }}>Hiring!</span></p>
                  )}
                  <p style={{ fontSize: 14 }}>Role : {element.title}</p>
                  <p style={{ fontSize: 14 }}>Company : {element.companyName}</p>
                  <p style={{ fontSize: 14 }}>Location : {element?.location[0]?.toUpperCase() + element?.location?.slice(1)}</p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}>Salary :</span> Rs. {element.salary} p.a.
                  </p>
                  <p style={{ fontSize: 14 }}>
                    <span style={{ fontSize: 14 }}>Posted On:</span>{" "}
                    {element.jobPostedOn.substring(0, 10)}
                  </p>

                  <p style={{ color: "grey" }}>
                    <span style={{ fontSize: 13 }}>Share with anyone! :</span>

                  </p>

                  {/* qr and pdf */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                    {/* qr */}
                    <QRCode style={{ height: 80, width: 100 }}
                      value={`Title : ${element?.title}, Company Name : ${element?.companyName}, Location : ${element?.location}, Salary : Rs.${element?.salary}, Posted On : ${element?.jobPostedOn.substring(0, 10)}`} />

                    {/* qr */}
                    <p style={{ color: "grey", fontSize: 14 }}>or</p>

                    <button onClick={() => downloadPdf(pdfRefs.current[element._id])}
                      style={{ border: "none", borderRadius: 4, cursor: "pointer" }}>
                      <img src={pdfIcon} alt="pdf" style={{ width: 75, height: 75 }} />
                    </button>

                  </div>

                  {/* qr and pdf ends*/}

                  <Link
                    style={{
                      textDecoration: "none",
                      background:
                        user?.role === "Job Seeker"
                          ? user?.appliedJobIds?.includes(element?._id)
                            ? "lightgray"
                            : "blue"
                          : "blue",

                      color: "white",
                      padding: 1,
                      borderRadius: 4,
                      textAlign: "center",
                      marginTop: 9,
                      cursor:
                        user?.role === "Job Seeker"
                          ? user?.appliedJobIds?.includes(element?._id)
                            ? "not-allowed"
                            : "pointer"
                          : "pointer",

                    }}
                    className=""
                    to={`/post/application/${element._id}`}
                  >

                    {
                      user?.role === "Job Seeker"
                        ? user?.appliedJobIds?.includes(element?._id)
                          ? "Applied"
                          : "Apply Now"
                        : "View Job"
                    }


                  </Link>
                </div>
                // card ends
              );
            })) : (

              <></>)
            }

          </div>
          {/* pagin */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Stack spacing={2}>
              <Pagination color="primary" onChange={changePage} page={page} count={pageCount} />
            </Stack>
          </div>
          {/* pagin */}

        </section>
      )}
    </>
  );
};

export default Jobs;