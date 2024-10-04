# LeetScraper - AI-Powered LeetCode Companion

LeetScraper is an AI-powered platform designed to enhance your LeetCode experience. This website acts as a journal, helper, and motivational tool for LeetCode users, with built-in features like code submission analysis, to-do lists, progress tracking, and code terminal support. It is designed to make practicing algorithm challenges smoother and more insightful, leveraging modern web development technologies and APIs.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [APIs Used](#apis-used)

## Project Overview
LeetScraper integrates the power of AI to help users practice coding problems from LeetCode while keeping track of their progress. Users can:
- Add LeetCode questions to their to-do list
- Receive AI feedback on their code submissions
- Track their progress with a rating system based on the number of completed questions
- Maintain personal notes for each LeetCode question
- View a detailed summary of each LeetCode problem, including hints, topics, and similar questions

## Technologies Used

### Frontend:
- **React** for building the interactive user interface
- **Tailwind CSS** for styling and responsiveness
- **Monaco Editor** for the code terminal integration
- **JWT (JSON Web Tokens)** for authentication

### Backend:
- **Django** as the main web framework
- **Django REST Framework** for building APIs
- **PostgreSQL** for the database
- **GPT-3.5-turbo** for analyzing code submissions and providing feedback

### Miscellaneous:
- **Vite** for the build tool in the frontend
- **Render** for backend deployment (currently not up because free tier can't handle server requests)
- **Netlify** for frontend deployment

## Features
- **AI Feedback on Code Submissions**: Users submit their code for LeetCode questions, and GPT-3.5 provides detailed feedback, identifying common mistakes and areas for improvement.
- **LeetCode Question Search**: Users can search for any LeetCode question, which is scraped for data and displayed on the platform.
- **To-Do List**: Users can add and manage a to-do list of LeetCode problems.
- **Notes on LeetCode Problems**: Users can add and manage personal notes for each problem.
- **Progress Tracker**: A rating system that assigns titles based on the number of completed questions, motivating users to continue improving.
- **Custom Code Terminal**: Integrated Monaco Editor where users can practice solving problems directly on the website.

## APIs Used

### LeetCode API:
The website scrapes data from LeetCode for each question, including the title, difficulty, hints, topics, and similar questions. This data is fetched and displayed on the problem detail page, allowing users to get insights before attempting the question.

### GPT-3.5-turbo:
Used for analyzing submitted code solutions. This API identifies errors and suggests improvements based on common mistakes in algorithms like lists, stacks, and recursion.

### AllAuth:
Django AllAuth is used for user authentication, allowing users to sign up and log in to track their to-do lists and code submissions.

### Custom LeetScraper API:
A custom-built RESTful API using Django REST Framework to handle adding/removing LeetCode questions from the to-do list, marking questions as complete, and handling CRUD operations for notes on individual problems.
