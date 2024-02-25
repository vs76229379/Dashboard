import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import { useGetYearQuery } from "state/api";

const YearChart = ({ isDashboard = false, view }) => {
    const { data, isLoading } = useGetYearQuery();
    console.log("data",data);

    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                height: 600,
                type: "rangeBar",
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                },
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    var a = moment(val[0]);
                    var b = moment(val[1]);
                    var diff = b.diff(a, "years");
                    return diff + (diff > 1 ? " years" : " year");
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "light",
                    type: "vertical",
                    shadeIntensity: 0.25,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [50, 0, 100, 100],
                },
            },
            xaxis: {
                type: "datetime",
            },
            yaxis: {
                labels: {
                    offsetX: -10,
                    offsetY: -10,
                    style: {
                        colors: '#FFFFFF'
                    }
                }
            },
            colors: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'],
            legend: {
                position: "top",
            },
        },
    });

    useEffect(() => {
        if (data) {
            const series = data.map((item) => ({
                name: item.topic,
                data: [
                    {
                        x: item.topic,
                        y: [
                            new Date(item.start_year).getTime(),
                            item.end_year ? new Date(item.end_year).getTime() : new Date().getTime(),
                        ],
                    },
                ],
            }));

            setChartData((prevState) => ({
                ...prevState,
                series,
            }));
        }
    }, [data]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div style={{ height: '800px', width:'2500px' }}>
            <Chart
              type="rangeBar"
              height={3000 }
              options={chartData.options}
              series={chartData.series}
            />
        </div>
    );
}

export default YearChart;
