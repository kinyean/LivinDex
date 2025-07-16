import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar"; 
import "../../Styles/Content.css";
import { Box, Typography, Paper, Tabs, Tab } from "@mui/material";
import LineGraph from "../../Components/LineGraph"; 

// Sample datasets
const viewsData = [
  { x: "Jun 18", y: 5 },
  { x: "Jun 23", y: 12 },
  { x: "Jun 27", y: 8 },
  { x: "Jul 2", y: 14 },
  { x: "Jul 6", y: 10 },
  { x: "Jul 11", y: 15 },
  { x: "Jul 15", y: 20 },
];

const subscribersData = [
  { x: "Jun 18", y: 0 },
  { x: "Jun 23", y: 1 },
  { x: "Jun 27", y: 1 },
  { x: "Jul 2", y: 2 },
  { x: "Jul 6", y: 3 },
  { x: "Jul 11", y: 5 },
  { x: "Jul 15", y: 10 },
];

const CreateHome: React.FC = () => {
  const [tab, setTab] = useState("1");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const chartData = tab === "1" ? viewsData : subscribersData;
  const chartLabel = tab === "1" ? "Views" : "Subscribers";

  return (
    <div className="content-layout">
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <div className="content-area">
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
            Channel analytics
          </Typography>

          <div className="graph-area">
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, bgcolor: "var(--graph)" }}>
              
              {/* Tabs */}
              <Tabs
                value={tab}
                onChange={handleTabChange}
                textColor="inherit"
                indicatorColor="secondary"
                aria-label="analytics tabs"
                sx={{ mb: 2, color: "var(--body_color)" }}
              >
                <Tab label="Views" value="1" />
                <Tab label="Subscribers" value="2" />
              </Tabs>
              
              {/* Chart */}
              <Box sx={{ height: 300 }} className="line-chart-wrapper">
              <LineGraph
                title={chartLabel}
                categories={chartData.map((d) => d.x)}
                data={chartData.map((d) => d.y)}
              />
              </Box>
            </Paper>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateHome;
