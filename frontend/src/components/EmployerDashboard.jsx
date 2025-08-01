
import { useSelector, useDispatch } from "react-redux";
import { FcStatistics } from "react-icons/fc";
import "../pages/loader.css"
import { useEffect } from "react";
import { fetchMetaData } from "../store/slices/metaSlice"
import Pie from "./Pie";
import { MdAddChart } from "react-icons/md";
import { TbFilterDown } from "react-icons/tb";
import DateRange from "../components/DateRange"

const EmployerDashboard = () => {
  const dispatch = useDispatch();
  const { metaData } = useSelector((state) => state.meta);

  const handleFetchMeta = (arg) => {
    dispatch(fetchMetaData(arg));
  };


  useEffect(() => {
    dispatch(fetchMetaData())
  }, [])
  return (
    <div className="">
      <p style={{ color: "blue", display: "flex", alignItems: "center", marginTop: 12 }}>  <FcStatistics style={{ height: 22 }} /> &nbsp; Stats</p>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10, background: "white" }}>
        <div><Pie /></div>
        {/*  */}

        <div
          style={{
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            padding: 5,
            borderRadius: 3,
            width: 180,
            height: 60,
            fontFamily: "monospace", fontSize: 14,
            background: "white", color: "black",
          }}
        >
          <p style={{ fontFamily: "monospace", fontSize: 14, textAlign: "center", display: "flex", alignItems: "center", gap: 1 }}>
            <MdAddChart />Total Jobs Posted&nbsp;  </p>
          <p style={{ fontSize: 14,textAlign:"center" }}> {metaData?.jobsPosted} </p>
        </div>
        {/*  */}
        <div
          style={{
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            padding: 5,
            borderRadius: 3,
            width: 180,
            height: 60,
            fontFamily: "monospace", fontSize: 14,
            background: "white", color: "black",
          }}
        >
          <p style={{ fontFamily: "monospace", fontSize: 14, textAlign: "center", display: "flex", alignItems: "center", gap: 1 }}>
            <MdAddChart />Total Applications&nbsp;  </p>
          <p style={{ fontSize: 14 ,textAlign:"center"}}>
             {metaData?.viewedApplications+metaData?.unviewedApplications} </p>
        </div>

        {/* date range */}
        <div style={{ border: "1px solid grey", borderRadius: 4, padding: 3 }}>
          <p style={{ fontFamily: "monospace", textDecoration: "", display: "flex", alignItems: "center", gap: 1 }}><TbFilterDown />  Filters </p>
          <div style={{ marginTop: 2 }}>
            <DateRange handleFetchMeta={handleFetchMeta}/>
          </div>
        </div>



      </div>
    </div>
  );
};

export default EmployerDashboard;