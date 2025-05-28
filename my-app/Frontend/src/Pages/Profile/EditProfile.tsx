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

const EditProfile: React.FC = () => {
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
                Kemango
              </Typography>
              <Typography variant="body2" color="text.secondary">
                kemango@test.com
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mt: 3, fontWeight: 600 }}>
                About
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                I'm Kemango. Year 1 Student doing Orbital in this summer 2025.
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
                  />
                </Grid>

                <Grid size={6}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Last Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter last name"
                    variant="outlined"
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
                    defaultValue="I am smart!" // TODO: Fetch info from backend and populate
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
