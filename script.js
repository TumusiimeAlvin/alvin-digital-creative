const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("visible");
  });
}

const menuButton = document.querySelector("#menu-button");
const navLinks = document.querySelector("#nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {
  document.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}

const themes = [
  {
    id: "neon",
    name: "Neon Night",
    icon: "◐"
  },
  {
    id: "sunset",
    name: "Sunset Heat",
    icon: "◒"
  },
  {
    id: "ocean",
    name: "Ocean Pulse",
    icon: "◓"
  },
  {
    id: "forest",
    name: "Forest Mode",
    icon: "◑"
  },
  {
    id: "mono",
    name: "Monochrome",
    icon: "●"
  }
];

const themeButton = document.querySelector("#theme-button");
const themeName = document.querySelector("#theme-name");

let savedTheme = localStorage.getItem("alvin-theme") || "neon";

let currentThemeIndex = themes.findIndex(
  (theme) => theme.id === savedTheme
);

if (currentThemeIndex === -1) {
  currentThemeIndex = 0;
}

function applyTheme(themeIndex) {
  const selectedTheme = themes[themeIndex];

  document.documentElement.setAttribute(
    "data-theme",
    selectedTheme.id
  );

  if (themeButton) {
    themeButton.textContent = selectedTheme.icon;

    themeButton.setAttribute(
      "aria-label",
      `Change colour theme. Current theme: ${selectedTheme.name}`
    );
  }

  if (themeName) {
    themeName.textContent = selectedTheme.name;
  }

  localStorage.setItem("alvin-theme", selectedTheme.id);
}

applyTheme(currentThemeIndex);

if (themeButton) {
  themeButton.addEventListener("click", () => {
    currentThemeIndex =
      (currentThemeIndex + 1) % themes.length;

    applyTheme(currentThemeIndex);
  });
}

const assistantResponses = {
  about:
    "Alvin Tumusiime is an emerging interactive media designer and digital creative from Ottawa, Ontario. He studies Interactive Media Design at Algonquin College and creates digital experiences with personality and purpose.",

  skills:
    "Alvin works with web design, visual branding, social-media content, promotional graphics, HTML, CSS, Figma, and creative strategy.",

  drake:
    "The Drake project examines how Aubrey Drake Graham moved from acting and music into branding, entrepreneurship, OVO, and cultural influence. It focuses on consistency, creativity, strategic thinking, adaptability, and long-term brand building.",

  presentation:
    "The complete nine-page Drake presentation is displayed directly in the Presentation section. Choose Presentation in the navigation and scroll through every page.",

  contact:
    "You can contact Alvin by phone at 613-712-1347 or by email at alvintumusiime44@gmail.com."
};

const assistantButtons = document.querySelectorAll(
  ".assistant-options button"
);

const assistantResponse = document.querySelector(
  "#assistant-response"
);

const currentHour = new Date().getHours();

let greeting = "Welcome to Alvin’s portfolio.";

if (currentHour < 12) {
  greeting = "Good morning. Welcome to Alvin’s portfolio.";
} else if (currentHour < 18) {
  greeting = "Good afternoon. Welcome to Alvin’s portfolio.";
} else {
  greeting = "Good evening. Welcome to Alvin’s portfolio.";
}

if (assistantResponse) {
  assistantResponse.textContent =
    `${greeting} Choose a question above to explore his work.`;
}

assistantButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const answer = assistantResponses[button.dataset.answer];

    if (assistantResponse && answer) {
      assistantResponse.textContent = answer;
    }
  });
});

const assistantReset = document.querySelector("#assistant-reset");

if (assistantReset && assistantResponse) {
  assistantReset.addEventListener("click", () => {
    assistantResponse.textContent =
      "Select a question above to explore the website.";
  });
});