import { Department } from './employee';

/**
 * Models the non-private data of a user. Does not store passwords.
 *
 * @param employyeeId Used as the users table hash key. (number)
 * @param username Must not match existing usernames in the employee's table. (string)
 * @param department Name of department. ('Marketing' | 'Shipping' | 'IT' | 'Human Resoures')
 * @param firstName Employee's first name (string)
 * @param lastName Employee's last name (string)
 * @param managerId EmployeeId of this employee's direct manager (number)
 * @
 */
export default class EmployeeSecure {
  constructor(
    public employyeeId: number,
    public username: string,
    public department: Department,
    public firstName: string,
    public lastName: string,
    public managerId: number,
  ) {}
}

// example user declatration
// const employee = new EmployeeSecure(1, 'username', 'IT', 'first name', 'last name', 1);
