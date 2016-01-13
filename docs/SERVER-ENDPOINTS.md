## Server endpoints:
| Route                              | Method                                         | Description                                  |
|:----------------------------------:|:----------------------------------------------:|:--------------------------------------------:|
| /                                  | GET                                            | Home page                                    |
| /api/users                         | GET                                            | All users                                    |
| /api/users                         | POST                                           | Register user                                |
| /api/users/rankings                | GET                                            | Get Top Ten Users                            |
| /api/users/rankings                | GET(query {from,to})                           | Get user ranking in range                    |
| /login                             | POST                                           | Login user                                   |
| /logout                            | POST                                           | Logout                                       |
| /unauthorized                      | GET                                            | Unauthorized page                            |
| /admin/upload                      | GET                                            | Get file upload page(admin only)             |
| /admin/upload                      | POST                                           | Upload files(admin only)                     |
| /admin/problems                    | GET                                            | Get all problems(admin only)                 |
| /admin/problems                    | POST                                           | Create a problem(admin only)                 |
| /problems                          | POST                                           | Make a submission                            |
| /problems/:name                    | GET                                            | Get problem description                      |
| /problems/:problem/tests           | GET                                            | Get tests page for problem(admin only)       |
| /problems/:problem/tests           | POST                                           | Upload tests for problem(admin only)         |
| /problems/:problem/tests/upload    | POST                                           | Update tests for problem(admin only)         |
| /submissions                       | GET                                            | Get all submissions(admin only)              |
| /contests                          | GET                                            | Get all contests                             |
| /contests/:name                    | GET                                            | Gets a contest by name                       |
| /contests/:name                    | POST                                           | Makes a submission for the contest(private)  |
| /contests                          | POST                                           | Creates a contest(admin only)                |
| /contests/:name/addproblem         | POST                                           | Adds a problem to the contest(admin only)    |
| /contests/:name/addproblem         | GET                                            | Gets add problem page (admin only)           |