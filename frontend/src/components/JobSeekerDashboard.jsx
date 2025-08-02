
import { useSelector, useDispatch } from "react-redux";
import { FcStatistics } from "react-icons/fc";
import "../pages/loader.css"
import { useEffect, useRef } from "react";
import { fetchMetaData, fetchMetaDataJobSeeker } from "../store/slices/metaSlice"
import Pie from "./Pie";
import { MdAddChart } from "react-icons/md";
import { TbFilterDown } from "react-icons/tb";
import DateRange from "../components/DateRange"
import "../pages/loader2.css"
import downloadPdf from "../utils/downloadAsPdf.js"
import QRCode from "react-qr-code"
import pdfIcon from "../assets/pdfDown.png"


const JobSeekerDashboard = () => {
    const { user } = useSelector((state) => state.user);
    const pdfRef = useRef()
    const dispatch = useDispatch();
    const { metaData, loading } = useSelector((state) => state.meta);

    const handleFetchMeta = (arg) => {
        { user && user?.role == "Employer" ? dispatch(fetchMetaData(arg)) : dispatch(fetchMetaDataJobSeeker(arg)) }
    };


    useEffect(() => {
        { user && user?.role == "Employer" ? dispatch(fetchMetaData()) : dispatch(fetchMetaDataJobSeeker()) }
    }, [])
    return (
        <div className="">
            <p style={{ color: "blue", display: "flex", alignItems: "center", marginTop: 12 }}>  <FcStatistics style={{ height: 22 }} /> &nbsp; Stats</p>
            {/* meta starts */}
            <div ref={pdfRef} style={{
                display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10, background: "white",
                boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px", margin: 5, padding: 4
            }}>
                {user && user?.role == "Employer" && <div><Pie /></div>}
                {/*  */}

                {user && user?.role == "Employer" && <>
                    <div
                        style={{
                            boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                            padding: 5,
                            borderRadius: 3,
                            width: 195,
                            height: 60,
                            fontFamily: "monospace", fontSize: 14,
                            background: "white", color: "black",
                        }}
                    >
                        <p style={{ fontFamily: "monospace", fontSize: 14, textAlign: "center", display: "flex", alignItems: "center", gap: 1, color: "grey" }}>
                            <MdAddChart />Total Jobs Posted&nbsp;  </p>
                        <p style={{ fontSize: 14, textAlign: "center" }}> {metaData?.jobsPosted} </p>
                    </div>


                    <div
                        style={{
                            boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                            padding: 5,
                            borderRadius: 3,
                            width: 195,
                            height: 60,
                            fontFamily: "monospace", fontSize: 14,
                            background: "white", color: "black",
                        }}
                    >
                        <p style={{ fontFamily: "monospace", fontSize: 14, textAlign: "center", display: "flex", alignItems: "center", gap: 1, color: "grey" }}>
                            <MdAddChart />Total Applied&nbsp;  </p>
                        <p style={{ fontSize: 14, textAlign: "center" }}>
                            {metaData?.viewedApplications + metaData?.unviewedApplications} </p>
                    </div>
                </>}

                {user && user?.role == "Job Seeker" && <>

                    <div
                        style={{
                            boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                            padding: 5,
                            borderRadius: 3,
                            width: 195,
                            height: 60,
                            fontFamily: "monospace", fontSize: 14,
                            background: "white", color: "black",
                        }}
                    >
                        <p style={{ fontFamily: "monospace", fontSize: 14, textAlign: "center", display: "flex", alignItems: "center", gap: 1, color: "grey" }}>
                            <MdAddChart />Total Applied Jobs&nbsp;  </p>
                        <p style={{ fontSize: 14, textAlign: "center" }}>
                            {metaData?.appliedCounts} </p>
                    </div>

                </>}



            </div>
            {/* meta ends */}

            {/* qr and pdf */}
            <p style={{ color: "grey", fontSize: 14 }}>Share the stats!</p>
            {user && user?.role == "Employer" && <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap", gap: 2, margin: 4 }}>
                {/* qr */}
                <QRCode style={{ height: 80, width: 100 }}
                    value={
                        `Viewed Applications : ${metaData?.viewedApplications},
           Not-Viewed Applications : ${metaData?.unviewedApplications},
           Total Jobs Posted  : ${metaData?.jobsPosted},
           Total Applied  : ${metaData?.viewedApplications + metaData?.unviewedApplications} `

                    } />

                {/* qr */}
                <p style={{ color: "grey", fontSize: 14 }}>or</p>

                <button onClick={() => downloadPdf(pdfRef)}
                    style={{ border: "none", borderRadius: 4, cursor: "pointer" }}>
                    <img src={pdfIcon} alt="pdf" style={{ width: 75, height: 75 }} />
                </button>
            </div>}

            {/* job seeker */}
            {user && user?.role == "Job Seeker" && <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap", gap: 2, margin: 4 }}>
                {/* qr */}
                <QRCode style={{ height: 80, width: 100 }}
                    value={
                        `Total  Applied : ${metaData?.appliedCounts}`
                    } />

                {/* qr */}
                <p style={{ color: "grey", fontSize: 14 }}>or</p>

                <button onClick={() => downloadPdf(pdfRef)}
                    style={{ border: "none", borderRadius: 4, cursor: "pointer" }}>
                    <img src={pdfIcon} alt="pdf" style={{ width: 75, height: 75 }} />
                </button>
            </div>}



            {/* job seeker */}


            {/* qr and pdf ends*/}




            {/* date range */}
            <div style={{ border: "1px solid grey", borderRadius: 4, padding: 3 }}>
                <p style={{ fontFamily: "monospace", textDecoration: "", display: "flex", alignItems: "center", gap: 1, marginBottom: 3, color: "grey" }}><TbFilterDown />Date-Range Filter </p>
                <div style={{ marginTop: 2 }}>
                    <DateRange handleFetchMeta={handleFetchMeta} />
                </div>
            </div>
            {/* date range */}

            {/* loader */}
            {loading && <div style={{ display: "flex", justifyContent: "center", margin: 5 }}><div style={{ color: "red" }} className="loader"></div></div>}


            {/*  */}
        </div>
    );
};

export default JobSeekerDashboard;