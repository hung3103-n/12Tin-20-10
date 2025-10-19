document.addEventListener("DOMContentLoaded", function () {
  const envelopeWrapper = document.getElementById("envelope-wrapper");
  const mainContent = document.getElementById("main-content");
  const music = document.getElementById("background-music");
  const footer = document.getElementById("footer");

  let isCardOpen = false;
  let typedInstance = null;
  let petalElements = [];

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const swiper = new Swiper(".swiper-container", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    touchEventsTarget: "wrapper",
    touchRatio: isMobile ? 0.3 : 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
  });

  envelopeWrapper.addEventListener("click", () => {
    if (envelopeWrapper.classList.contains("open")) return;

    envelopeWrapper.classList.add("open");
    isCardOpen = true;

    music.play().catch((error) => {
      console.log(
        "Trình duyệt chặn tự động phát nhạc. Cần tương tác của người dùng."
      );
    });

    setTimeout(() => {
      envelopeWrapper.style.transform = "scale(2) rotate(10deg)";
      envelopeWrapper.style.opacity = "0";

      setTimeout(() => {
        mainContent.classList.add("visible");

        launchConfetti();
        startTypingEffect();
        createFallingPetals();
        footer.classList.remove("footer-hidden");
      }, 500);
    }, 1200);
  });

  function launchConfetti() {
    const particleCount = isMobile ? 30 : 50;
    const duration = isMobile ? 3 * 1000 : 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 101,
    };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const count = particleCount * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount: count,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount: count,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  }

  function startTypingEffect() {
    const greetingStrings = [
      "Chúc mừng ngày Phụ nữ Việt Nam 20/10! 💐",
      "Gửi tới các bạn nữ trong lớp những lời chúc tốt đẹp nhất...",
      "Chúc các bạn luôn xinh đẹp và thành công! ✨",
    ];

    typedInstance = new Typed("#greeting", {
      strings: greetingStrings,
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      smartBackspace: true,
    });
  }

  function createFallingPetals() {
    const petalCount = isMobile ? 15 : 30;
    const petalContainer = document.body;

    for (let i = 0; i < petalCount; i++) {
      let petal = document.createElement("div");
      petal.className = "petal";
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.animationDuration = Math.random() * 5 + 8 + "s";
      petal.style.animationDelay = Math.random() * 5 + "s";
      petalContainer.appendChild(petal);
      petalElements.push(petal);
    }
  }
});
