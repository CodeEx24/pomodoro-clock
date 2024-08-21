import { useEffect, useState } from 'react';
import { DownArrow } from './assets/DownArrow';
import { UpArrow } from './assets/UpArrow';
import { Pause } from './assets/Pause';
import { Play } from './assets/Play';
import { Repeat } from './assets/Repeat';
import SocialLinks from './components/SocialLinks';
import { socialLinks } from './const/socialLinks';

function App() {
  const [start, setStart] = useState<boolean>(false);
  const [isSession, setIsSession] = useState<boolean>(true); // New state to track session/break mode

  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);

  const [timeRemaining, setTimeRemaining] = useState(sessionLength * 60);

  const beep = document.getElementById('beep') as HTMLAudioElement;

  useEffect(() => {
    let timerInterval = null;

    if (start) {
      timerInterval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 0) {
            // Switch between session and break mode
            if (isSession) {
              // Switch to break mode
              setIsSession(false);
              setTimeRemaining(breakLength * 60);
            } else {
              // Switch to session mode
              setIsSession(true);
              setTimeRemaining(sessionLength * 60);
            }
            // Optionally play a sound
            beep?.play();
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(timerInterval!);
    }

    // Cleanup the interval when the component unmounts or start changes
    return () => clearInterval(timerInterval!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, isSession, sessionLength, breakLength]); // Include all necessary dependencies

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // Format minutes and seconds to always show two digits
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  const handleToggleStart = () => {
    setStart((prevState) => !prevState);
  };

  const handleReset = () => {
    if (beep) {
      beep?.pause(); // Stop playback
      beep.currentTime = 0; // Reset playback position to the start
    }
    setIsSession(true); // Reset to session mode
    setSessionLength(25);
    setBreakLength(5);
    setTimeRemaining(sessionLength * 60);
    setStart(false);
  };

  const handleBreakAdjustment = (isAdd: boolean = true) => {
    if (isAdd) {
      setBreakLength((prevLength) => Math.min(prevLength + 1, 60));
    } else {
      setBreakLength((prevLength) => Math.max(prevLength - 1, 1));
    }
  };

  const handleSessionAdjustment = (isAdd: boolean = true) => {
    if (isAdd) {
      setSessionLength((prevLength) => Math.min(prevLength + 1, 60));
    } else {
      setSessionLength((prevLength) => Math.max(prevLength - 1, 1));
    }
  };

  useEffect(() => {
    if (!start || !isSession) {
      setTimeRemaining(breakLength * 60);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakLength]);

  useEffect(() => {
    if (start || isSession) {
      setTimeRemaining(sessionLength * 60);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionLength]);

  return (
    <div className="App bg-sky-300 h-screen w-full flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col justify-center items-center gap-4 bg-slate-100 border-2 border-black p-6 rounded-lg max-w-[95vw]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          25 + 5 Clock
        </h1>

        <div className="flex gap-8  ">
          <div
            id="break-label"
            className="flex flex-col items-center text-lg sm:text-2xl"
          >
            <p className="font-medium text-center">Break Length</p>
            <div className="flex gap-4">
              <button
                id="break-increment"
                onClick={() => handleBreakAdjustment()}
                disabled={start}
                className={`${start && 'opacity-70'}`}
              >
                <UpArrow />
              </button>
              <p id="break-length">{breakLength}</p>
              <button
                id="break-decrement"
                onClick={() => handleBreakAdjustment(false)}
                disabled={start}
                className={`${start && 'opacity-70'}`}
              >
                <DownArrow />
              </button>
            </div>
          </div>

          <div
            id="session-label"
            className="flex flex-col items-center text-lg sm:text-2xl"
          >
            <p className="font-medium text-center">Session Length</p>
            <div className="flex gap-4">
              <button
                id="session-increment"
                onClick={() => handleSessionAdjustment()}
                disabled={start}
                className={`${start && 'opacity-70'}`}
              >
                <UpArrow />
              </button>

              <p id="session-length">{sessionLength}</p>
              <button
                id="session-decrement"
                onClick={() => handleSessionAdjustment(false)}
                disabled={start}
                className={`${start && 'opacity-70'}`}
              >
                <DownArrow />
              </button>
            </div>
          </div>
        </div>

        <div
          id="timer-label"
          className={`border-4 border-green-700 w-full py-6 rounded-3xl `}
        >
          <h3 className="text-3xl text-center font-bold">
            {isSession ? 'Session' : 'Break'}
          </h3>
          <p
            id="time-left"
            className={`text-center text-5xl font-extrabold ${
              timeRemaining < 60 && 'text-red-700'
            }`}
          >
            {`${formattedMinutes}:${formattedSeconds}`}
          </p>
          <audio
            id="beep"
            preload="auto"
            src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
          ></audio>
        </div>

        <div className="flex gap-4">
          <button id="start_stop" onClick={handleToggleStart}>
            {start ? <Pause className="size-8" /> : <Play className="size-8" />}
          </button>
          <button id="reset" onClick={handleReset} className="p-0.5">
            <Repeat className="size-6" />
          </button>
        </div>
      </div>
      <SocialLinks links={socialLinks} />
    </div>
  );
}

export default App;
