import { BrowserRouter, Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import { database } from "./firebase";
import { ref, onValue, set, push } from "firebase/database";

import NavBar from "./components/NavBar.jsx";
import PlanPage from "./pages/PlanPage.jsx";
import NutritionForm from "./components/NutritionForm.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";
import LogPage from "./pages/LogPage.jsx";
import Dashboard from "./pages/DashboardPage.jsx";
import NotFoundPage from './pages/NotFoundPage.jsx';
import PostDetailPage from './pages/PostDetailPage.jsx';

const initialChatData = [
  { 
    id: 1, 
    sender: "Larissa", 
    text: "Hello everyone! How is your week going?", 
    type: "received" 
  },
  { 
    id: 2, 
    sender: "You", 
    text: "Hi Larissa! It's going well, just finished a great workout session. Check out this shot from my training! How about you?", 
    type: "sent",
    img: "/img/personal training.jpg",
    alt: "A photo from personal training session"
  },
  { 
    id: 3, 
    sender: "Rain", 
    text: "Hi everyone! I just started a new workout routine and it's going really well so far.", 
    type: "received" 
  }
];

export default function App() {
  const [messages, setMessages] = useState(initialChatData);
  useEffect(function() {
  const chatsRef = ref(database, "chats");

  onValue(chatsRef, function(snapshot) {
    const data = snapshot.val();
    if (data) {
      const chatArray = Object.keys(data).map(function(key) {
        const singleChat = { ...data[key] };
        singleChat.id = key;
        return singleChat;
      });
      setMessages(chatArray);
    } else {
      setMessages(initialChatData);
    }
  });
}, []);

function handleSendMessageToDB(newMsgContent) {
  const chatsRef = ref(database, "chats");
  const newChatRef = push(chatsRef); 
  set(newChatRef, newMsgContent); 
}

  const [selectedGoal, setSelectedGoal] = useState("muscleGain");
  useEffect(function() {
    const goalRef = ref(database, "userSettings/selectedGoal");

    onValue(goalRef, function(snapshot) {
      const data = snapshot.val();
      if (data) {
        setSelectedGoal(data);
      }
    });
  }, []);

 function handleGoalChangeInDB(goalKey) {
    const goalRef = ref(database, "userSettings/selectedGoal");
    set(goalRef, goalKey);
  }

  const [logs, setLogs] = useState([]);
  useEffect(function() {
    const logsRef = ref(database, "logs");
 
    onValue(logsRef, function(snapshot) {
      const data = snapshot.val();
 
      if (data) {
        const logKeys = Object.keys(data);
        const logArray = logKeys.map(function(key) {
          const singleLogCopy = { ...data[key] };
          singleLogCopy.key = key;
          return singleLogCopy;
        });
        setLogs(logArray);
      } else {
        setLogs([]);
      }
    });
  }, []);
 

  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/log" element={<LogPage />} />
          <Route path="/plan" element={<PlanPage selectedGoal={selectedGoal} setSelectedGoal={handleGoalChangeInDB} />} />
          <Route path="/nutrition" element={<NutritionForm />} />
          <Route path="/community" element={<CommunityPage messages={messages} setMessages={handleSendMessageToDB} selectedGoal={selectedGoal} logs={logs}/>} />
          <Route path="/community/:id" element={<PostDetailPage messages={messages} />} />  

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <footer>
          <p>&copy; 2026 FitHea Team. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="mailto:support@fithea.uw.edu">Contact</a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
