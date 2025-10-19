document.addEventListener("DOMContentLoaded", function () {
  const envelopeWrapper = document.getElementById("envelope-wrapper");
  const mainContent = document.getElementById("main-content");
  const music = document.getElementById("background-music");
  const footer = document.getElementById("footer");

  let isCardOpen = false;
  let typedInstance = null;
  let petalElements = [];
  let animationFrameId = null;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // Tối ưu Swiper configuration
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
      slideShadows: false, // Tắt shadow để tăng performance
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
    speed: 600, // Giảm tốc độ transition
    touchEventsTarget: "wrapper",
    touchRatio: isMobile ? 0.5 : 1, // Tăng touch ratio cho mobile
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    resistance: true,
    resistanceRatio: 0.85,
    observer: true,
    observeParents: true,
  });

  envelopeWrapper.addEventListener("click", openEnvelope, { once: true });

  function openEnvelope() {
    if (envelopeWrapper.classList.contains("open")) return;

    envelopeWrapper.classList.add("open");
    isCardOpen = true;

    // Sử dụng requestAnimationFrame để tối ưu animation
    requestAnimationFrame(() => {
      music.play().catch((error) => {
        console.log("Trình duyệt chặn tự động phát nhạc.");
      });
    });

    setTimeout(() => {
      requestAnimationFrame(() => {
        envelopeWrapper.style.transform = "scale(2) rotate(10deg)";
        envelopeWrapper.style.opacity = "0";
      });

      setTimeout(() => {
        requestAnimationFrame(() => {
          mainContent.classList.add("visible");
          footer.classList.remove("footer-hidden");
        });

        launchConfetti();
        startTypingEffect();
        createFallingPetals();
      }, 500);
    }, 1200);
  }

  function launchConfetti() {
    // Giảm số lượng confetti để tăng performance
    const particleCount = isMobile ? 15 : 30;
    const duration = isMobile ? 2000 : 3000; // Giảm thời gian
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: isMobile ? 15 : 25,
      spread: 360,
      ticks: isMobile ? 30 : 50, // Giảm số ticks
      zIndex: 101,
      disableForReducedMotion: true,
      scalar: 0.8, // Giảm kích thước particles
    };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const intervalTime = isMobile ? 600 : 350; // Tăng interval
    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
      const count = particleCount * (timeLeft / duration);
      
      // Giảm số lần gọi confetti
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
    }, intervalTime);
  }

  function startTypingEffect() {
    const greetingStrings = [
      "Chúc mừng ngày Phụ nữ Việt Nam 20/10! 💐",
      "Gửi tới các bạn nữ trong lớp những lời chúc tốt đẹp nhất...",
      "Chúc các bạn luôn xinh đẹp và thành công! ✨",
    ];

    typedInstance = new Typed("#greeting", {
      strings: greetingStrings,
      typeSpeed: 70, // Tăng tốc độ gõ
      backSpeed: 40,
      backDelay: 1500, // Giảm delay
      loop: true,
      smartBackspace: true,
      showCursor: true,
      cursorChar: "|",
    });
  }

  function createFallingPetals() {
    // Giảm số lượng petals để tăng performance
    const petalCount = isMobile ? 10 : 20;
    const petalContainer = document.body;
    const fragment = document.createDocumentFragment(); // Sử dụng fragment để tối ưu DOM

    for (let i = 0; i < petalCount; i++) {
      let petal = document.createElement("div");
      petal.className = "petal";
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.animationDuration = Math.random() * 4 + 10 + "s"; // Tăng thời gian rơi
      petal.style.animationDelay = Math.random() * 5 + "s";
      
      fragment.appendChild(petal);
      petalElements.push(petal);
    }

    petalContainer.appendChild(fragment);
  }

  // Dọn dẹp khi người dùng rời khỏi trang
  window.addEventListener("beforeunload", () => {
    if (typedInstance) {
      typedInstance.destroy();
    }
    if (swiper) {
      swiper.destroy(true, true);
    }
    petalElements.forEach(petal => petal.remove());
    petalElements = [];
  });

  // Tối ưu cho các thiết bị có reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    petalElements.forEach(petal => petal.style.animation = "none");
  }
});