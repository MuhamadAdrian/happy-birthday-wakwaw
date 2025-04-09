import React, { useState, useRef, useEffect } from "react";
import backgroundMusic from "./assets/music/happy-birthday.mp3";
import {
  Gift,
  Stars,
  SettingsIcon as Confetti,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const quotes = [
  "May your day be as bright as your smile and as lovely as you. Happy Birthday! 🌟",
  "Another year of amazing you! Wishing you endless joy and laughter. 🎈",
  "Here's to another year of amazing adventures and beautiful moments. 🌈",
  "May this special day bring you all the happiness your heart can hold! 💝",
  "You're not getting older, you're getting more amazing! 🎊",
];

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const birthdayPersonName =
    import.meta.env.VITE_BIRTHDAY_PERSON_NAME || "Friend";

  const handleClick = () => {
    if (!isOpened) {
      setIsOpened(true);
      setTimeout(() => setShowMessage(true), 500);
      // Play music when gift is opened
      if (audioRef.current) {
        audioRef.current
          .play()
          .catch((error) => console.log("Audio playback failed:", error));
      }
    }
  };

  const handleNextQuote = () => {
    if (currentQuote < quotes.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuote((prev) => prev + 1);
        setIsTransitioning(false);
      }, 300);
    } else if (isOpened) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuote(0);
        setShowMessage(false);
        setIsOpened(false);
        setIsTransitioning(false);
        // Stop music when returning to initial state
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }, 300);
    }
  };

  const handlePrevQuote = () => {
    if (currentQuote > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuote((prev) => prev - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  useEffect(() => {
    document.title =
      "Happy Birthday " + import.meta.env.VITE_BIRTHDAY_PERSON_NAME + "🌟";
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
        <audio
          ref={audioRef}
          src={backgroundMusic}
          loop
          preload="auto"
          className="hidden"
        />
        <div
          className={`relative ${
            isOpened ? "transform -translate-y-[100%]" : ""
          }`}
        >
          {/* Floating stars animation */}
          <div className="absolute -inset-10 flex items-center justify-center">
            {isOpened &&
              Array.from({ length: 12 }).map((_, i) => (
                <Stars
                  key={i}
                  className={`absolute text-yellow-400 animate-[float_${
                    2 + (i % 3)
                  }s_ease-in-out_infinite] opacity-${50 + i * 10}`}
                  style={{
                    transform: `rotate(${i * 30}deg) translateY(${
                      50 + i * 10
                    }px)`,
                    animation: `float ${2 + (i % 3)}s ease-in-out infinite`,
                  }}
                />
              ))}
          </div>

          {/* Gift box */}
          <div
            onClick={handleClick}
            className={`cursor-pointer transform transition-all duration-500 hover:scale-105 ${
              isOpened ? "scale-110 animate-bounce" : ""
            }`}
          >
            <div className="relative">
              <Gift
                size={120}
                className={`text-pink-500 transition-all duration-500 ${
                  isOpened ? "opacity-0 scale-150" : "animate-pulse"
                }`}
              />
              {isOpened && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Confetti size={120} className="text-pink-500 animate-spin" />
                </div>
              )}
            </div>
          </div>

          {/* Birthday message and quotes */}
          <div
            className={`absolute top-32 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
              showMessage ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          >
            <div className="relative">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-pink-600 animate-bounce">
                  Happy Birthday! 🎉
                </h1>
                <div className="mt-2 relative">
                  <h2 className="text-2xl font-serif italic text-purple-600 animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 inline-block text-transparent bg-clip-text">
                    {birthdayPersonName}
                  </h2>
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg blur opacity-20 animate-pulse"></div>
                </div>
              </div>

              {/* Quotes carousel */}
              <div className="relative w-[300px] min-h-[120px] bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <p
                  className={`text-lg text-purple-600 text-center transition-all duration-300 ${
                    isTransitioning
                      ? "opacity-0 transform scale-95"
                      : "opacity-100 transform scale-100"
                  }`}
                >
                  {quotes[currentQuote]}
                </p>

                {/* Navigation buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handlePrevQuote}
                    className={`p-2 text-pink-500 rounded-full hover:bg-pink-100 transition-all ${
                      currentQuote === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={currentQuote === 0}
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextQuote}
                    className="p-2 text-pink-500 rounded-full hover:bg-pink-100 transition-all"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>

                {/* Page indicator */}
                <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
                  {quotes.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentQuote === index
                          ? "bg-pink-500 w-4"
                          : "bg-pink-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
