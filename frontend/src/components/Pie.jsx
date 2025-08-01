import { useSelector } from "react-redux";
import { PieChart } from '@mui/x-charts/PieChart';

export default function Pie() {
    const { metaData } = useSelector((state) => state.meta);
    return (<>
        <PieChart
            series={[
                {
                    data: [
                        { id: 0, value: metaData?.viewedApplications, label: "Viewed" },
                        { id: 1, value: metaData?.unviewedApplications, label: "Not-Viewed" },

                    ],
                },
            ]}

            width={300}
            height={180}
            hideLegend
        />
        <div style={{border:"1px solid grey",padding:3,borderRadius:3}}>
            <p style={{ color: "#4254FB",display:"flex",alignItems:"center" ,gap:1,fontSize:13}}> Viewed Aplications : {metaData?.viewedApplications}</p>
            <p style={{ color: "#FFB422",display:"flex",alignItems:"center",gap:1,fontSize:13 }}> Not-Viewed Applications : {metaData?.unviewedApplications}</p>

        </div>
    </>);
}