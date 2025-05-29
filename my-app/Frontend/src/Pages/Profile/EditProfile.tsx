import React from "react";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Navbar from "../../Components/Navbar";
import UserImage from "../../Assets/UnknownUser.jpg";
import "../../Styles/EditProfile.css";

import { useEffect, useState } from "react";
import { auth } from "../../index";
import { getUserProfile } from "./GetProfile";


const EditProfile: React.FC = () => {

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
  });
  
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;
  
    getUserProfile(uid).then((data) => {
      setUserData(data);
    }).catch((e) => {
      console.error("Failed to fetch user data:", e);
    });
  }, [uid]);


  return (
    <div className="profile-layout">
      <Navbar />
      <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh", p: 4, mt: 7 }}>
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {/* Left Profile Card */}
          <Grid >
            <Card sx={{ height: "100%", borderRadius: 3, p: 3, textAlign: "center" }}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <img
                  src={UserImage}
                  alt="User Avatar"
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {userData.firstName || "Loading..."}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userData.email || "Loading..."}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userData.phone || "Number : Nill"}
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mt: 3, fontWeight: 600 }}>
                About
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                {userData.bio || "Enter My Bio"}
              </Typography>
            </Card>
          </Grid>

          {/* Right Form Card */}
          <Grid>
          <Card sx={{ height: "100%", borderRadius: 3, p: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#1976d2", mb: 2 }}
            />
              <Box sx={{ p: 4 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1976d2", mb: 2 }}
              >
                Personal Details
              </Typography>

              <Grid container spacing={2}>
                <Grid size={6}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    First Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter first name"
                    variant="outlined"
                    defaultValue={userData.firstName}
                  />
                </Grid>

                <Grid size={6}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Last Name (Optional)
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter last name"
                    variant="outlined"
                    defaultValue={userData.lastName}
                  />
                </Grid>

                <Grid size={6}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter email ID"
                    variant="outlined"
                    defaultValue={userData.email}
                  />
                </Grid>

                <Grid size={6}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Phone
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter phone number"
                    variant="outlined"
                    defaultValue={userData.phone}
                  />
                </Grid>
              </Grid>
              

                <Typography
                  variant="h6"
                  sx={{ paddingTop: 4, fontWeight: 600, color: "#1976d2", mb: 2 }}
                >
                  Bio
                </Typography>
                <Grid size={12}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    User Bio
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Update Bio"
                    variant="outlined"
                    defaultValue={userData.bio}
                  />
                </Grid>
            </Box>
  
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
              <Button variant="outlined" sx={{ mr: 2 }}>
                Cancel
              </Button>
              {/* TODO: Grey out this button if values are default */}
              <Button variant="contained" color="primary">
                Update
              </Button>
            </Box>
          </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default EditProfile;
