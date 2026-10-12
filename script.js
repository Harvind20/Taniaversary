// ========================================================
// 💕 TANIAVERSARY - ROMANTIC POSTCARD ENGINE & ANIMATIONS
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  // Apply configuration from config.js
  applyConfig();

  // Initialize all subsystems
  initAudioSystem();
  initPetalsCanvas();
  initPasscodeEngine();
  initEnvelopeEngine();
  initLetterEngine();
  initFullscreenToggle();
});

// --------------------------------------------------------
// 1. APPLY USER CONFIGURATION TO DOM
// --------------------------------------------------------
function applyConfig() {
  if (typeof CONFIG === "undefined") return;

  if (CONFIG.hint) document.getElementById("pinHint").textContent = CONFIG.hint;
  if (CONFIG.grantedTitle) document.getElementById("grantedTitle").textContent = CONFIG.grantedTitle;
  if (CONFIG.grantedMessage) document.getElementById("grantedMessage").textContent = CONFIG.grantedMessage;
  if (CONFIG.grantedButton) document.getElementById("btnProceed").textContent = CONFIG.grantedButton;
  if (CONFIG.envelopeTitle) document.getElementById("envelopeTitle").textContent = CONFIG.envelopeTitle;
  if (CONFIG.envelopeHint) document.getElementById("sealPromptText").textContent = CONFIG.envelopeHint;

  if (CONFIG.postcardTitle) {
    document.getElementById("postcardTitle").innerHTML = CONFIG.postcardTitle.replace(/\n/g, "<br>");
  }
  if (CONFIG.postcardSubtitle) {
    document.getElementById("postcardSubtitle").textContent = CONFIG.postcardSubtitle;
  }
  if (CONFIG.letterHeader) {
    document.getElementById("letterHeader").textContent = CONFIG.letterHeader;
  }

  if (CONFIG.song) {
    if (CONFIG.song.title) document.getElementById("songTitle").textContent = CONFIG.song.title;
    if (CONFIG.song.artist) document.getElementById("songArtist").textContent = CONFIG.song.artist;
  }

  if (CONFIG.memoriesTitle) {
    const el = document.getElementById("memoriesTitle");
    if (el) el.textContent = CONFIG.memoriesTitle;
  }
  if (CONFIG.memoriesSubtitle) {
    const el = document.getElementById("memoriesSubtitle");
    if (el) el.textContent = CONFIG.memoriesSubtitle;
  }
}

// --------------------------------------------------------
// 2. AUDIO & SYNTHESIZER SYSTEM
// --------------------------------------------------------
let audioCtx = null;
let bgAudio = null;
let isAudioPlaying = false;
let isMuted = false;
let synthTimer = null;

function initAudioSystem() {
  bgAudio = document.getElementById("bgAudio");
  const playPauseBtn = document.getElementById("btnPlayPause");
  const playPauseIcon = document.getElementById("playPauseIcon");
  const vinylDisc = document.getElementById("vinylDisc");
  const equalizerBars = document.getElementById("equalizerBars");
  const soundToggleBtn = document.getElementById("soundToggleBtn");
  const soundIcon = document.getElementById("soundIcon");

  // Attempt to set custom audio source if available
  if (CONFIG.song && CONFIG.song.src) {
    bgAudio.src = CONFIG.song.src;
  }

  // Play / Pause toggle
  playPauseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMusicPlayback();
  });

  // Header sound toggle
  soundToggleBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    if (bgAudio) bgAudio.muted = isMuted;
    soundIcon.textContent = isMuted ? "🔇" : "🔊";
  });

  // Handle HTML5 audio events
  bgAudio.addEventListener("play", () => {
    isAudioPlaying = true;
    playPauseIcon.textContent = "❚❚";
    vinylDisc.classList.add("spinning");
    equalizerBars.classList.add("playing");
    soundIcon.textContent = "🔊";
  });

  bgAudio.addEventListener("pause", () => {
    isAudioPlaying = false;
    playPauseIcon.textContent = "▶";
    vinylDisc.classList.remove("spinning");
    equalizerBars.classList.remove("playing");
  });

  bgAudio.addEventListener("error", () => {
    console.log("Custom MP3 not found. Switching to built-in romantic music-box synth fallback!");
  });
}

// Toggle playback between MP3 or built-in Romantic Synthesizer
function toggleMusicPlayback() {
  ensureAudioContext();

  if (isAudioPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  ensureAudioContext();
  isAudioPlaying = true;
  document.getElementById("playPauseIcon").textContent = "❚❚";
  document.getElementById("vinylDisc").classList.add("spinning");
  document.getElementById("equalizerBars").classList.add("playing");
  document.getElementById("soundIcon").textContent = "🔊";

  // Try playing custom MP3 first
  if (bgAudio && bgAudio.src && !bgAudio.error) {
    bgAudio.play().catch(() => {
      // If browser blocked or file absent, start built-in synth
      startRomanticSynth();
    });
  } else {
    startRomanticSynth();
  }
}

function pauseMusic() {
  isAudioPlaying = false;
  document.getElementById("playPauseIcon").textContent = "▶";
  document.getElementById("vinylDisc").classList.remove("spinning");
  document.getElementById("equalizerBars").classList.remove("playing");

  if (bgAudio) bgAudio.pause();
  stopRomanticSynth();
}

function ensureAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

// Built-in Romantic Acoustic Music Box (Plays if no MP3 or user explores)
const ROMANTIC_MELODY = [
  // Sweet romantic chord progression (C - G/B - Am - F)
  { note: 523.25, duration: 0.6 }, // C5
  { note: 659.25, duration: 0.6 }, // E5
  { note: 783.99, duration: 0.8 }, // G5
  { note: 659.25, duration: 0.5 }, // E5
  { note: 493.88, duration: 0.6 }, // B4
  { note: 587.33, duration: 0.6 }, // D5
  { note: 783.99, duration: 0.8 }, // G5
  { note: 587.33, duration: 0.5 }, // D5
  { note: 440.00, duration: 0.6 }, // A4
  { note: 523.25, duration: 0.6 }, // C5
  { note: 659.25, duration: 0.8 }, // E5
  { note: 523.25, duration: 0.5 }, // C5
  { note: 349.23, duration: 0.6 }, // F4
  { note: 440.00, duration: 0.6 }, // A4
  { note: 523.25, duration: 0.8 }, // C5
  { note: 659.25, duration: 0.8 }, // E5
];

let melodyStep = 0;
function startRomanticSynth() {
  stopRomanticSynth();
  if (isMuted) return;

  function playNextNote() {
    if (!isAudioPlaying) return;
    const noteObj = ROMANTIC_MELODY[melodyStep % ROMANTIC_MELODY.length];
    melodyStep++;
    playChime(noteObj.note, noteObj.duration);
    synthTimer = setTimeout(playNextNote, (noteObj.duration + 0.15) * 1000);
  }

  playNextNote();
}

function stopRomanticSynth() {
  if (synthTimer) {
    clearTimeout(synthTimer);
    synthTimer = null;
  }
}

// Gentle chime note synthesis
function playChime(freq, duration = 0.5) {
  if (!audioCtx || isMuted) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Soft chime envelope
    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {
    console.error(err);
  }
}

// Tactile keypad click sound
function playKeyClick() {
  ensureAudioContext();
  if (!audioCtx || isMuted) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(620, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(240, audioCtx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
  } catch (e) {}
}

// Happy victory chime
function playSuccessChime() {
  ensureAudioContext();
  playChime(523.25, 0.3); // C5
  setTimeout(() => playChime(659.25, 0.3), 120); // E5
  setTimeout(() => playChime(783.99, 0.4), 240); // G5
  setTimeout(() => playChime(1046.50, 0.6), 380); // C6
}

// --------------------------------------------------------
// 3. SCREEN 1: PASSCODE LOCK ENGINE
// --------------------------------------------------------
let enteredCode = "";
const targetCode = (CONFIG && CONFIG.pin) ? String(CONFIG.pin) : "1820";

function initPasscodeEngine() {
  const keypad = document.getElementById("keypad");
  const slotsContainer = document.getElementById("passcodeSlots");
  const slots = document.querySelectorAll(".passcode-slot");

  // On-screen keypad button clicks
  keypad.addEventListener("click", (e) => {
    const btn = e.target.closest(".key-btn");
    if (!btn) return;
    const key = btn.dataset.key;
    handleKeyInput(key);
  });

  // Physical keyboard support
  window.addEventListener("keydown", (e) => {
    const activeScreen = document.querySelector(".screen.active");
    if (!activeScreen || activeScreen.id !== "screen-pin") return;

    if (e.key >= "0" && e.key <= "9") {
      handleKeyInput(e.key);
    } else if (e.key === "Backspace" || e.key === "Delete") {
      handleKeyInput("DEL");
    } else if (e.key === ".") {
      handleKeyInput(".");
    }
  });

  function handleKeyInput(key) {
    if (key === "DEL") {
      if (enteredCode.length > 0) {
        enteredCode = enteredCode.slice(0, -1);
        playKeyClick();
        updateSlots();
      }
      return;
    }

    if (key === ".") {
      playKeyClick();
      return; // '.' is cosmetic/separator on keypad
    }

    if (enteredCode.length < 4) {
      enteredCode += key;
      playKeyClick();
      updateSlots();

      if (enteredCode.length === 4) {
        verifyPasscode();
      }
    }
  }

  function updateSlots(revealDigits = false) {
    slots.forEach((slot, index) => {
      const digitSpan = slot.querySelector(".slot-digit");
      if (index < enteredCode.length) {
        slot.classList.add("filled");
        if (revealDigits) {
          slot.classList.add("revealed");
          digitSpan.textContent = enteredCode[index];
        } else {
          slot.classList.remove("revealed");
          digitSpan.textContent = "";
        }
      } else {
        slot.classList.remove("filled", "revealed");
        digitSpan.textContent = "";
      }
    });
  }

  function verifyPasscode() {
    if (enteredCode === targetCode) {
      // Reveal the digits in the slots matching Screenshot 2!
      updateSlots(true);
      playSuccessChime();

      setTimeout(() => {
        showAccessGrantedModal();
      }, 350);
    } else {
      // Wrong passcode: shake animation & reset
      slotsContainer.classList.add("shake");
      slots.forEach(s => s.style.borderColor = "#e63946");

      setTimeout(() => {
        slotsContainer.classList.remove("shake");
        slots.forEach(s => s.style.borderColor = "");
        enteredCode = "";
        updateSlots(false);
      }, 650);
    }
  }
}

// --------------------------------------------------------
// 4. SCREEN 2: "ACCESS GRANTED!" MODAL ENGINE
// --------------------------------------------------------
function showAccessGrantedModal() {
  const modal = document.getElementById("modalGranted");
  const btnProceed = document.getElementById("btnProceed");

  modal.classList.add("active");

  btnProceed.onclick = () => {
    modal.classList.remove("active");
    // Switch to Screen 3 (Envelope)
    switchScreen("screen-pin", "screen-envelope");
  };
}

// --------------------------------------------------------
// 5. SCREEN 3: ENVELOPE OPENING & POSTCARD SLIDE
// --------------------------------------------------------
let envelopeOpened = false;

function initEnvelopeEngine() {
  const waxSealBtn = document.getElementById("waxSealBtn");
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const sealPromptText = document.getElementById("sealPromptText");
  const musicPlayerBar = document.getElementById("musicPlayerBar");
  const postcardCard = document.getElementById("postcardCard");

  // Click Wax Seal
  waxSealBtn.addEventListener("click", () => {
    if (envelopeOpened) return;
    openEnvelope();
  });

  function openEnvelope() {
    envelopeOpened = true;
    playSuccessChime();

    // Trigger burst of mini heart sparks
    spawnSealHeartSparks(waxSealBtn);

    // Open envelope flap & slide out postcard
    envelopeWrapper.classList.add("opened");
    sealPromptText.classList.add("hidden");

    // Reveal music player & start song automatically!
    setTimeout(() => {
      musicPlayerBar.classList.remove("hidden");
      playMusic();
    }, 600);
  }

  // Click postcard to open full letter view
  postcardCard.addEventListener("click", () => {
    if (!envelopeOpened) {
      openEnvelope();
      return;
    }
    switchScreen("screen-envelope", "screen-letter", () => {
      startTypewriterAnimation();
    });
  });
}

function spawnSealHeartSparks(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 14; i++) {
    const spark = document.createElement("div");
    spark.textContent = ["💖", "🌸", "✨", "💕", "❤️"][Math.floor(Math.random() * 5)];
    spark.style.position = "fixed";
    spark.style.left = `${centerX}px`;
    spark.style.top = `${centerY}px`;
    spark.style.fontSize = `${14 + Math.random() * 12}px`;
    spark.style.pointerEvents = "none";
    spark.style.zIndex = "999";
    spark.style.transition = "transform 0.8s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.8s ease";

    document.body.appendChild(spark);

    const angle = (Math.PI * 2 * i) / 14;
    const distance = 40 + Math.random() * 60;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      spark.style.transform = `translate(${destX}px, ${destY}px) scale(1.3)`;
      spark.style.opacity = "0";
    });

    setTimeout(() => spark.remove(), 900);
  }
}

// --------------------------------------------------------
// 6. SCREEN 4: FULL LOVE LETTER & TYPEWRITER ENGINE
// --------------------------------------------------------
let typewriterActive = false;
let typewriterTimeouts = [];

function initLetterEngine() {
  const btnReturn = document.getElementById("btnReturnEnvelope");
  const btnSkip = document.getElementById("btnSkipTyping");
  const tabLetterBtn = document.getElementById("tabLetterBtn");
  const tabScrapbookBtn = document.getElementById("tabScrapbookBtn");
  const parchmentLetter = document.getElementById("parchmentLetter");
  const scrapbookSection = document.getElementById("scrapbookSection");
  const btnJumpPhotos = document.getElementById("btnJumpPhotos");
  const photoFileInput = document.getElementById("photoFileInput");

  // Tab Switching
  if (tabLetterBtn && tabScrapbookBtn) {
    tabLetterBtn.addEventListener("click", () => {
      tabLetterBtn.classList.add("active");
      tabScrapbookBtn.classList.remove("active");
      parchmentLetter.classList.remove("hidden-view");
      scrapbookSection.classList.add("hidden-view");
    });

    tabScrapbookBtn.addEventListener("click", () => {
      tabScrapbookBtn.classList.add("active");
      tabLetterBtn.classList.remove("active");
      scrapbookSection.classList.remove("hidden-view");
      parchmentLetter.classList.add("hidden-view");
    });
  }

  // Jump from letter directly to photos
  if (btnJumpPhotos) {
    btnJumpPhotos.addEventListener("click", () => {
      if (tabScrapbookBtn) tabScrapbookBtn.click();
      const wrapper = document.getElementById("letterScrollWrapper");
      if (wrapper) wrapper.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Populate Scrapbook Gallery (Matches Reference Collage)
  renderScrapbookGallery();

  // Photo Upload Handler (Allows replacing photos live on device)
  if (photoFileInput) {
    photoFileInput.addEventListener("change", (e) => {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;
      const imgs = document.querySelectorAll(".scrapbook-item img");
      files.forEach((file, idx) => {
        if (imgs[idx]) {
          imgs[idx].src = URL.createObjectURL(file);
        }
      });
      playSuccessChime();
    });
  }

  // Return to Envelope view
  btnReturn.addEventListener("click", () => {
    switchScreen("screen-letter", "screen-envelope");
  });

  // Skip typing animation
  btnSkip.addEventListener("click", () => {
    skipTypewriter();
  });
}

// Render Scrapbook Collage matching reference image
function renderScrapbookGallery() {
  const grid = document.getElementById("scrapbookGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const memories = (CONFIG && CONFIG.memories) ? CONFIG.memories : [];

  memories.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.className = "scrapbook-item";
    if (item.rotation) {
      itemEl.style.transform = `rotate(${item.rotation}deg)`;
    }

    // Four-leaf clover sticker (Matches reference image)
    const clover = document.createElement("div");
    clover.className = "clover-sticker";
    clover.textContent = item.sticker || "🍀";
    itemEl.appendChild(clover);

    // Frame Card
    if (item.style === "stamp") {
      // Scalloped Postage Stamp
      const stampCard = document.createElement("div");
      stampCard.className = "stamp-card";
      const stampInner = document.createElement("div");
      stampInner.className = "stamp-inner-border";
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = "Anniversary Memory";
      img.onerror = () => { img.src = getPlaceholderImage(index); };
      stampInner.appendChild(img);
      stampCard.appendChild(stampInner);
      itemEl.appendChild(stampCard);
    } else {
      // Polaroid Card
      const polaroidCard = document.createElement("div");
      polaroidCard.className = "polaroid-card";
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = "Anniversary Memory";
      img.onerror = () => { img.src = getPlaceholderImage(index); };
      polaroidCard.appendChild(img);
      itemEl.appendChild(polaroidCard);
    }

    // Handwritten Romantic Cursive Caption
    if (item.caption) {
      const caption = document.createElement("p");
      caption.className = "memory-caption";
      caption.textContent = item.caption;
      itemEl.appendChild(caption);
    }

    grid.appendChild(itemEl);
  });
}

// Fallback pastel illustration if custom photo not yet placed in assets/images/
function getPlaceholderImage(index) {
  const themes = [
    { bg: "#ffe5ec", icon: "💑", text: "Us Together" },
    { bg: "#fff0f3", icon: "✨", text: "Special Memory" },
    { bg: "#fce2ea", icon: "🎬", text: "Movie Date" },
    { bg: "#ffccd5", icon: "💖", text: "Sweet Moments" },
    { bg: "#ffe5ec", icon: "🥰", text: "Favorite Smile" },
    { bg: "#fff0f5", icon: "🌸", text: "Forever Love" }
  ];
  const t = themes[index % themes.length];
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="${encodeURIComponent(t.bg)}"/><text x="50%" y="45%" font-size="52" text-anchor="middle" dominant-baseline="central">${t.icon}</text><text x="50%" y="72%" font-size="19" font-family="sans-serif" font-weight="bold" fill="%239e2542" text-anchor="middle">${encodeURIComponent(t.text)}</text></svg>`;
}

function startTypewriterAnimation() {
  const typewriterBody = document.getElementById("typewriterBody");
  typewriterBody.innerHTML = "";
  typewriterTimeouts.forEach(clearTimeout);
  typewriterTimeouts = [];
  typewriterActive = true;

  const paragraphs = (CONFIG && CONFIG.letterParagraphs) ? CONFIG.letterParagraphs : [];
  const closingText = (CONFIG && CONFIG.letterClosing) ? CONFIG.letterClosing : "";

  let currentParaIndex = 0;
  let currentCharIndex = 0;

  // Create first paragraph with cursor
  const pElement = document.createElement("p");
  typewriterBody.appendChild(pElement);

  const cursor = document.createElement("span");
  cursor.className = "typewriter-cursor";
  pElement.appendChild(cursor);

  function typeNextCharacter() {
    if (!typewriterActive) return;

    if (currentParaIndex < paragraphs.length) {
      const currentParaText = paragraphs[currentParaIndex];

      if (currentCharIndex < currentParaText.length) {
        const char = currentParaText[currentCharIndex];
        cursor.insertAdjacentText("beforebegin", char);
        currentCharIndex++;

        // Typing speed between 22ms and 36ms
        const delay = (char === "." || char === "!" || char === "?") ? 280 : (char === "," ? 120 : 26);
        const t = setTimeout(typeNextCharacter, delay);
        typewriterTimeouts.push(t);
      } else {
        // Move to next paragraph
        currentParaIndex++;
        currentCharIndex = 0;

        if (currentParaIndex < paragraphs.length) {
          cursor.remove();
          const nextP = document.createElement("p");
          typewriterBody.appendChild(nextP);
          nextP.appendChild(cursor);
          const t = setTimeout(typeNextCharacter, 250);
          typewriterTimeouts.push(t);
        } else {
          // Add romantic closing
          typeClosing();
        }
      }
    }
  }

  function typeClosing() {
    cursor.remove();
    const closingP = document.createElement("p");
    closingP.className = "letter-closing";
    typewriterBody.appendChild(closingP);
    closingP.appendChild(cursor);

    let closingCharIdx = 0;
    function typeClosingChar() {
      if (!typewriterActive) return;
      if (closingCharIdx < closingText.length) {
        cursor.insertAdjacentText("beforebegin", closingText[closingCharIdx]);
        closingCharIdx++;
        const t = setTimeout(typeClosingChar, 34);
        typewriterTimeouts.push(t);
      } else {
        // Done typing!
        document.getElementById("btnSkipTyping").style.display = "none";
      }
    }
    typeClosingChar();
  }

  typeNextCharacter();
}

function skipTypewriter() {
  typewriterActive = false;
  typewriterTimeouts.forEach(clearTimeout);
  typewriterTimeouts = [];

  const typewriterBody = document.getElementById("typewriterBody");
  typewriterBody.innerHTML = "";

  const paragraphs = (CONFIG && CONFIG.letterParagraphs) ? CONFIG.letterParagraphs : [];
  paragraphs.forEach(text => {
    const p = document.createElement("p");
    p.textContent = text;
    typewriterBody.appendChild(p);
  });

  if (CONFIG && CONFIG.letterClosing) {
    const closingP = document.createElement("p");
    closingP.className = "letter-closing";
    closingP.textContent = CONFIG.letterClosing;
    typewriterBody.appendChild(closingP);
  }

  document.getElementById("btnSkipTyping").style.display = "none";
}

// --------------------------------------------------------
// 7. SCREEN SWITCHER UTILITY
// --------------------------------------------------------
function switchScreen(fromId, toId, onComplete) {
  const fromScreen = document.getElementById(fromId);
  const toScreen = document.getElementById(toId);

  fromScreen.style.opacity = "0";
  fromScreen.style.transform = "translateY(-10px)";

  setTimeout(() => {
    fromScreen.classList.remove("active");
    toScreen.classList.add("active");
    toScreen.style.opacity = "0";
    toScreen.style.transform = "translateY(12px)";

    requestAnimationFrame(() => {
      toScreen.style.opacity = "1";
      toScreen.style.transform = "translateY(0)";
      if (typeof onComplete === "function") {
        onComplete();
      }
    });
  }, 350);
}

// --------------------------------------------------------
// 8. FLOATING PETALS & HEARTS CANVAS
// --------------------------------------------------------
function initPetalsCanvas() {
  const canvas = document.getElementById("petals-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const TOTAL_PARTICLES = 28;

  for (let i = 0; i < TOTAL_PARTICLES; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 8 + Math.random() * 12,
      speedY: 0.6 + Math.random() * 1.2,
      speedX: (Math.random() - 0.5) * 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      opacity: 0.25 + Math.random() * 0.45,
      isHeart: Math.random() > 0.45
    });
  }

  function drawHeart(x, y, size, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = "#ff7b95";
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.4, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.4, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawPetal(x, y, size, rotation, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = "#ffaec0";
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.45, size * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.01) * 0.6 + p.speedX;
      p.rotation += p.rotSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }

      if (p.isHeart) {
        drawHeart(p.x, p.y, p.size, p.opacity);
      } else {
        drawPetal(p.x, p.y, p.size, p.rotation, p.opacity);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// --------------------------------------------------------
// 9. FULLSCREEN TOGGLE
// --------------------------------------------------------
function initFullscreenToggle() {
  const btnFullscreen = document.getElementById("btnFullscreen");
  if (!btnFullscreen) return;

  btnFullscreen.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  });
}
