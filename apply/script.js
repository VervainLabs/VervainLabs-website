// ================================
// CONFIG
// ================================

// Replace with your Google Apps Script Web App URL
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby8JPqKlRW_JIcVhBTGaa9O326fGSXrWwh4wWqHfg14g3knjKUkvCKt6dw3iAPvhfZh/exec";


// ================================
// ELEMENTS
// ================================

const form = document.getElementById("applicationForm");
const positionSelect = document.getElementById("position");
const otherPositionGroup = document.getElementById("otherPositionGroup");
const otherPositionInput = document.getElementById("otherPosition");
const submitBtn = document.getElementById("submitBtn");
const statusMessage = document.getElementById("statusMessage");


// ================================
// SHOW OTHER POSITION FIELD
// ================================

positionSelect.addEventListener("change", () => {

  if (positionSelect.value === "Other") {
    otherPositionGroup.classList.remove("hidden");
    otherPositionInput.required = true;
  } else {
    otherPositionGroup.classList.add("hidden");
    otherPositionInput.required = false;
  }
});


// ================================
// FORM SUBMIT
// ================================

form.addEventListener("submit", async (e) => {

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting...";
  statusMessage.innerText = "";

  const formData = new FormData(form);

  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    gender: formData.get("gender"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    linkedin: formData.get("linkedin"),
    github: formData.get("github"),
    resume: formData.get("resume"),
    position: formData.get("position"),
    otherPosition: formData.get("otherPosition"),
    experience: formData.get("experience"),
    portfolio: formData.get("portfolio"),
    message: formData.get("message")
  };

  try {

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.result === "success") {

      statusMessage.style.color = "#4ade80";
      statusMessage.innerText =
        "Application submitted successfully! We will reach out soon.";

      form.reset();

      otherPositionGroup.classList.add("hidden");

    } else {

      statusMessage.style.color = "#ff6b6b";
      statusMessage.innerText =
        "Something went wrong. Please try again.";
    }

  } catch (error) {

    statusMessage.style.color = "#ff6b6b";
    statusMessage.innerText =
      "Submission failed. Please try again.";

    console.error(error);

  } finally {

    submitBtn.disabled = false;
    submitBtn.innerText = "Submit Application";
  }
});


// ================================
// DISABLE RIGHT CLICK
// ================================

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});


// ================================
// DISABLE INSPECT SHORTCUTS
// ================================

document.addEventListener("keydown", (e) => {

  // F12
  if (e.key === "F12") {
    e.preventDefault();
  }

  // Ctrl+Shift+I
  if (
    e.ctrlKey &&
    e.shiftKey &&
    (e.key === "I" || e.key === "i")
  ) {
    e.preventDefault();
  }

  // Ctrl+Shift+J
  if (
    e.ctrlKey &&
    e.shiftKey &&
    (e.key === "J" || e.key === "j")
  ) {
    e.preventDefault();
  }

  // Ctrl+U
  if (
    e.ctrlKey &&
    (e.key === "u" || e.key === "U")
  ) {
    e.preventDefault();
  }
});

// ========================================
// BACKGROUND PARTICLE ANIMATION
// ========================================

const canvas = document.getElementById("bg-canvas");

if (canvas) {

  const ctx = canvas.getContext("2d");

  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);

  class Particle {

    constructor() {

      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;

      this.radius = Math.random() * 2 + 1;

      this.dx = (Math.random() - 0.5) * 0.4;
      this.dy = (Math.random() - 0.5) * 0.4;
    }

    draw() {

      ctx.beginPath();

      ctx.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        "rgba(255,255,255,0.08)";

      ctx.fill();
    }

    update() {

      this.x += this.dx;
      this.y += this.dy;

      // Bounce
      if (
        this.x < 0 ||
        this.x > canvas.width
      ) {
        this.dx *= -1;
      }

      if (
        this.y < 0 ||
        this.y > canvas.height
      ) {
        this.dy *= -1;
      }

      this.draw();
    }
  }

  function initParticles() {

    particles = [];

    const particleCount =
      Math.floor(window.innerWidth / 12);

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  initParticles();

  function connectParticles() {

    for (let a = 0; a < particles.length; a++) {

      for (let b = a; b < particles.length; b++) {

        const dx =
          particles[a].x - particles[b].x;

        const dy =
          particles[a].y - particles[b].y;

        const distance =
          dx * dx + dy * dy;

        if (distance < 12000) {

          ctx.beginPath();

          ctx.strokeStyle =
            "rgba(91, 75, 138, 0.08)";

          ctx.lineWidth = 1;

          ctx.moveTo(
            particles[a].x,
            particles[a].y
          );

          ctx.lineTo(
            particles[b].x,
            particles[b].y
          );

          ctx.stroke();
        }
      }
    }
  }

  function animate() {

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    particles.forEach((particle) => {
      particle.update();
    });

    connectParticles();

    requestAnimationFrame(animate);
  }

  animate();
}