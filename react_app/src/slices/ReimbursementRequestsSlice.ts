import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ReimbursmentRequest from "../models/ReimbursementRequests";
import { RootState } from "../store";
import {sendGetMyRequests, sendLogin} from '../remote/express_backend/ExpressBackendAPI'

export type MyRequestsState = ReimbursmentRequest[] | null;

export type inputParams = {
  
}

export const getMyRequestsAsync = createAsyncThunk<ReimbursmentRequest[], inputParams>(
  'myRequests/login/async',
  async (input: inputParams, thunkAPI): Promise<any> => {

    try {
      console.log('await sendGetMyRequests()');
      const response = await sendGetMyRequests();
      // console.log(typeof(response));
      return response;
    } catch(error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const myRequestsSlice = createSlice({
  name: 'myRequests',
  initialState: null as MyRequestsState,
  reducers: {
    login: (state, action: PayloadAction<ReimbursmentRequest[]>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyRequestsAsync.pending, (state) => {
        // return null;
      })
      .addCase(getMyRequestsAsync.fulfilled, (state, action) => {
        return action.payload as ReimbursmentRequest[];
      })
      .addCase(getMyRequestsAsync.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});

export const retriveMyRequests = (state: RootState) => state.myRequests;

export default myRequestsSlice.reducer;