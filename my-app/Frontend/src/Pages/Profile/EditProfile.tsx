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
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../../index";
import { verifyBeforeUpdateEmail } from "firebase/auth"; 
import { getUserProfile as getUserProfileApi,
         updateUserProfile as updateUserProfileApi } from "./GetProfile";
import { onAuthStateChanged } from "firebase/auth";

const EditProfile: React.FC = () => {

  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [formEmail, setFormEmail] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    like: 0,
    following: 0,
    subscriber: 0
  });
  
  const uid = auth.currentUser?.uid;
  const firebaseEmail = auth.currentUser?.email;
  const [originalData, setOriginalData] = useState(userData);
  const isFormChanged = () => {
    return (
      userData.firstName !== originalData.firstName ||
      userData.lastName !== originalData.lastName ||
      userData.phone !== originalData.phone ||
      userData.bio !== originalData.bio ||
      userData.email !== originalData.email
    );
  };

  const handleUpdate = async () => {
    if (!uid || !auth.currentUser) return;
  
    await auth.currentUser.reload();
  
    const currentEmail = (auth.currentUser.email || "").trim().toLowerCase();
    const formEmailRaw = userData.email ?? ""; 
    const formEmail = formEmailRaw.trim().toLowerCase();

    // Only attempt email verification if a valid new email was entered
    if (formEmail && formEmail !== currentEmail) {
      verifyBeforeUpdateEmail(auth.currentUser, formEmail)
        .then(() => {
          alert("A verification email has been sent. Please verify it, then login again.");
          auth.signOut().then(() => navigate("/login"));
        })
        .catch((e) => {
          console.error("Failed to send verification email:", e);
          alert("Failed to update email. " + e.message);
        });
      return;
    }
  
    updateUserProfileApi(uid, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      bio: userData.bio,
    })
      .then(() => {
        alert("Profile updated!");
        originalData.firstName = userData.firstName;
        originalData.lastName = userData.lastName;
        originalData.phone = userData.phone;
        originalData.bio = userData.bio;
        originalData.email = userData.email;
      })
      .catch((e) => {
        console.error("Profile update failed:", e);
        alert("Failed to update profile. " + e.message);
      });
  };  

  // Check auth state and load user profile if logged in

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("No user is logged in");
        return;
      }
  
      if (user) {
        setCurrentUserId(user.uid);
      }
      
      const uid = user.uid;
      setFormEmail(user.email ?? "");
      
      getUserProfileApi(uid).then((data) => {
        setUserData(data);
        setOriginalData(data);
      }).catch((e) => {
        console.error("Failed to fetch user data:", e);
      });
    });
  
    return () => unsubscribe();
  }, []);
  
  return (
    <div className="profile-layout">
      <Navbar />
      <Box sx={{ backgroundColor: 'var(--body_background)', minHeight: "100vh", p: 4, mt: 7 }}>
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {/* Left Profile Card */}
          <Grid >
            <Card sx={{ backgroundColor: 'var(--reg_background)', height: "100%", borderRadius: 3, p: 3, textAlign: "center" }}>
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
                {userData.firstName + " " + userData.lastName|| "Loading..."}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {firebaseEmail|| "Loading..."}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {"PH: " + userData.phone || "PH : Nill"}
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
          <Card sx={{ backgroundColor: 'var(--reg_background)', height: "100%", borderRadius: 3, p: 3 }}>
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
                    onChange={(e) =>
                      setUserData({ ...userData, firstName: e.target.value })
                    }
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
                    onChange={(e) =>
                      setUserData({ ...userData, lastName: e.target.value })
                    }
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
                    value={formEmail || ""}
                    error={emailError}
                    helperText={emailError ? "Email must contain @" : ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormEmail(value);
                      setUserData({ ...userData, email: value });
                      setEmailError(!value.includes("@"));
                    }}
                  />
                </Grid>

                <Grid size={6}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Phone (Optional)
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter phone number"
                    variant="outlined"
                    value={userData.phone}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      maxLength: 8,
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,8}$/.test(value)) {
                        setUserData({ ...userData, phone: value });
                      }
                    }}
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
                    onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                  />
                </Grid>
            </Box>
  
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
              <Button variant="outlined" sx={{ mr: 2 }} onClick={() => navigate(`/profile/${currentUserId}`)}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleUpdate} disabled={!isFormChanged()}>
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
