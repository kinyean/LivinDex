import * as React from 'react';
import { useState } from 'react';
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
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null); //Preview
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", text);
    formData.append("userId", "user-id-here"); // Replace with actual user ID
    formData.append("tags", JSON.stringify(selectedTags)); // Convert array to string

    try {
      const response = await BaseAPI.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Post created successfully");
      setText("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error uploading post:", error);
      alert("An error occurred while uploading.");
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
          <form onSubmit={handleSubmit}>
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
          <form onSubmit={handleSubmit}>
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