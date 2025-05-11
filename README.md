

**Hello Employee** is a full-stack employee management system designed to streamline HR operations. Built with Laravel for the backend and React for the frontend, it offers functionalities such as employee registration, attendance tracking, and performance evaluations.

---

## ⚙️ Installation Guide

### Prerequisites

* **Docker** and **Docker Compose** installed on your machine.

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Shiro-cha/hello-employee.git
   cd hello-employee
   ```



2. **Start the Application**

   ```bash
   docker-compose up --build
   ```



This command will set up and run the necessary containers for the application.

3. **Access the Application**

   * **Frontend**: Navigate to `http://localhost:3000` in your web browser.
   * **Backend API**: Accessible at `http://localhost:8000/api`.

---

## 🧪 Testing

To run the test suites:

* **Backend Tests**:

```bash
  docker-compose exec backend php artisan test
```



* **Frontend Tests**:

```bash
  docker-compose exec frontend npm test
```



---

## 📂 Project Structure

* **backend/**: Laravel-based API and business logic.
* **frontend/**: React application for the user interface.
* **docker-compose.yml**: Defines services for Docker containers.
* **custom\_postgresql.conf**: Custom configuration for PostgreSQL database.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---
