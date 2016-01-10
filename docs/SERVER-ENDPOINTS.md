## Server endpoints:
| Route                   | Method                              | Description                       |
|:-----------------------:|:-----------------------------------:|:---------------------------------:|
| /                       | GET                                 | Home page                         |
| /api/users              | GET                                 | All users                         |
| /api/users              | POST                                | Register user                     |
| /api/users/rankings     | GET                                 | Get Top Ten Users                 |
| /api/users/rankings     | GET(query {from,to})                | Get user ranking in range         |
| /login                  | POST                                | Login user                        |
| /logout                 | POST                                | Logout                            |
| /admin/upload           | GET                                 | Get file upload page(admin only)  |
| /admin/upload           | POST                                | Upload files(admin only)          |
| /admin/problems         | GET                                 | Get all problems(admin only)      |
| /admin/problems         | POST                                | Create a problem(admin only)      |
| /problems               | POST                                | Make a submission                 |
| /problems/:name         | GET                                 | Get problem description           |
| /submissions            | GET                                 | Get all submissions(admin only)   |
| /contests               | GET                                 | Get all contests                  |
| /contests/:name         | GET                                 | Gets a contest by name            |
| /contests               | POST                                | Post a contest(admin only)        |
