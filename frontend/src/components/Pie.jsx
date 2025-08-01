import { useSelector } from "react-redux";
import { PieChart } from '@mui/x-charts/PieChart';
import { BsEmojiHeartEyes } from "react-icons/bs";
import { PiSmileyXEyesBold } from "react-icons/pi";


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

            width={320}
            height={200}
            hideLegend
        />
        <div>
            <p style={{ color: "#4254FB",display:"flex",alignItems:"center" ,gap:1}}><BsEmojiHeartEyes /> Viewed Aplications : {metaData?.viewedApplications}</p>
            <p style={{ color: "#FFB422",display:"flex",alignItems:"center",gap:1 }}><PiSmileyXEyesBold />Not-Viewed Applications : {metaData?.unviewedApplications}</p>

        </div>





    </>);
}