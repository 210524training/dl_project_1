import { AnyAction } from 'redux';
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import EmployeeReducer from './slices/EmployeeSlice';
import MyRequestsReducer from './slices/ReimbursementRequestsSlice';

const store = configureStore({
  reducer: {
    employee: EmployeeReducer,
    myRequests: MyRequestsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;