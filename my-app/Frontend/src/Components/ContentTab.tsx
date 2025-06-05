import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { CloudUpload } from '@mui/icons-material';
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

const createPost = async (text: string, file:File | null, userId: string, tags: string[]) => {
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
    tags,
    createdAt: serverTimestamp(),
  });
};

export default function ContentTab() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };


  const renderPreview = () => {
    if (!file) return null;
    return file.type.startsWith("image") ? (
      <img
        src={URL.createObjectURL(file)}
        alt="Preview"
        style={{ maxHeight: '200px', marginTop: '10px' }}
      />
    ) : (
      <video
        controls
        style={{ maxHeight: '200px', marginTop: '10px' }}
      >
        <source src={URL.createObjectURL(file)} />
      </video>
    );
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
        <TabPanel value="1">
          <h3>Upload Videos</h3>
          <form onSubmit = {async (e) => {
            e.preventDefault();
            if (!file) return alert("Please select a file.");
            await createPost(text, file, "user-id-here", selectedTags);
            alert("Post created successfully");
            setText("");
            setFile(null);
          }}>
            <div className="upload-box-wrapper">
              <label className="upload-box"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files.length > 0) {
                    setFile(e.dataTransfer.files[0]);
                  }
                }}>
                <CloudUpload className="upload-icon" />
                <div className="upload-text">Drag & drop or click to upload</div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            {renderPreview()}
              {file && (
                <button
                  type="button"
                  className="close-button"
                  onClick={() => {
                    setFile(null);
                    if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                    }}
                  }
                  style={{ marginTop: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px' }}
                >
                  Remove File
                </button>
              )}
              
            <textarea
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Add Captions..."
            />

            <div className="tag-selector">
              {["Education", "Tech", "Skill", "Health", "Fitness", "Finance", "Science", "Travel", "Food", "Art"].map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`tag-btn ${selectedTags.includes(tag) ? "selected" : ""}`}
                  disabled={selectedTags.length >= 3 && !selectedTags.includes(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            <button type="submit" className="upload-btn" style={{ marginTop: '16px' }}>
              Post
              </button>
          </form>
        </TabPanel>
        <TabPanel value="2">
          <h3>Upload Images</h3>
          <form onSubmit={async (e) => {
            e.preventDefault();
            if (!file) return alert("Please select a file.");
            await createPost(text, file, "user-id-here", selectedTags);
            alert("Post created successfully");
            setText("");
            setFile(null);
          }}>
            
            <div className="upload-box-wrapper">
              <label className="upload-box"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files.length > 0) {
                    setFile(e.dataTransfer.files[0]);
                  }
                }}>
                <CloudUpload className="upload-icon" />
                <div className="upload-text">Drag & drop or click to upload</div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <div>
              {renderPreview()}
              {file && (
                <button
                  type="button"
                  className="close-button"
                  onClick={() => {
                    setFile(null);
                    if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                    }}
                  }
                  style={{ marginTop: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px' }}
                >
                  Remove File
                </button>
              )}
            </div>
            <textarea
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Add Captions..."
            />

            <div className="tag-selector">
              {["Education", "Tech", "Skill", "Health", "Fitness", "Finance", "Science", "Travel", "Food", "Art"].map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`tag-btn ${selectedTags.includes(tag) ? "selected" : ""}`}
                  disabled={selectedTags.length >= 3 && !selectedTags.includes(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            <button type="submit" className="upload-btn" style={{ marginTop: '16px' }}>
              Post
              </button>
          </form>
        </TabPanel>
      </TabContext>
    </Box>
  );
}