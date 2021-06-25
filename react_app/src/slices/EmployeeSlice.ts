import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Employee from "../models/employee";
import { RootState } from "../store";
import {sendLogin} from '../remote/express_backend/ExpressBackendAPI'

export type EmployeeState = Employee | null;

export type LoginCredentials = {
  username: string;
  password: string;
}

export const loginAsync = createAsyncThunk<Employee, LoginCredentials>(
  'employee/login/asnyc',
  async ({username, password}, thunkAPI) => {

    try {
      const response = await sendLogin(username, password);

      return response;
    } catch(error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const EmployeeSlice = createSlice({
  name: 'employee',
  initialState: null as EmployeeState,
  reducers: {
    login: (state, action: PayloadAction<Employee>) => {
      return action.payload;
    },
    logout: (state) => {
      return null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        // return null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        console.log(action.error);

      });
  },
});

export const { login, logout } = EmployeeSlice.actions;

export const selectEmployee = (state: RootState) => state.employee;

export default EmployeeSlice.reducer;