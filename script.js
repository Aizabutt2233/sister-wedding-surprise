
const screens = document.querySelectorAll(".screen");

function showScreen(screenId) {
  screens.forEach((screen) => screen.classList.remove("active"));

  document.getElementById(screenId).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// GIRLS' NAMES

const girlNames = [
  "Ayesha", "Fatima", "Hania", "Zara", "Maham",
  "Areeba", "Iqra", "Sana", "Noor", "Laiba",
  "Minal", "Anaya", "Amna", "Alina", "Eman",
  "Maryam", "Hira", "Dua", "Mehak", "Aiman",
  "Zainab", "Saira", "Misha", "Anum", "Nimra",
  "Sadia", "Aqsa", "Kinza", "Maira", "Rida",
  "Mahnoor", "Aleena", "Sobia", "Hafsa", "Muneeba",
  "Sumbal", "Aqila", "Rameen", "Saniya", "Sehrish",
  "Kiran", "Sidra", "Ayla", "Arooba", "Nawal",
  "Nida", "Rabia", "Aiza", "Rimsha", "RINAD"
];

// BOYS' NAMES

const boyNames = [
  "Ali", "Ahmed", "Hamza", "Hassan", "Hussain",
  "Abdullah", "Usman", "Bilal", "Saad", "Zain",
  "Daniyal", "Huzaifa", "Talha", "Ammar", "Shahzaib",
  "Fahad", "Farhan", "Rayan", "Ibrahim", "Umar",
  "Taha", "Ayan", "Musa", "Salman", "Adeel",
  "Asad", "Raza", "Muneeb", "Arham", "Sufyan",
  "Shehryar", "Haris", "Shayan", "Waleed", "Sameer",
  "Junaid", "Zubair", "Noman", "Kashif", "Dawood",
  "Faisal", "Rehan", "Ahsan", "Irfan", "Saif",
  "Yahya", "Shahmeer", "Rizwan", "Imran", "USMAN"
];

// WELCOME

const noButton = document.getElementById("no-button");

document.getElementById("yes-button").addEventListener("click", () => {
  showScreen("announcement-screen");
  launchCelebration();
});

function moveNoButton() {
  const maxX = Math.max(0, window.innerWidth - noButton.offsetWidth - 20);
  const maxY = Math.max(0, window.innerHeight - noButton.offsetHeight - 20);

  noButton.style.position = "fixed";
  noButton.style.left = Math.random() * maxX + "px";
  noButton.style.top = Math.random() * maxY + "px";
  noButton.style.zIndex = "20";
}

noButton.addEventListener("mouseenter", moveNoButton);

noButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveNoButton();
});

noButton.addEventListener("click", moveNoButton);

// ANNOUNCEMENT TO BRIDE

document.getElementById("to-bride").addEventListener("click", () => {
  showScreen("bride-screen");

  createNameButtons(
    girlNames,
    "girl-names",
    "bride-feedback",
    "RINAD",
    "groom-screen"
  );
});

// NAME GUESSING GAME

function createNameButtons(
  names,
  containerId,
  feedbackId,
  correctName,
  nextScreen
) {
  const container = document.getElementById(containerId);
  const feedback = document.getElementById(feedbackId);

  container.innerHTML = "";
  feedback.textContent = "Find the special name! 🌸";

  const shuffledNames = [...names].sort(() => Math.random() - 0.5);

  shuffledNames.forEach((name, index) => {
    const button = document.createElement("button");

    button.className = "name-option";
    button.textContent = name;
    button.style.animationDelay = `${index * 0.025}s`;

    button.addEventListener("click", () => {
      if (name.toLowerCase() === correctName.toLowerCase()) {

        feedback.textContent =
          `Correct! ${correctName} is the special one! 🎉`;

        container.querySelectorAll("button").forEach((item) => {
          item.disabled = true;
        });

        button.style.background = "#168447";
        button.style.transform = "scale(1.3)";

        setTimeout(() => {
          showScreen(nextScreen);

          if (nextScreen === "groom-screen") {
            createNameButtons(
              boyNames,
              "boy-names",
              "groom-feedback",
              "USMAN",
              "card-screen"
            );
          }

        }, 1400);

      } else {

        feedback.textContent = "Oops! Try another name! 💛";

        button.animate(
          [
            { transform: "translateX(0)" },
            { transform: "translateX(-7px)" },
            { transform: "translateX(7px)" },
            { transform: "translateX(0)" }
          ],
          { duration: 300 }
        );
      }
    });

    container.appendChild(button);
  });
}

// CARD TO INVITATION

document.getElementById("to-invite").addEventListener("click", () => {
  showScreen("invite-screen");
  launchCelebration();
});

// ACCEPT INVITATION

document.getElementById("accept-invite").addEventListener("click", () => {
  showScreen("thankyou-screen");
  launchCelebration();
  showThankYouPopups();
});

// CELEBRATION EFFECTS

function launchCelebration() {
  const symbols = [
    "🎈", "💛", "🌼", "🌺",
    "✨", "💚", "🎊", "🌸"
  ];

  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const item = document.createElement("div");

      item.className = "floating-item";

      item.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      item.style.left = Math.random() * 100 + "vw";

      item.style.animationDuration =
        3 + Math.random() * 3 + "s";

      document.body.appendChild(item);

      setTimeout(() => item.remove(), 6000);

    }, i * 120);
  }
}

// 100 THANK YOU POPUPS

function showThankYouPopups() {
  const messages = [
    "THANK YOU! 💛",
    "SEE YOU SOON! 🌼",
    "LET'S CELEBRATE! 🎉",
    "LOVE YOU! 💚",
    "MEHNDI TIME! 💃"
  ];

  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const popup = document.createElement("div");

      popup.className = "thankyou-message";

      popup.textContent = messages[i % messages.length];

      popup.style.left = 15 + Math.random() * 70 + "vw";
      popup.style.top = 20 + Math.random() * 60 + "vh";

      document.body.appendChild(popup);

      setTimeout(() => popup.remove(), 1300);

    }, i * 180);
  }
}

// REPLAY

document.getElementById("replay-button").addEventListener("click", () => {
  noButton.style.position = "relative";
  noButton.style.left = "";
  noButton.style.top = "";
  noButton.style.zIndex = "";

  document.getElementById("girl-names").innerHTML = "";
  document.getElementById("boy-names").innerHTML = "";

  showScreen("welcome-screen");
});
