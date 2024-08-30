import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ironman from "./assets/ironman.gif";
import audiospectrum from "./assets/audiospectrum.gif";
import { CiMicrophoneOn } from "react-icons/ci";

function Hero() {
  const [text, setText] = useState("Click Here To Start Listening");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [name, setName] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(text_speak);
  }

  function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
      setWelcomeMessage(
        `Hello, Good Morning ${name ? name : "master"} How May I Help You`
      );
    } else if (hour >= 12 && hour < 16) {
      setWelcomeMessage(
        `Hello, Good Afternoon ${name ? name : "master"} How May I Help You`
      );
    } else if (hour >= 16 && hour <= 19) {
      setWelcomeMessage(
        `Hello, Good evening ${name ? name : "master"} How May I Help You`
      );
    } else {
      setWelcomeMessage(
        `Hello, Good night ${name ? name : "master"} How May I Help You`
      );
    }
  }

  useEffect(() => {
    wishMe();
  }, [name]);

  const handleCommand = (message) => {
    if (
      message.includes("hello") ||
      message.includes("hai") ||
      message.includes("hi") ||
      message.includes("hey") ||
      message.includes("jarvis")
    ) {
      speak(welcomeMessage);
    } else if (message.includes("open google")) {
      window.open("https://google.com", "_blank");
      speak("Opening Google ");
    } else if (message.includes("open youtube")) {
      window.open("https://youtube.com", "_blank");
      speak("Opening YouTube");
    } else if (message.includes("open facebook")) {
      window.open("https://facebook.com", "_blank");
      speak("Opening Facebook ");
    } else if (message.includes("open instagram")) {
      window.open("https://www.instagram.com/", "_blank");
      speak("Opening instagram ");
    } else if (message.includes("open chat gpt")) {
      window.open("https://chatgpt.com/", "_blank");
      speak("Opening chat gpt");
    } else if (message.includes("open gemini")) {
      window.open("https://gemini.google.com/", "_blank");
      speak("Opening gemini");
    } else if (message.includes("open vs code")) {
      window.open("https://vscode.dev/", "_blank");
      speak("Opening vscode ");
    } else if (message.includes("open linkedin")) {
      window.open("https://www.linkedin.com/feed/", "_blank");
      speak("Opening linkedin ");
    } else if (message.includes("open calculator")) {
      window.open("Calculator:///");
      speak("Opening Calculator ");
    } else if (message.includes("open whatsapp")) {
      window.open("https://wa.me/6382381862");
      speak("Opening whatsapp ");
    } else if (
      message.includes("open mail") ||
      message.includes("open gmail")
    ) {
      window.open("mailto:someone@example.com");
      speak("Opening gmail ");
    } 
    else if (message.includes("battery percentage") || message.includes("battery level")) {
      navigator.getBattery().then(function (battery) {
        speak(`Battery level: ${(battery.level * 100).toFixed(0)} %`);
      });
    } else if (message.includes("time")) {
      const time = new Date().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
      speak(time);
    } else if (message.includes("date")) {
      const date = new Date().toLocaleString(undefined, {
        month: "long",
        day: "numeric",
      });
      speak(date);
    } else if (message.includes("month")) {
      const month = new Date().toLocaleString(undefined, {
        month: "long",
      });
      speak(month);
    } else if (message.includes("today")) {
      const day = new Date().toLocaleString(undefined, {
        weekday: "long",
      });
      speak(day);
    }  
    else {
      window.open(`https://www.google.com/search?q=${message}`, "_blank");
      speak(`I found some information for ${message} on Google`);
    }
  };

  const startListening = () => {
    setButtonClicked(true);

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript;
      handleCommand(transcript.toLowerCase());
    };

    recognition.onstart = () => {
      setIsListening(true);
      setText("Listening...");
    };

    recognition.onend = () => {
      setIsListening(false);
      setText("Click Here To Start Listening");
    };

    recognition.start();
  };

  return (
    <main className="h-screen w-screen text-white">
      <motion.div
        className="w-full h-full bg-black flex flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.p
          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 2, delay: 1 }}
        >
          JARVISXX AI <span className="text-slate-400">voice assistant</span>
        </motion.p>

        <motion.img
          src={ironman}
          className="md:h-[500px] h-[400px] mx-auto object-cover"
          alt="Loading animation"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />

        {isListening && (
          <motion.img
            src={audiospectrum}
            className="w-52 h-10 object-cover mb-5"
            alt="Audio Spectrum"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}

        <motion.div
          className="flex flex-col md:flex-row items-center gap-6 pb-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          {!buttonClicked && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Your Name"
              className={`p-3 h-14 outline-none border-none bg-gray-900 rounded-full ${
                isListening ? "" : "md:mt-14"
              }`}
            />
          )}

          <button
            className={`text-white bg-slate-600 bg-gradient-to-r from-red-600 to-violet-600  p-3 rounded-full ${
              isListening ? "" : "md:mt-14 "
            }`}
            onClick={startListening}
          >
            <div className="flex items-center justify-around">
              <CiMicrophoneOn className="h-7 w-10" />
              <p>{text}</p>
            </div>
          </button>
        </motion.div>
      </motion.div>
    </main>
  );
}

export default Hero;
