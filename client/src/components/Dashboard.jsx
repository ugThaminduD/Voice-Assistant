import { useState } from "react";

import './Dashboard.css';


const Dashboard = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [history, setHistory] = useState([]); 

  const startVoiceRecognition = () => {

    setTranscript(""); 


    // Check if browser supports SpeechRecognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false; // Stops after speaking
    recognition.interimResults = false; // Returns final results

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setTranscript(voiceText);
      // console.log("Recognized:", voiceText);
      setIsListening(false);

      // Execute Task Based on Voice Command
      const response = processCommand(voiceText);
      setHistory((prev) => [...prev, { command: voiceText, response }]);

    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const processCommand = (command) => {
    const lowerCaseCommand = command.toLowerCase();
  
    if (lowerCaseCommand.includes("open google")) {
      window.open("https://www.google.com", "_blank");
      return ("opened google.com");
  
    } else if (lowerCaseCommand.includes("show date")) {
      alert(`Today's Date: ${new Date().toLocaleDateString()}`);
      return (`Today's Date: ${new Date().toLocaleDateString()}`);
  
    } else if (lowerCaseCommand.includes("show time")) {
      alert(`Current Time: ${new Date().toLocaleTimeString()}`);
      return (`Current Time: ${new Date().toLocaleTimeString()}`);
  
    } else if (lowerCaseCommand.includes("date and time")) {
      const dateTime = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
      alert(`Current Date & Time: ${dateTime}`);
      return `Current Date & Time: ${dateTime}`;
  
    } else if (lowerCaseCommand.includes("open profile")) {
      alert("Opening Profile...");
      window.location.href = "/profile";
  
    } else if (lowerCaseCommand.includes("logout")) {
      alert("Logging out...");
      window.location.href = "/logout";
  
    } else if (lowerCaseCommand.includes("dark mode")) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
      return ("Dark Mode Activated");
  
    } else if (lowerCaseCommand.includes("clear history")) {
      setHistory([]); // Clear history array
      alert("Command history cleared!");
      return ("Command history cleared!");
      
    } else {
      //  Replies for Unrecognized Inputs
      const replies = [
        "Hello!",
        "Good morning!",
        "How can I assist you?",
        "Nice to hear from you!",
        "Hope you're having a great day!",
        "I'm listening. What do you need?"
      ];

      //  random reply
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      return randomReply;
    }
  }

  


  return (
    <>
      <div>
        <h2 style={{ color: "white" }}>Welcome to the Dashboard</h2>
        <p>You have successfully logged in!</p>
      </div>
      <div>
        <button onClick={startVoiceRecognition} disabled={isListening}>
          {isListening ? "Listening..." : "Start Voice"}
        </button>
        {transcript && <p>Recognized Voice: {transcript}</p>}
      </div>
      <div>
        <h3>Previous Commands:</h3>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              <strong>Command:</strong> {entry.command} <br />
              <strong>Reply:</strong> {entry.response}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
