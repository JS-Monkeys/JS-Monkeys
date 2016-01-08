## Server endpoints:
| Route                   | Method                              | Description                       |
|:-----------------------:|:-----------------------------------:|:---------------------------------:|
| /                       | GET                                 | Home page                         |
| /api/users              | GET                                 | All users                         |
| /api/users              | POST                                | Register user                     |
| /login                  | POST                                | Login user                        |
| /logout                 | POST                                | Logout                            |
| /admin/upload           | GET                                 | Get file upload page(admin only)  |
| /admin/upload           | POST                                | Upload files(admin only)          |
| /admin/problems         | GET                                 | Get all problems(admin only)      |
| /admin/problems         | POST                                | Create a problem(admin only)      |
| /problems               | POST                                | Make a submission                 |
| /problems/:name         | GET                                 | Get problem description           |
| /submissions            | GET                                 | Get all submissions(admin only)   |