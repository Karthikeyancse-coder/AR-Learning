# 🚀 Redefining Education through Immersive Augmented Reality & AI

## 📜 Table of Contents
- [Overview](#-overview)
- [Tech Stack](#️-tech-stack)
- [Key Features](#-key-features)
- [Installation & Setup](#️-installation--setup)
- [Team Members](#-team-visionary)
- [Project Structure](#-project-structure)

## 📖 Overview
Learn.AR is an innovative learning platform designed to bridge the gap between abstract concepts and real-world understanding. By leveraging the power of Augmented Reality (AR) and Generative AI, we provide students with an interactive, hands-on experience in subjects like Biology and Chemistry.

Imagine visualizing a beating human heart in 3D right on your desk or witnessing complex chemical reactions in a safe, virtual environment—that's the power of Learn.AR.

## 🛠️ Tech Stack
**Frontend**
- **React 19**: Modern UI library for building dynamic interfaces.
- **Vite**: Ultra-fast build tool for modern web applications.
- **Tailwind CSS 4**: A utility-first CSS framework for rapid and high-performance styling.
- **Three.js & AR.js**: Powering the immersive augmented reality experiences.
- **Redux Toolkit**: State management for application-wide data flow.
- **React Router Dom**: Seamless navigation within the Single Page Application.

**Backend & AI**
- **Node.js & Express**: High-performance backend runtime and framework.
- **MongoDB & Mongoose**: Flexible NoSQL database for managing users and learning data.
- **Google Gemini AI**: Intelligent AI integration for personalized learning and querying.
- **Cloudinary**: Cloud storage for project assets and media.
- **JWT & Bcrypt**: Secure authentication and password hashing.

## ✨ Key Features
- **AR Visualization**: Explore 3D biological and chemical models using your device's camera.
- **AI Tutoring**: Ask Gemini-powered AI questions about any topic for instant, accurate explanations.
- **Interactive Labs**: Engage with virtual chemistry experiments and reactions.
- **Personalized Dashboard**: Track your learning progress through specific chapters and assessments.
- **Integrated Assessments**: Test your knowledge with chapter-wise quizzes and feedback.

## ⚙️ Installation & Setup
Clone the repository:

```bash
git clone https://github.com/stha-sanket/TechSprint_visionary.git
cd TechSprint_visionary
```

**Server Setup:**
```bash
cd server
npm install
# Create a .env file and add your MongoDB_URI, GEMINI_API_KEY, and PORT
npm start
```

**Client Setup:**
```bash
cd ../client
npm install
npm run dev
```

## 👥 Team Visionary
- Sanket Shrestha
- Prashant Adhikari
- Smriti Basnet
- Priyanka Khatri

## 📁 Project Structure
```text
├── client                # React frontend with Vite & Tailwind
│   ├── src
│   │   ├── components    # UI Components (Auth, Dashboard, etc.)
│   │   ├── redux         # State management
│   │   └── assets        # Images and styles
├── server                # Node.js & Express backend
│   ├── controllers       # AI and Business logic
│   ├── models            # MongoDB schemas
│   └── routes            # API endpoints
└── README.md             # Project documentation
```
