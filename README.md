Due Date Calculator - NestJS Application
This is a NestJS application that calculates due dates based on a given start date and a duration.

Features
Calculate due dates based on:
Work days (excluding weekends)
Business hours (customizable start and end time)

Installation
Clone this repository:

Bash
git@github.com:janithapm/issue-tracking-service.git

Install dependencies:

Bash
cd issue-tracking-service
npm install

Usage
Start the application:

Bash
npm run start:dev


Use the API endpoint:

GET /api/dueDate
Request Body:

JSON
{
        "startDate": "2024-07-15",
        "startTime": "09:00 AM",
        "turnAroundTime": 11
}

Response:

JSON
{
    "dueDate": "2024-07-16",
    "dueTime": "12:00 PM"
}

Configuration
Business hours can be customized in the application configuration.

Development
Clone the repository and install dependencies.
Run npm run start:dev to start the development server.
Unit and integration tests can be found in the test directory.