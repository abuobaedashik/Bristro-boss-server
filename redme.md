
# Bistro Boss Server

Project Overview

Bistro Boss Server is the backend of the Bistro Boss application, built using Node.js, Express.js, and MongoDB. This server handles user authentication, menu management, cart functionalities, payment processing, and admin-related operations.




## Technologies Used

- Node.js

- Express.js

- MongoDB (with Mongoose)

- JWT (JSON Web Token) Authentication

- Stripe Payment Integration

- dotenv for Environment Variables

- CORS for Cross-Origin Requests Handling




## Installation and Setup

 


## Deployment

###  1. Clone the Repository

```bash
 git clone https://github.com/your-repo/bistro-boss-server.git
cd bistro-boss-server
```
###  2. Install Dependencies

```bash
npm install
```
###  3. Create a .env File

Create a .env file in the root directory and add the following environment variables:

```bash
PORT=5000
DB_USER=BristroBoss
DB_PASSWORD=ToSVPFeWHLLHl1s6
ACCESS_TOKEN_SECRET=db6ac01eb6ffd79a429853632ad7ee55e6c24fe2f2f64e5a2ff96d375f7cea9bcbd74938bd8095d2a46d3fb487169667f8d5775798080b6d57f4d059f6b95d5a
STRIPE_SECRET_KEY=sk_test_51QtEzsR5lUV9DDs0GTuWpfmJPsVoJV9Ev5zl9Rm3Ywttj8BUbf3xrTJwe2bKDwwHa4OxHEGHX4OZZEcq5YWO1rlp00UQIAWqDe
```

###  3. Start the Server


```bash
 npm start
```

The server will run on http://localhost:5000/






