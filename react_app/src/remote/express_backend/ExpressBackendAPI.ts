import { AxiosResponse } from "axios";
import Employee from "../../models/employee";
import ReimbursmentRequest from "../../models/ReimbursementRequests";
import { Role } from "../../types/MyTypes";
import ExpressClient from "./express.client";

export const sendLogin = async (username: string, password: string): Promise<Employee> => {
  const {data: employee} = await ExpressClient.post<Employee>('/login', {
    username,
    password,
  });

  return employee;
}

export const sendGetMyRequests = async (): Promise<ReimbursmentRequest[]> => {
  const result = await ExpressClient.get<ReimbursmentRequest[]>('/api/v1/reimbursements/');
  return result.data;  
}

export const sendGetManagerRequests = async (): Promise<ReimbursmentRequest[]> => {
  const result = await ExpressClient.get<ReimbursmentRequest[]>('/api/v1/manager/');
  return result.data;  
}

export const sendGetDepartmentHeadRequests = async (): Promise<ReimbursmentRequest[]> => {
  const result = await ExpressClient.get<ReimbursmentRequest[]>('/api/v1/departmentHead/');
  return result.data;  
}

export const sendGetBencoRequests = async (): Promise<ReimbursmentRequest[]> => {
  const result = await ExpressClient.get<ReimbursmentRequest[]>('/api/v1/benco/');
  return result.data;  
}

export const sendManagerApproveRequest = async (inputId: number, inputRole: Role): Promise<AxiosResponse> => {
  const result = await ExpressClient.patch<AxiosResponse>('/api/v1/manager/', {
    requestId: inputId, 
    role: inputRole
  });
  return result;  
}

export const sendDepartmentHeadApproveRequest = async (inputId: number, inputRole: Role): Promise<AxiosResponse> => {
  const result = await ExpressClient.patch<AxiosResponse>('/api/v1/departmentHead/', {
    requestId: inputId, 
    role: inputRole
  });
  return result;  
}

export const sendBencoApproveRequest = async (inputId: number, inputRole: Role): Promise<AxiosResponse> => {
  const result = await ExpressClient.patch<AxiosResponse>('/api/v1/benco/', {
    requestId: inputId, 
    role: inputRole
  });
  return result;  
}

export const sendCreateRequest = async (request: ReimbursmentRequest): Promise<AxiosResponse> => {
  const result = await ExpressClient.post<boolean>('/api/v1/reimbursements/', {
    request: request
  });
  return result;  
}
