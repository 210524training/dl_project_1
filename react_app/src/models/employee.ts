import { Role } from "../types/MyTypes";


 /**
  * Represents the companys departments.
  */
 export type Department = 'Marketing' | 'Shipping' | 'IT' | 'Human Resoures';
 
/**
 * Models the data of a Employee
 *
 * @param employeeId Used as the users table hash key. (number)
 * @param username Must not match existing usernames in the employee's table. (string)
 * @param password (string)
 * @param department Name of department. ('Marketing' | 'Shipping' | 'IT' | 'Human Resoures')
 * @param firstName Employee's first name (string)
 * @param lastName Employee's last name (string)
 * @param role Employees role in the company (Role)
 * @param managerId EmployeeId of this employee's direct manager (number)
 * @
 */
 export default class Employee {
  constructor(
    public employeeId: number,
    public username: string,
    public password: string,
    public department: Department,
    public firstName: string,
    public lastName: string,
    public role: Role,
    public managerId: number,
    public balance: number,
  ) {}
}

// example user declatration
// const employee = new Employee(
//   1, 'username', 'password', 'IT', 'first name', 'last name', 'Benifits Coordinator', 1
// );