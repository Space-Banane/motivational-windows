import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [motivationMsg, setMotivationMsg] = useState<string>("");
  const [isInCoolDown, setIsInCoolDown] = useState<boolean>(false);
  const [BillyBadassMode, setBillyBadassMode] = useState<boolean>(false);
  const [CooldownTimeLeft, setCooldownTimeLeft] = useState<number>(0);

  // Billy Badass confirmation states
  const [confirmStep, setConfirmStep] = useState<number>(0);
  const [enteredPin, setEnteredPin] = useState<string>("");

  // Visitor Shit
  const [currentVisitorNumber, setCurrentVisitorNumber] = useState<number>(
    Math.floor(Math.random() * 900000) + 100000 // start somewhere fake
  );
  const [specialMsg, setSpecialMsg] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      // increment but with some chaos
      setCurrentVisitorNumber(
        (prev) => prev + Math.floor(Math.random() * 50) + 1
      );

      // sometimes show funny scam-style messages
      if (Math.random() < 0.05) {
        const msgs = [
          "🎉 YOU ARE THE 1,000,000th VISITOR! CLICK HERE TO CLAIM YOUR PRIZE 🎉",
          "🚨 FBI WARNING: TOO MUCH MOTIVATION DETECTED 🚨",
          "💰 Congrats! You just won a free ringtone pack 💰",
          "🔥 HOT SINGLES IN YOUR AREA WANT TO MOTIVATE YOU 🔥",
          "🖥️ Best viewed in 800x600 resolution 🖥️",
        ];
        setSpecialMsg(msgs[Math.floor(Math.random() * msgs.length)]);
        setTimeout(() => setSpecialMsg(""), 5000); // clear after 5s
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = motivationMsg
      ? `💾 ${motivationMsg} 💾`
      : "🌟 MOTIVATIONAL WINDOWS 95 🪟";
  }, [motivationMsg]);

  const SECRET_PIN = "1337";

  async function getmotivation() {
    if (isInCoolDown) return;
    setIsInCoolDown(true);
    setMotivationMsg(await invoke("motivation", { evil: BillyBadassMode }));
    setCooldownTimeLeft(2000);
    const cooldownInterval = setInterval(() => {
      setCooldownTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(cooldownInterval);
          setIsInCoolDown(false);
          return 0;
        }
        return prev - 500;
      });
    }, 500);
  }

  const handleBillyBadassToggle = () => {
    if (BillyBadassMode) {
      setBillyBadassMode(false);
      setConfirmStep(0);
      setEnteredPin("");
    } else {
      setConfirmStep(1);
    }
  };

  const handleConfirmStep = () => {
    if (confirmStep === 1) {
      setConfirmStep(2);
    } else if (confirmStep === 2) {
      setConfirmStep(3);
    } else if (confirmStep === 3) {
      if (enteredPin === SECRET_PIN) {
        setBillyBadassMode(true);
        setConfirmStep(0);
        setEnteredPin("");
      } else {
        alert("🚫 WRONG PIN, NOOB! 🚫");
        setEnteredPin("");
      }
    }
  };

  const handleCancel = () => {
    setConfirmStep(0);
    setEnteredPin("");
  };

  const getConfirmationContent = () => {
    switch (confirmStep) {
      case 1:
        return (
          <div className="confirmation-modal">
            <div className="modal-content">
              <h3 className="warning-text">⚠️ WARNING ⚠️</h3>
              <p>You are about to enter BILLY BADASS MODE!</p>
              <p>This will make the motivation EXTREMELY HARDCORE!</p>
              <div className="modal-buttons">
                <button onClick={handleConfirmStep} className="proceed-btn">
                  💀 I'M READY 💀
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  😰 NEVERMIND 😰
                </button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="confirmation-modal">
            <div className="modal-content">
              <h3 className="warning-text">🔥 FINAL WARNING 🔥</h3>
              <p>Are you ABSOLUTELY SURE you can handle the INTENSITY?</p>
              <p>There's no going back from this level of BADASSERY!</p>
              <div className="flashing-skulls">💀💀💀💀💀</div>
              <div className="modal-buttons">
                <button onClick={handleConfirmStep} className="proceed-btn">
                  🚀 BRING IT ON! 🚀
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  🏃‍♂️ RUN AWAY! 🏃‍♂️
                </button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="confirmation-modal">
            <div className="modal-content">
              <h3 className="warning-text">🔐 ENTER SECRET PIN 🔐</h3>
              <p>Prove you're worthy of BILLY BADASS MODE!</p>
              <p>Check the post-it note for the secret code! 📝</p>
              <input
                type="password"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                placeholder="Enter PIN..."
                className="pin-input"
                maxLength={4}
              />
              <div className="modal-buttons">
                <button onClick={handleConfirmStep} className="proceed-btn">
                  🗝️ UNLOCK 🗝️
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  ❌ CANCEL ❌
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="container">
      <h1>🌟 MOTIVATIONAL WINDOWS 95 🪟</h1>

      <div className="under-construction">
        <img
          src="https://media.tenor.com/T4pA78DOrcgAAAAi/oldweb-friendship.gif"
          alt="under construction"
        />
      </div>

      <h2 className="blink rainbow-text">{motivationMsg}</h2>

      <div className="button-area">
        <button
          onClick={getmotivation}
          disabled={isInCoolDown}
          className="main-button"
        >
          <span>💾 GET MOTIVATION 💾</span>
        </button>
        {isInCoolDown && (
          <p>
            🥵🥵🥵🥵 CALMING DOWN🥵🥵🥵🥵 PLEASE WAIT {CooldownTimeLeft / 1000}s
          </p>
        )}
      </div>

      <div className="checkbox">
        <input
          type="checkbox"
          id="BillyBadassMode"
          checked={BillyBadassMode}
          onChange={handleBillyBadassToggle}
        />
        <label htmlFor="BillyBadassMode">
          🔥 Enable Billy Badass Mode 🔥
          {BillyBadassMode && <span className="activated">✅ ACTIVATED</span>}
        </label>
      </div>

      <div className="post-it-note">
        <div className="post-it-content">
          <div className="post-it-header">📝 SECRET CODE:</div>
          <div className="post-it-pin">1337</div>
          <div className="post-it-footer">-Management</div>
          <div className="post-it-dns">DO NOT HANG ON MONITOR</div>
        </div>
      </div>

      <div className="visitor-counter">
        👀 You are visitor #{currentVisitorNumber.toLocaleString()}!
        {specialMsg && (
          <div className="special-visitor-msg blink rainbow-text">
            {specialMsg}
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="sliding-container">
          <div className="sliding-text">
            💫 WELCOME TO THE MOST RADICAL MOTIVATION STATION ON THE INFORMATION
            SUPERHIGHWAY! 💫 🌐 BEST VIEWED IN NETSCAPE NAVIGATOR 🌐 ⭐ DON'T
            FORGET TO SIGN MY GUESTBOOK! ⭐ 🧑‍🦳 MY NAME IS WALTER HARTWELL WHITE.
            I LIVE AT 308 NEGRA ARROYO LANE, ALBUQUERQUE, NEW MEXICO, 87104.
            THIS IS MY CONFESSION.🧑‍🦳
          </div>
        </div>
      </footer>

      {getConfirmationContent()}
    </main>
  );
}

export default App;
