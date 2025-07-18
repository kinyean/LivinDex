import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar"; 
import "../../Styles/Content.css";
import { Box, Typography, Paper, Tabs, Tab } from "@mui/material";
import LineGraph from "../../Components/LineGraph"; 
import { getSubscriberAnalytics as getSubscriberAnalyticsAPI,
         getViewsAnalytics as getViewsAnalyticsApi} from "./getSubscriberAnalytics";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../index"; 

const CreateHome: React.FC = () => {
  const [tab, setTab] = useState("1");
  const [subscribersData, setSubscribersData] = useState<{ x: string, y: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewsData, setViewsData] = useState<{ x: string, y: number }[]>([]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const creatorId = user.uid;
        try {
          const [subs, views] = await Promise.all([
            getSubscriberAnalyticsAPI(creatorId),
            getViewsAnalyticsApi(creatorId)
          ]);
          setSubscribersData(subs);
          setViewsData(views);
        } catch (err) {
          console.error("Failed to load analytics data", err);
        } finally {
          setLoading(false);
        }
      } else {
        console.warn("No user logged in");
        setLoading(false);
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  
  const chartData = tab === "1" ? viewsData : subscribersData;
  const chartLabel = tab === "1" ? "How many Views you gain in the Past 15 Days" : "How many Subscribers you gain in the Past 15 Days";
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
