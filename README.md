# 🍽️ RecipeShare - A Recipe Sharing Platform

## 📌 About the Project
RecipeShare is a full-stack web application that allows users to explore, create, and share their favorite recipes. The platform provides authentication via Google and email/password, enabling users to manage their own recipes and interact with others.

## 🚀 Features

### 🔐 Authentication
- Google Authentication
- Email/Password Authentication (Normal Auth)
- Secure JWT-based session management

### 🍲 Recipe Management
- Users can **create, read, update, and delete (CRUD)** their own recipes
- Browse and explore recipes created by other users
- Recipe details include **title, ingredients, instructions, preparation time, and ratings**

### ⭐ Ratings & Comments
- Users can rate recipes using a **5-star rating system**
- Commenting system to engage with recipe creators and other users

### 🏗️ Responsive Design & Animations
- Fully responsive across **mobile, tablet, and desktop**
- **GSAP animations** for smooth UI transitions

### 🛠️ Tech Stack
#### Frontend
- **React.js** (with Hooks & Context API)
- **Tailwind CSS** for styling
- **GSAP** for animations

#### Backend
- **Node.js & Express.js** for server-side logic
- **MongoDB & Mongoose** for database management
- **JWT Authentication** for security

#### Deployment
- Frontend: **Vercel**
- Backend: **Railway**
- Database: **MongoDB Atlas**

## ⚡ Setup & Installation

### Clone the repository
```bash
git clone https://github.com/yourusername/recipeshare.git
cd recipeshare
```

### Install dependencies
```bash
npm install
```

### Set up environment variables
Create a `.env` file in the root directory and add:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Start the development server
```bash
npm run dev
```

## 🌍 Deployment
- Deploy frontend on **Vercel**
- Deploy backend on **Railway**

## 🎨 UI Screenshots
(Add screenshots here to showcase the app's UI)

## 🙌 Contributing
Contributions are welcome! Feel free to fork the repo, create a new branch, and submit a pull request.

## 📜 License
This project is licensed under the **MIT License**.

## ✨ Authors
- [Your Name](https://github.com/yourusername)  
- [Other Contributors]

Give this project a ⭐ if you like it! Happy coding! 🚀
