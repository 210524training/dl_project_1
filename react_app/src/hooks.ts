import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { getMyRequestsAsync } from "./slices/ReimbursementRequestsSlice";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export async function UseLoadMyRequests (): Promise<undefined> {
  console.log('test1');
  await getMyRequestsAsync({});
  console.log('test2');
  return;
};