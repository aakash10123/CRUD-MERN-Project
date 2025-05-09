
---

# CRUD MERN Project – User Management

This is a simple **CRUD (Create, Read, Update, Delete)** application built using the **MERN stack** (MongoDB, Express.js, React, Node.js). It allows you to perform CRUD operations on a list of users, each with a name and email. The project is designed to practice basic backend and frontend integration using the MERN stack.

---

### 🧰 **Technologies Used**

* **Frontend:**

  * React
  * Axios (for HTTP requests)
  * React Hot Toast (for toast notifications)
* **Backend:**

  * Node.js
  * Express.js
  * MongoDB (with Mongoose for database management)

---

### 🌟 **Features**

* **Create:** Add new users (name and email).
* **Read:** View a list of all users.
* **Update:** Edit user details (name and/or email).
* **Delete:** Remove users from the list.

Toast notifications are used to provide real-time feedback to the user, showing success or failure messages for each action.

---

### 🚀 **Getting Started**

Follow these steps to set up and run the project on your local machine:

#### 1. **Clone the Repository**

```bash
git clone https://github.com/aakash10123/CRUD-MERN-Project.git
cd CRUD-MERN-Project
```

#### 2. **Backend Setup (Node.js/Express)**

* Go to the `backend` directory:

```bash
cd backend
```

* Install the required dependencies:

```bash
npm install
```

* Create a `.env` file in the `backend` directory and add your MongoDB URI:

```env
MONGO_URI=your-mongodb-uri-here
PORT=5000
```

* Start the backend server:

```bash
npm start
```

The backend will now run on `http://localhost:5000`.

#### 3. **Frontend Setup (React)**

* Go to the `frontend` directory:

```bash
cd frontend
```

* Install the frontend dependencies:

```bash
npm install
```

* Start the frontend development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`.

---

### 🛠️ **Project Structure**

```
/CRUD-MERN-Project
  /backend
    /models
    /routes
    server.js
  /frontend
    /src
      /components
      /services
      App.js
    public/
    src/
  .env
  README.md
```

---

### 📜 **API Endpoints**

* **POST /api/user** – Create a new user
* **GET /api/users** – Get all users
* **PUT /api/updatebyid/\:id** – Update a user's details by ID
* **DELETE /api/deleteuser/\:id** – Delete a user by ID

---

### 🚀 **Future Enhancements**

* User Authentication (Sign Up, Login)
* Email validation (check for unique emails)
* Pagination for displaying large user lists
* Searching and filtering users by name or email

---

### 💻 **Contributing**

Feel free to fork this repository, make changes, and submit pull requests.

---

### 🔗 **License**

This project is open-source and available under the [MIT License](LICENSE).

---


