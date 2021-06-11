/**
 * Declares custom types for this site.
 */

/**
 * Represents Event Type.
 */
export type RequestEvent = 'University Course' | 'Seminar' | 'Cerification Prep-Class' | 'Certification' | 'Technical Training' | 'Other';
/**
 * Represents status of the request.
 */
export type RequestStatus =
  'Pending Managers Approval' |
  'Pending Employee Response to Manager' |
  'Pending DepartmentHeads Approval' |
  'Pending Employee Response to DepartmentHead' |
  'Pending Benifits Coordinators Approval' |
  'Pending Employee Response to Benifits Coordinator' |
  'Pending Manager Response to ManBenifits Coordinatorager' |
  'Pending DepartmentHead Response to Benifits Coordinator' |
  'Approved - Pending Grades' |
  'Awarded' |
  'Rejected';
/**
 * Represent the employee role in the company.
 */
export type Role = 'Employee' | 'Manager' | 'DepartmentHead' | 'Benifits Coordinator';
/**
 * Represents the companys departments.
 */
export type Department = 'Marketing' | 'Shipping' | 'IT' | 'Human Resoures';
