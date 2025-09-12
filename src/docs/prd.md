## Data Model

# Users:
* id: collected from Clerk
* email: string collected from Clerk
* first_name: string
* last_name: string
* phone_number: string
* role: one of ADMIN | CUSTOMER | MANAGER (Postgres enum)
    * ADMIN cannot be self-assigned or created via user flows. It must be assigned by an Admin-only server operation (API route/server action) and mirrored from Clerk claims; do not modify directly in Neon.
    * CUSTOMER is the default on sign-up.
    * MANAGER can be assigned only by an Admin (never by another Manager).
    * role is immutable via client; only set/changed by admin-protected server code.
    * Validate role on create/update at: client (UI), server (authorization checks), and database (constraints + RLS).
-> Relevent Information to Users:
* A user can:
    * read their profile
    * edit their profile information (not role or id obviously)
    * delete their data
    * obviously create their account
