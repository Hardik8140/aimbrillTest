import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../Redux/action";

const HomePage = () => {
  const dispatch = useDispatch();
  const uploading = useSelector((store) => store.uploadReducer.uploading);
  const [selectedFile, setSelectedFile] = useState();
  const uploadedData = useSelector((store) => store.uploadReducer.uploadedData);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    dispatch(uploadFile(selectedFile));
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

      {uploadedData && Array.isArray(uploadedData) && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Employee Name</TableCell>
                <TableCell>Employee Status</TableCell>
                <TableCell>Joining Date</TableCell>
                <TableCell>Birth Date</TableCell>
                <TableCell>Skill</TableCell>
                <TableCell>Salary Details</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uploadedData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.employeeId}</TableCell>
                  <TableCell>{row.employeeName}</TableCell>
                  <TableCell>{row.employeeStatus}</TableCell>
                  <TableCell>{row.joiningDate}</TableCell>
                  <TableCell>{row.birthDate}</TableCell>
                  <TableCell>{row.skill}</TableCell>
                  <TableCell>{row.salaryDetails}</TableCell>
                  <TableCell>{row.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default HomePage;
