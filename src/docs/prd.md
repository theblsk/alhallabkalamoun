## Data Model

# Users:
* id: collected from Clerk
* email: string collected from Clerk
* first_name: string
* last_name: string
* phone_number: string
* role: ADMIN | CUSTOMER | MANAGER
    * ADMIN can't be created, only manually in Clerk and in Neon
    * CUSTOMER is the default on Sign Up
    * MANAGER can ONLY be set by an Admin and not another manager
    * role can't be edited, only set by server side manipulations using next routes, and using ADMIN verified users
    * role on create must be validated client and server side and database level through RLS
-> Relevent Information to Users:
* A user can:
    * read their profile
    * edit their profile information (not role or id obviously)
    * delete their data
    * obviously create their account
