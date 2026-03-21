# AR-Learn: Augmented Reality Learning Platform

AR-Learn is a state-of-the-art, hyper-immersive educational platform that bridges the gap between theoretical science and practical application. By leveraging Augmented Reality (AR) and Artificial Intelligence (AI), AR-Learn provides dynamic, interactive, and holistic learning experiences for students exploring disciplines like Chemistry, Biology, and Physics.

## How It Works

AR-Learn combines a robust React frontend with a scalable Node/Python backend to deliver seamless educational content. Here is a breakdown of how the platform operates:

1. **User Authentication & Profiles**
   - Students register and log into their personalized AR-Learn accounts.
   - The platform tracks their academic streaks, completed courses, and attendance rates over time.
   - Users can manage robust security features, including Two-Factor Authentication (2FA) and active session management.

2. **Course Enrollment & Discovery**
   - Through the dashboard, users can browse and enroll in various immersive science modules (e.g., *Quantum Biology*, *Molecular Bonds*, *Human Anatomy*).
   - Each course uses interactive frontend visualizations to simulate AR/haptic interactions, allowing users to "touch" and manipulate molecular structures or anatomic models directly from their devices.

3. **Interactive Assessments & Real-Time Challenges**
   - Courses include progressive challenges (e.g., balancing inorganic chemistry equations, identifying cellular mechanics).
   - As users progress, the platform uses gamified elements like XP, badges, and streaks to encourage continuous learning.

4. **AI-Powered Performance Prediction**
   - The backend features an intelligent Machine Learning service (`predict.py`) that analyzes student performance metrics (such as study time, past failures, absences, and previous grades).
   - Using Random Forest and Decision Tree models, AR-Learn predicts future academic outcomes and automatically provides personalized recommendations and AI-tutoring interventions to help users succeed before they fall behind.

5. **Self-Study & Revision Hub**
   - A dedicated self-study section allows students to review past materials, interact with AI tutors, and revisit challenging interactive labs at their own pace.

## Key Features

- **Hyper-Immersive AR Visuals**: Engaging UI elements mimicking holographic and real-touch learning environments.
- **Dynamic Dashboard**: Centralized hub tracing academic progress, module engagement, and recent platform activity.
- **Predictive Analytics**: Early-warning AI predicting final outcomes based on continuous learning patterns.
- **Comprehensive Privacy Controls**: Granular user privacy settings for profile visibility, academic recommendations, and data retention.
- **Responsive & Accessible Design**: Beautifully styled with Tailwind CSS, supporting full dark/light mode optimization.

## Tech Stack Overview

- **Frontend**: React, Vite, TypeScript, TailwindCSS, Redux Toolkit
- **Backend / API**: Node.js, Express (Routing & Authentication)
- **Machine Learning Layer**: Python, Scikit-Learn (`joblib` / `pickle`), Random Forest Classifier

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+ (for AI prediction features)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Karthikeyancse-coder/AR-Learning.git
   cd AR-Learning
   ```

2. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Backend Setup** (Optional for local API testing)
   ```bash
   cd server
   npm install
   npm run dev
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
