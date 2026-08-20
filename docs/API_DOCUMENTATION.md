# REST API Reference - Aadhi Bhairava Cow Farm

Detailed specifications of REST API endpoints exposed by the backend cluster.

All request bodies must be submitted in JSON format with `Content-Type: application/json`.
Protected endpoints require a `Authorization: Bearer <JWT_Token>` request header.

## Endpoint Modules

### 1. Authentication (`/api/auth`)
- **POST `/register`**: Create a new farm user account.
- **POST `/login`**: Authenticate and retrieve access/refresh tokens.
- **POST `/refresh`**: Refresh an expired access token using refresh tokens.
- **POST `/logout`**: Invalidate session.
- **GET `/me`**: Fetch active user profile and permission sets.

### 2. Cattle Profile Management (`/api/cows`)
- **GET `/`**: Filter, sort, and paginate cattle records.
- **POST `/`**: Register a new cow tag.
- **GET `/:id`**: View detailed cow profile.
- **PUT `/:id`**: Update attributes.
- **DELETE `/:id`**: Archive/delete profile.
- **POST `/:id/pregnancy`**: Log breeding pregnancy cycles.
- **POST `/:id/calving`**: Log birth calving events.

### 3. Milk Collection (`/api/milk`)
- **GET `/collection`**: Fetch morning/evening milk collection records.
- **POST `/collection`**: Log daily yields (quantity, fat, SNF).
- **GET `/sales`**: View invoice customer logs.
- **POST `/sales`**: Log commercial sales values.

### 4. Veterinary Logs (`/api/vet`)
- **GET `/medical`**: Browse medical histories.
- **POST `/medical`**: Open medical diagnostics sheet.
- **PUT `/medical/:id/close`**: Close medical sheet.
- **GET `/vaccination`**: List vaccination schedules.
- **POST `/vaccination`**: Schedule incoming vaccination.
- **PUT `/vaccination/:id/administer`**: Log vaccination completion.

### 5. Warehouse Inventory (`/api/inventory`)
- **GET `/feed`** / **POST `/feed`**: Track feed warehouse stocks.
- **GET `/medicine`** / **POST `/medicine`**: Browse pharmacy stocks.
- **GET `/equipment`** / **POST `/equipment`**: Manage farm equipment.
- **GET `/supplier`** / **POST `/supplier`**: Suppliers contacts list.
- **GET `/po`** / **POST `/po`**: Place vendor purchase orders.

### 6. Ledger Accounting (`/api/finance`)
- **GET `/income`** / **POST `/income`**: Track revenue streams.
- **GET `/expense`** / **POST `/expense`**: Track expenses.
- **GET `/invoice`**: List generated invoices.
- **GET `/summary`**: P&L summary calculations.
