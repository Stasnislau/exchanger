# Exchanger

This is a web service for calculating and converting currencies, having their most up-to-date conversion rates or user's custom ones. 

## Technologies used

- React
- TypeScript
- Tailwind
- C#
- .Net 8
- JWT tokens 

## Getting started
To get started with this project, you need to follow these steps: 

1. Clone the repository
```bash
git clone https://github.com/Stasnislau/exchanger.git
```

2. Environment Setup 
##### Server .env Configuration:
- CURRENCY_BEACON_API_KEY: Your API key for fetching real-time currency rates.
- SECRET_KEY
- REFRESH_SECRET_KEY
- DATABASE_URL
- CLIENT_URL
##### Client:
- VITE_API_URL

3. Install dependencies for the server
```bash
dotnet restore
```
4. Run the server:
```bash
dotnet run
```
5. Install dependencies for the client
```bash
cd client
npm install
```
6. Run the client
```bash
npm run dev
```

7. Open http://localhost:3000 with your browser to see the result.

## Features
- Real-time and custom currency conversion rates.
- User authentication and session management.
- Secure API access with JWT.
- Responsive and intuitive UI design.
- Saving Exchange Operations

## Preview 
You can see some screenshots of the application here:

![image](https://github.com/Stasnislau/exchanger/assets/56834401/ddc3cb00-24c8-4e64-aa6d-faedd1e89bef)
![image](https://github.com/Stasnislau/exchanger/assets/56834401/8a7996fd-580b-4831-a8f3-54c5feca8993)
![image](https://github.com/Stasnislau/exchanger/assets/56834401/e49db1de-cee1-491f-bfd7-2d459e1290c9)




