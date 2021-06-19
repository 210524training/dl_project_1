import Employee from "../../models/employee";
import ReimbursmentRequest from "../../models/ReimbursementRequests";
import ExpressClient from "./express.client";

export const sendLogin = async (username: string, password: string): Promise<Employee> => {
  const {data: employee} = await ExpressClient.post<Employee>('/login', {
    username,
    password,
  });

  return employee;
}

export const sendGetMyRequests = async (): Promise<ReimbursmentRequest[]> => {
  // const {data: unknown} = await ExpressClient.get<unknown>('/api/v1/reimbursements/');
  const result = await ExpressClient.get('/api/v1/reimbursements/');
  console.log(typeof(result));
  return result.data as ReimbursmentRequest[]; 
}
