import { createContext, useEffect, useState } from "react";
import Auth from "./Custom_Components/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/globals.css";
import { Login } from "./Custom_Components/Login";
import { auth } from "./config/firebase";
import Home from "./Custom_Components/Home";
import Sidebar from "./Custom_Components/SideBar";
import Quizzes from "./Pages/Quizzes";
import Students from "./Pages/Students";
import QuestionList from "./Custom_Components/QuestionList";
import Exam from "./Pages/Exam";
import ScreenCaptureComponent from "./Custom_Components/ScreenCaptureComponent";


export const AppContext = createContext();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Lyon", "Marseille", "Toulouse"],
      answer: "Paris",
    },
    {
      question: "What is the capital of Spain?",
      options: ["Madrid", "Barcelona", "Valencia", "Seville"],
      answer: "Madrid",
    },
    {
      question: "What is the capital of Germany?",
      options: ["Berlin", "Hamburg", "Munich", "Cologne"],
      answer: "Berlin",
    },
    {
      question: "What is the capital of Italy?",
      options: ["Rome", "Milan", "Naples", "Turin"],
      answer: "Rome",
    },
  ];

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      <div className="flex h-screen">
        <Router>
          <div className="flex flex-col lg:flex-row w-full min-h-screen">
            {window.location.pathname !== "/exams" && <Sidebar />}
            <div className="flex-1 p-6 bg-gray-100 overflow-auto">
              <Routes>
                <Route path="/dashboard" element={<Home user={{ type: "student" }} />} />
                <Route path="/quizzes" element={<Quizzes user={{ type: "teacher" }} />} />
                <Route path="/students" element={<Students user={{ type: "teacher" }} />} />
                <Route path="/register" element={<Auth />} />
                <Route path="/login" element={<Login />} />
                <Route path="/exams" element={<Exam questions={questions} />} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </AppContext.Provider>
  );
}
