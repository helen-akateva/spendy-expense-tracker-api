# 💰 Spendy - Finance Tracker API

REST API for tracking personal income and expenses with categorization, monthly reports, and user management.

## 🚀 Quick Start

- **API Base URL**: https://spendy-expence-tracker-api.onrender.com
- **Swagger Documentation**: https://spendy-expence-tracker-api.onrender.com/api-docs
- **Swagger JSON**: https://spendy-expence-tracker-api.onrender.com/api-docs.json

## 📖 About

Spendy is a comprehensive finance tracking API that allows users to:

- Register and authenticate securely using JWT tokens
- Create and manage financial transactions (income and expenses)
- Organize transactions by predefined categories
- Generate monthly financial summaries with detailed breakdowns
- Track spending patterns across different expense categories

## 🛠 Tech Stack

- **Node.js** & **Express.js**
- **MongoDB** for data persistence
- **JWT** for secure authentication
- **Joi** for request validation
- **Swagger/OpenAPI 3.0** for API documentation

## 📋 Available Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and receive access tokens
- `POST /auth/logout` - Logout current session
- `POST /auth/refresh` - Refresh access token

### User Management

- `GET /users/current` - Get current user information

### Categories

- `GET /categories` - Get all available income and expense categories

### Transactions

- `POST /transactions` - Create new transaction
- `GET /transactions` - Get all user transactions (with filtering)
- `PATCH /transactions/:id` - Update transaction
- `DELETE /transactions/:id` - Delete transaction

### Reports

- `GET /summary/:period` - Get monthly financial summary (format: YYYY-MM)

## 📚 Documentation

Complete API documentation with request/response examples, validation rules, and authentication requirements is available at:

👉 **[Swagger UI Documentation](https://spendy-expence-tracker-api.onrender.com/api-docs)**

The interactive Swagger documentation allows you to:

- Explore all available endpoints
- Test API requests directly in your browser
- View detailed request/response schemas
- Understand validation requirements
- See authentication examples

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. After successful registration or login, include the token in the Authorization header:

```
Authorization: Bearer {your_access_token}
```

## 💡 Quick Example

```bash
# Register a new user
curl -X POST https://spendy-expence-tracker-api.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"SecurePass123"}'

# Login
curl -X POST https://spendy-expence-tracker-api.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePass123"}'

# Create a transaction (use token from login response)
curl -X POST https://spendy-expence-tracker-api.onrender.com/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"type":"expense","category":"Products","amount":50.00,"date":"2024-01-20","comment":"Groceries"}'
```

## 📊 Categories

**Income Categories:**

- Incomes

**Expense Categories:**

- Main expenses
- Products
- Car
- Self care
- Child care
- Household products
- Education
- Leisure
- Other expenses
- Entertainment

## ⚠️ Error Handling

The API returns standard HTTP status codes:

| Code | Description                           |
| ---- | ------------------------------------- |
| 200  | Success                               |
| 201  | Resource created                      |
| 400  | Bad request / Validation error        |
| 401  | Unauthorized                          |
| 403  | Forbidden                             |
| 404  | Not found                             |
| 409  | Conflict (e.g., email already exists) |
| 500  | Internal server error                 |

## 👥 Team

Developed by a team of developers as part of an educational project.

## 📝 License

MIT

---

**For detailed API documentation, visit [Swagger Documentation](https://spendy-expence-tracker-api.onrender.com/api-docs)**
