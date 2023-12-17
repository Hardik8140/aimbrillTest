import axios from "axios";
import {
  SET_UPLOADED_DATA,
  UPLOAD_FILE_FAILURE,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
} from "./actionType";

export const uploadFile = (file) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_FILE_REQUEST });
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://localhost:8080/read", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: UPLOAD_FILE_SUCCESS });
    dispatch({ type: SET_UPLOADED_DATA, payload: res.data });
    alert("file upload successful");
  } catch (error) {
    dispatch({ type: UPLOAD_FILE_FAILURE });
    console.log(error);
  }
};
