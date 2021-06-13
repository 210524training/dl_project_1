# dl_project_1

## **Possible API requests**

### **Base Router** ('/')

- /login
  - Post
    - Takes username: string, password: string. Checks inputs against the database. If successful sets session Employee and session isLoggedIn and returns true. If unsuccessful returns false.

### **Employee** (/api/v1/employee)

- Get (:id)
  - Retrives Employee by Id and returns json object.

- Post
  - Takes the new employee information json. attempts to add it to the database.

- Patch
  - Takes employee information json. Updates employee in the database.

### **Reimbursment Request** (/api/v1/reimbursmentRequest)

- Get (:id)
  - Retrives a request by id from the database. Returns request .json.
- Get (/myReimbursmentRequests)
  - Retrives all reimbursment requests made by the session employee.
- Get (/reimbursemntRequests/awaitingMyApproval)
  - Retrives all reimbursment requests that are waiting for the session Employees approval.
- Post
  - Takes ReimbursmentRequest .json and attempts to add it to the database.
- Patch
  - Takes ReimbursmentRequest .json and attempts to update that request in the database.
  