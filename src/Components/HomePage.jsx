import { Button, Input } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const HomePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      await axios.post("http://localhost:8080/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error.message);
      alert("Error uploading file. Please try again.");
    }
  };
  return (
    <div>
      <Input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!selectedFile}
      >
        Upload
      </Button>
    </div>
  );
};

export default HomePage;
