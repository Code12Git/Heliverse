# User Management Web Application

## Overview

This full-stack web application allows users to view, interact, and manage a list of users. Users are displayed in a visually appealing card format, with various functionalities and filters for ease of use.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Backend](#backend)
- [Frontend](#frontend)
- [Contributing](#contributing)
- [License](#license)

## Features

1. **Display Users with Pagination:**

   - Users are presented in a card format with pagination, displaying 20 users per page for better user experience.

2. **Search by Name:**

   - Users can search for specific users by their names, with real-time updates as they type.

3. **Filters:**

   - Three filters (Domain, Gender, and Availability) enable users to refine the displayed user list by applying multiple filters simultaneously.

4. **Create a Team:**

   - Users can create teams by selecting unique users based on domain and availability criteria, similar to an e-commerce cart..

5. **Show Team Details:**

   - Details of the created team, including selected users' information, are displayed upon team creation.

6. **Responsiveness:**

   - The application is designed to be responsive, ensuring a seamless experience across various devices and screen sizes.

7. **CRUD API Operations:**

   - Endpoints for managing user data - Create, Read, Update, and Delete users.

8. **Filtering, Searching, and Pagination:**

   - Logic implemented on the backend to handle filtering, searching, and pagination of user data.

9. **Team Operations API:**
   - Endpoints for team-related operations, allowing the creation and retrieval of team details.

## Technologies Used

- React
- Node.js
- Express.js
- MongoDB
- Mongoose
- Redux
- Vinejs (for validations)

## Getting Started

### Prerequisites

Before getting started, make sure you have the following tools and technologies installed:

- Node.js
- Mongodb database
- React.js
- Express

### Installation

```bash
# Clone the repository
git clone https://github.com/Code12Git/Heliverse.git

# Install server dependencies
cd server
npm install

# Install client dependencies
cd client
npm install

```

## Configuration

### Database Configuration

- Create a MongoDB database and configure your database connection in the server/config.env file. You can use the .env.example as a template.

## Usage

Start the frontend and backend servers using the following commands:

Frontend (React.js):

```bash
cd client
npm run dev

```

Backend (Express):

```bash
cd server
npm start

```

## API Endpoints

The following API endpoints are available:

- GET /api/user: Get all uuser
- GET /api/user/🆔: Get a user by ID.
- POST /api/user: Create a new user.
- PUT /api/user/🆔: Update a user by ID.
- DELETE /api/user/🆔: Delete a user by ID.
- POST /api/team: Create a team.
- GET /api/team/🆔: Getting a team by Id.

### Accessing Sample Quotes

To retrieve sample users, you can use API endpoints with tools like [curl](https://curl.se/) or [Postman](https://www.postman.com/) . Here's an example of how to make a GET request to retrieve quotes:

```bash
# For getting users


postman -X GET -u http://3.6.160.185:9000/api/users

# For getting teams

postman -X POST -u http://3.6.160.185:9000/api/teams

```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Happy User management with UserManagement! 📝🚀
