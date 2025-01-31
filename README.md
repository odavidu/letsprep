# Let's Prep

*A smart, AI-powered platform for generating and evaluating practice problems.*

📽️ **Demo Video**

[![Watch the video](https://img.youtube.com/vi/UuUDdD4tTf4/0.jpg)](https://youtu.be/UuUDdD4tTf4) 

---

## 🚀 Overview
Let'sPrep is a **React Remix**-based educational platform that helps users practice problem-solving in various subjects by leveraging **OpenAI** for automatic problem generation and evaluation.  
Users can enter a topic or a specific problem, and the system generates **short answer, multiple choice, true/false, and long answer** questions, while also providing AI-driven grading and step-by-step explanations.

## 🛠️ Tech Stack

### **Frontend**
- **React Remix** – Server-side rendering & optimized routing
- **Tailwind CSS** – Responsive UI styling
- **KaTeX** – LaTeX rendering for mathematical expressions

### **Backend**
- **Golang** – High-performance REST API
- **Fiber** – Fast Golang web framework
- **MongoDB** – NoSQL database for storing user data and generated problems

### **AI & API Integration**
- **OpenAI API** – For generating problems, grading responses, and providing explanations
- **RESTful API** – Clean architecture for interacting with the frontend

---

## ⚙️ How It Works

### **1️⃣ Generating Problems**
Users enter a topic or an example problem (e.g., `"Solve for x in 2x + 3 = 7"`).  
The backend uses **OpenAI** to generate various problem types:
- **Short Answer**: Users input a text response, and AI grades it.
- **Multiple Choice**: AI provides options and evaluates the selection.
- **True/False**: Users select an answer, and AI verifies correctness.
- **Long Answer**: AI grades the user’s response and provides detailed feedback.

### **2️⃣ Evaluating Responses**
The system sends user-submitted answers to OpenAI for **grading and explanation generation**. AI provides:
- **Numerical grade (0-100)**
- **Step-by-step solution breakdown**
- **Feedback on mistakes**

### **3️⃣ Storing & Tracking Progress (Upcoming Feature)**
- Users will be able to create accounts and track progress over time.
- MongoDB will store user history and allow revisiting past problems.
