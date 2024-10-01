# Task Manager App

## Overview
The **Task Manager App** is a web application that allows users to create, update, delete, and manage tasks efficiently. The app provides a user-friendly interface for task management, enabling users to filter tasks based on their status and search through tasks quickly. It utilizes drag-and-drop functionality to reorder tasks seamlessly.

## Features
- Create new tasks with titles and descriptions.
- Edit existing tasks.
- Delete tasks.
- Filter tasks by status: All, Active, or Completed.
- Search for tasks by title or description.
- Drag-and-drop functionality for task reordering.

## Technologies and Frameworks Used
- **Next.js**: A React framework for building server-rendered applications.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static types for improved developer experience.
- **Ant Design**: A design system and React UI library for building rich user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling the application.
- **react-beautiful-dnd**: A library for adding drag-and-drop functionality to the React application.
- **Local Storage**: Used to persist tasks data in the browser.
- **Docker**: A platform for developing, shipping, and running applications in containers.

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (v14 or later)
- npm (Node Package Manager) or yarn
- Docker Desktop (if you want to run the app with Docker)

### Installation

1. **Clone the repository:**
   git clone https://github.com/floristafa/task-management-app.git


2. **Navigate to the project directory:**

cd task-management-app

3. **Choose your setup method:**

   **Manual setup without Docker**

   1. **Install the dependencies:**

   npm install
   or
   yarn install

   ### Running the Application

   2. **Start the development server:**

   npm run dev
   or
   yarn dev

   **Setup with Docker Desktop**
   - npm run "container:start" to start the container
   - npm run "container:stop" to stop the container

4. **Open your browser and navigate to:**

http://localhost:3000

### Usage
Once the application is running, you can:

Add new tasks using the "Add Task" button.
Edit existing tasks by clicking on ellipsis menu.
Delete tasks using the provided delete functionality on ellipsis menu.
Filter tasks using the segmented control or search for specific tasks using the search input.
Reorder tasks by dragging and dropping them in the list.

### Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.