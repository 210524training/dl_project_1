export type Department = 'Marketing' | 'Shipping' | 'IT' | 'Human Resoures';

/**
 * Models the data of a user
 *
 * @param employyeeId Used as the users table hash key. (number)
 * @param username Must not match existing usernames in the employee's table. (string)
 * @param password (string)
 * @param department Name of department. ('Marketing' | 'Shipping' | 'IT' | 'Human Resoures')
 * @param firstName Employee's first name (string)
 * @param lastName Employee's last name (string)
 * @param managerId EmployeeId of this employee's direct manager (number)
 * @
 */
export default class User {
  constructor(
    public employyeeId: number,
    public username: string,
    public password: string,
    public department: Department,
    public firstName: string,
    public lastName: string,
    public managerId: number,
  ) {}
}

// example user declatration
// const user = new User(1, 'username', 'password', 'IT', 'first name', 'last name', 1);
