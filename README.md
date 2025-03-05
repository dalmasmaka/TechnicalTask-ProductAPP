# TechnicalTask-ProductAPP

## Description
This is the frontend of the Product Management System, developed using Angular and TypeScript. It connects to the backend API built with .NET 8 to provide a user-friendly interface for managing products.

## Prerequisites
Make sure you have the following installed on your machine:
- Node.js (Latest LTS version recommended)
- Angular CLI (`@angular/cli`)
- Git

## Installation and Setup
Follow these steps to set up and run the project:

1. **Clone the repository**
   ```sh
   git clone (https://github.com/dalmasmaka/TechnicalTask-ProductAPP.git)
   ```
2. **Navigate to the project directory**
   ```sh
   cd TechnicalTask-ProductAPP
   ```
3. **Install dependencies**
   ```sh
   npm install
   ```
4. **Update the API base URL**
   - Open `src/app/environments/environment.dev.ts`
   - Modify the `apiUrl` to match your backend URL.
   
   Example:
   ```ts
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:5000/api' // Update this with your backend URL
   };
   ```
5. **Run the application**
   ```sh
   ng serve
   ```
   The app should now be accessible at:
   ```
   http://localhost:4200/
   ```

## Contribution
Feel free to fork the repository, make changes, and submit a pull request.

## License
This project is open-source and free to use under the [MIT License](LICENSE).

