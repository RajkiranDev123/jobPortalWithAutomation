
import { useSelector, useDispatch } from "react-redux";
import { FcStatistics } from "react-icons/fc";
import "../pages/loader.css"
import { useEffect } from "react";
import { fetchMetaData } from "../store/slices/metaSlice"
const EmployerDashboard = () => {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.meta);


  useEffect(() => {

    dispatch(fetchMetaData())
  }, [])
  return (
    <div className="">
      <p style={{ color: "blue", display: "flex", alignItems: "center" }}>  <FcStatistics style={{ height: 22 }} />  Stats</p>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 30, background: "white" }}>
        <div
          style={{
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            padding: 5,
            borderRadius: 3,
            width: 200,
            height: 100,
            display: "flex", justifyContent: "center", alignItems: "center"
          }}
        >kjhg</div>
        {/*  */}
        <div
          style={{
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            padding: 5,
            borderRadius: 3,
            width: 200,
            height: 100,
            display: "flex", justifyContent: "center", alignItems: "center"
          }}
        >kjhg</div>
        {/*  */}


      </div>




    </div>
  );
};

export default EmployerDashboard;