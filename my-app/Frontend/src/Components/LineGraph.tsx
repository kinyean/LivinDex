import React from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface LineGraphProps {
    title: string;
    categories: string[];
    data: number[];
  }
  
  const LineGraph: React.FC<LineGraphProps> = ({ title, categories, data }) => {
    
    const maxY = Math.max(...data, 1);
    const options: ApexOptions = {
        chart: {
          type: "line",
          zoom: { enabled: false },
          foreColor: "var(--body_color)",
        },
        stroke: {
          curve: "smooth",
          width: 3,
          colors: ["#ff4081"], 
        },
        dataLabels: { enabled: false },
        title: {
            text: title,
            style: {
                color: "var(--body_color)",
                fontSize: "25px", 
                fontWeight: "bold", 
              },
            align: "center",
        },          
        xaxis: {
            categories,
            labels: {
              show: true,
              style: { colors: "var(--body_color)" },
              rotate: 0,
              hideOverlappingLabels: false,
              showDuplicates: true,
              trim: false,
              minHeight: 40,     
            },
            tickPlacement: "on",
            axisTicks: { show: true },
            axisBorder: { show: true },
          },
          
          yaxis: {
            min: 0,
            max: maxY <= 5 ? 5 : Math.ceil(maxY * 1.1),
            tickAmount: maxY <= 5 ? maxY : 5,
            labels: {
              style: { colors: "var(--body_color)" },
              formatter: (value: number) => Math.floor(value).toString(),
            },
          },
          
        grid: {
          row: {
            colors: ["#444", "transparent"],
            opacity: 0.3,
          },
        },
      };
      
    const series = [{ name: title, data }];
  
    return (
        <div className="line-chart-container">
          <ReactApexChart options={options} series={series} type="line" height={300} />
        </div>
      );  };
  
  export default LineGraph;
  