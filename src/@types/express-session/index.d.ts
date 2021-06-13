import express from 'express';
import EmployeeSecure from '../../models/employee_secure';

declare module 'express-session' {
  interface SessionData {
    employee: EmployeeSecure;
  }

  interface Session {
    isLoggedIn: boolean = false;
  }
}
