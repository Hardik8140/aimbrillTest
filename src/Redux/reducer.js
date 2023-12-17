import {
  SET_UPLOADED_DATA,
  UPLOAD_FILE_FAILURE,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
} from "./actionType";

const initialState = {
  uploading: false,
  uploadedData: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST:
      return {
        ...state,
        uploading: true,
      };
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        uploading: false,
      };
    case UPLOAD_FILE_FAILURE:
      return {
        ...state,
        uploading: false,
      };
    case SET_UPLOADED_DATA:
      return {
        ...state,
        uploadedData: action.payload,
      };
    default:
      return state;
  }
};
