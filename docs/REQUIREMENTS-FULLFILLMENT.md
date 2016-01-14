## Requirement fulfilment
### 15 dynamic pages: 
   1. Home
   1. Contest
   1. Contests
   1. Add contest
   1. Add problem to contest
   1. Submissions for problem
   1. Tests
   1. Course
   1. Courses
   1. Add course
   1. Top 10 by rank (Filtered rankings - username, rank)
   1. All users by rank
   1. Signup
   1. Sign-up success
   1. Sign-out success    
   1. About
   1. Unauthorized
   1. Not found
   1. Server error
### Full use of MEAN stack
  + NodeJs MVC architecture with Express, Jade, MongoDB with Mongoose
  + Data services, AngularJS & KendoUI for the rendered pages
  + At least 4 tables with server-side paging:
    1. Top 10 users
    2. All users
    3. Courses
    4. Contests
  + Bootstrap for styles
  + Passport with LocalAuthentication/Session strategy
  + AJAX:
    * Code is submitted for evaluation through ajax
    * Code for a specific submission can be requested through ajax
  + Error handling
    * redirects to not-found/unauthorized or server error page
    * Angular & server validations
  + Unit tests: **4 + 2**
  + Security measures:
    + Registration/login data restrictions - only latin alphabet letters, "." and "_"
    + Admin content creation
    + Submitted code sandboxing