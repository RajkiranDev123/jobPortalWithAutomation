import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';


import { useSelector } from "react-redux";





const chartSetting = {
    xAxis: [
        {
            // label: 'Jobs',
        },
    ],
    width: 600,
    height: 320,
};

function BarGraph() {


    const { monthlyPostedJobs } = useSelector((state) => state.meta);

    const [dataSet, setDataSet] = React.useState([])

    React.useEffect(() => {
        if (monthlyPostedJobs?.length > 0) {


            setDataSet([
                {

                    seoul: monthlyPostedJobs[0]?.count,
                    month: 'Jan',
                },
                {

                    seoul: monthlyPostedJobs[1]?.count,
                    month: 'Feb',
                },
                {

                    seoul: monthlyPostedJobs[2]?.count,
                    month: 'Mar',
                },
                {

                    seoul: monthlyPostedJobs[3]?.count,
                    month: 'Apr',
                },
                {

                    seoul: monthlyPostedJobs[4]?.count,
                    month: 'May',
                },
                {

                    seoul: monthlyPostedJobs[5]?.count,
                    month: 'Jun',
                },
                {

                    seoul: monthlyPostedJobs[6]?.count,
                    month: 'Jul',
                },
                {
                    seoul: monthlyPostedJobs[7]?.count,
                    month: 'Aug',
                },
                {

                    seoul: monthlyPostedJobs[8]?.count,
                    month: 'Sep',
                },
                {

                    seoul: monthlyPostedJobs[9]?.count,
                    month: 'Oct',
                },
                {

                    seoul: monthlyPostedJobs[10]?.count,
                    month: 'Nov',
                },
                {

                    seoul: monthlyPostedJobs[11]?.count,
                    month: 'Dec',
                },
            ])
        }

    }, [])



    function valueFormatter(value) {
        return `${value} Jobs`;
    }

    return (<>
        <div style={{
            background: "white", padding: 5, borderRadius: 4,
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"
        }}>
            <BarChart
                dataset={dataSet}
                yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={[{ dataKey: 'seoul', valueFormatter }]}
                layout="horizontal"
                {...chartSetting}
            />

        </div>



    </>

    );
}

export default BarGraph
