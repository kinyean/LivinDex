import * as React from 'react';
import { auth } from "../index";
import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { CloudUpload } from '@mui/icons-material';
import '../Styles/Content.css';
import BaseAPI from '../API/BaseAPI';

export default function ContentTab() {
  const [text, setText] = useState("");
  const [header, setHeader] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploadType, setUploadType] = useState<"image" | "video">("video");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [value, setValue] = useState('1');

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setFiles([]);
    setUploadType(newValue === "1" ? "video" : "image");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files || []);
  
    if (uploadType === "video") {
      if (selectedFiles.length > 1) {
        alert("Only one video is allowed.");
        return;
      }
      setFiles(selectedFiles.slice(0, 1)); // Enforce 1
    } else {
      if (files.length + selectedFiles.length > 8) {
        alert("You can only upload up to 8 images.");
        return;
      }
      setFiles(prev => [...prev, ...selectedFiles].slice(0, 8));
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to upload.");
      return;
    }

    const formData = new FormData();
    files.forEach(file => formData.append("files", file));
    formData.append("header", header);
    formData.append("like", "0");
    formData.append("dislike", "0");
    formData.append("text", text);
    formData.append("userId", user.uid);
    formData.append("tags", JSON.stringify(selectedTags));
    formData.append("uploadType", uploadType);

    try {
      await BaseAPI.post(`/upload?uploadType=${uploadType}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Post created successfully");
      setText("");
      setHeader("");
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload.");
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const renderPreviews = () =>
    files.map((file, index) => (
      <div key={index} style={{ marginBottom: '10px' }}>
        {file.type.startsWith("image") ? (
          <img
            src={URL.createObjectURL(file)}
            alt={`preview-${index}`}
            style={{ maxHeight: '200px', marginTop: '10px' }}
          />
        ) : (
          <video
            controls
            style={{ maxHeight: '200px', marginTop: '10px' }}
          >
            <source src={URL.createObjectURL(file)} />
          </video>
        )}
        <button
          type="button"
          onClick={() => removeFile(index)}
          style={{
            marginTop: '4px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            padding: '4px 10px',
            borderRadius: '4px',
            display: 'block',
          }}
        >
          Remove
        </button>
      </div>
    ));

  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="upload-box-wrapper">
        <label
          className="upload-box"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const droppedFiles = Array.from(e.dataTransfer.files);
            if (files.length + droppedFiles.length > 8) {
              alert("You can upload up to 8 files only.");
              return;
            }
            setFiles(prev => [...prev, ...droppedFiles]);
          }}
        >
          <CloudUpload className="upload-icon" />
          <div className="upload-text">Drag & drop or click to upload</div>
          <input
            ref={fileInputRef}
            type="file"
            accept={uploadType === "video" ? "video/*" : "image/*"}
            multiple={uploadType === "image"}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      <div>{renderPreviews()}</div>

      <textarea
        data-gramm="false"
        data-gramm_editor="false"
        onChange={(e) => setHeader(e.target.value)}
        value={header}
        placeholder="Add Header..."
        style={{
          width: "50%",
          height: "40px",             
          padding: "10px",
          minHeight: "unset",
          marginTop: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          boxSizing: "border-box"}}
      />

      <textarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Add Captions..."
        style={{ width: "100%",
           marginTop: "10px",
           borderRadius: "6px",
           border: "1px solid #ccc",
           boxSizing: "border-box" }}
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
  );

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box  sx={{
                borderBottom: 1,
                borderColor:
                  document.body.getAttribute('data-theme') === 'dark'
                    ? '#6a6f73'
                    : '#f0f0f0',
              }}>
          <TabList 
            onChange={handleChange} 
            aria-label="upload tabs"
            sx={{
              '.MuiTab-root': {
                color: 'inherit',
              },
            }}>
            <Tab label="Upload Videos" value="1" />
            <Tab label="Upload Images" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <h3>Upload Videos</h3>
          {renderForm()}
        </TabPanel>
        <TabPanel value="2">
          <h3>Upload Images</h3>
          {renderForm()}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
