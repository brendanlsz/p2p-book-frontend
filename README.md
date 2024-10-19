# Book Exchange App (Frontend)

![image](https://github.com/user-attachments/assets/f51d5932-9144-4600-80cd-031c8eb68186)
![image](https://github.com/user-attachments/assets/a224dd7b-bf8c-45ed-be33-d37e6f112488)


## Overview

The Book Exchange App is a React-based frontend for a book lending system. It provides an intuitive user interface for users to manage book listings, request to borrow books, and handle incoming and outgoing requests. The app communicates with the Book Exchange API to facilitate seamless user experiences.

## Key Features

- **User Authentication**: Users can register and log in, receiving a JWT for secure access to protected routes.
- **Book Listings**: Users can view a list of available books with details such as title, author, and condition.
- **Borrow Requests**: Users can request to borrow books and manage their borrow requests.
- **Request Management**: Users can view incoming requests for their books and accept or reject them.
- **Polling for Real-time Updates**: The app polls the API for real-time updates on books and requests to ensure users see the latest information.

## Setup Instructions

### Prerequisites

- **Node.js**: Ensure you have Node.js (v14 or later) installed on your machine.
- **API Endpoint**: You need access to a running instance of the Book Exchange API (backend).

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/brendanlsz/p2p-book-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm start
   ```

   The app should now be running on `http://localhost:3001`.

## Key Components

### User Authentication
- **Login**: Allows users to log in using their email and password.
- **Sign Up**: Users can create a new account.

### Book Management
- **Books List**: Displays all available books with details and an option to request borrowing.

### Borrow Requests
- **Borrow Request Form**: Users can submit a request to borrow a book by entering the book ID.
- **My Requests**: Users can view their submitted borrow requests and their status.

### Incoming Requests
- **Request Management**: Users can see incoming requests for their books and accept or reject them.

## Decisions Worth Noting

- **React for Frontend Development**: React was chosen for its component-based architecture, allowing for reusable UI components and a smooth user experience.

- **State Management**: The app uses React's built-in state management via hooks to manage the application state efficiently.

- **Polling Mechanism**: The decision to implement polling for real-time updates ensures users are always seeing the latest data without manual refreshes.

## Project Plan and Future Milestones

### Current Milestones

1. **User Authentication**: Complete
2. **Book Management**: Complete
3. **Borrow Request System**: Complete
4. **Request Management**: Complete
5. **Responsive Design**: Complete

### Future Extensions

1. **User Profile Management**: Implement user profiles to allow users to manage their information and preferences.
   - Estimated Completion: Q1 2025

2. **Search Functionality**: Enable users to search for books by various criteria such as title, author, and condition.
   - Estimated Completion: Q2 2025

3. **Improved UI/UX**: Enhance the user interface and experience based on user feedback to make it more intuitive.
   - Estimated Completion: Q3 2025

4. **Testing and QA**: Implement comprehensive testing using tools like Jest and React Testing Library.
   - Estimated Completion: Q4 2025

## Conclusion

The Book Exchange App provides a user-friendly interface for managing book lending requests and listings. With a strong foundation built using React and a focus on real-time updates, the app is poised for future enhancements that will improve functionality and user experience.
