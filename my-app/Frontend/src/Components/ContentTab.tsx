import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../index";
import '../Styles/Content.css';

const uploadMedia = async (file: File) => {
  const fileRef = ref(storage, `posts/${Date.now()}-${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
};

const createPost = async (text: string, file:File | null, userId: string) => {
  let mediaURL = "";
  let mediaType = "";

  if (file) {
    mediaType = file.type.startsWith("image") ? "image" : "video";
    mediaURL = await uploadMedia(file);
  }

  await addDoc(collection(db, "posts"), {
    text, 
    mediaURL,
    mediaType,
    userId,
    createdAt: serverTimestamp(),
  });
};

export default function ContentTab() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Upload Videos" value="1" />
            <Tab label="Upload Images" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">Upload Videos
          <form onSubmit = {async (e) => {
            e.preventDefault();
            await createPost(text, file, "user-id-here");
            alert("Post created successfully");
            setText("");
            setFile(null);
          }}>
            <textarea onChange = {(e) => setText(e.target.value)} value = {text} />
            <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <button type="submit">Post</button>
          </form>
        </TabPanel>
        <TabPanel value="2">Upload Images
          <form onSubmit = {async (e) => {
            e.preventDefault();
            await createPost(text, file, "user-id-here");
            alert("Post created successfully");
            setText("");
            setFile(null);
          }}>
            <textarea onChange = {(e) => setText(e.target.value)} value = {text} />
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <button type="submit">Post</button>
          </form>
        </TabPanel>
      </TabContext>
    </Box>
  );
}