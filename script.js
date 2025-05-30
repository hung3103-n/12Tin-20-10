document.addEventListener('DOMContentLoaded', () => {
    const personalMessage = `
    💖 Cảm ơn bạn đã ghé thăm trang web này! 💖
    Đây là một món quà nhỏ từ Hung Vu dành tặng các bạn nữ lớp 12 Tin.
    Chúc các bạn một ngày 20/10 thật vui vẻ, hạnh phúc và ý nghĩa! 😊
    Hy vọng các bạn thích trang web nhỏ này! ✨
    `;
    console.log(personalMessage);

    const heartsContainer = document.getElementById('heartsContainer');
    const complimentButton = document.getElementById('complimentButton');
    const fireworksButton = document.getElementById('fireworksButton');
    const complimentBox = document.getElementById('complimentBox');

    const compliments = [
        "Bạn thật xinh đẹp và duyên dáng! 🌸",
        "Nụ cười của bạn tỏa nắng rạng ngời! ✨",
        "Bạn thông minh và cực kỳ tài năng! 🌟",
        "Bạn là một người bạn đồng hành tuyệt vời! 💕",
        "Bạn luôn sẵn lòng giúp đỡ mọi người! 💖",
        "Phong cách của bạn thật dễ thương và ấn tượng! 🚀",
        "Bạn học rất giỏi và luôn chăm chỉ! 📚",
        "Bạn là niềm tự hào của cả lớp! 👑",
        "Trái tim bạn thật ấm áp và nhân hậu! 💝",
        "Bạn mang đến niềm vui cho mọi người xung quanh! 🎉",
        "Bạn thật kiên cường và đầy nghị lực! 💪",
        "Sự sáng tạo của bạn là vô hạn! 🎨",
        "Bạn luôn mang đến năng lượng tích cực! 🌞"
    ];

    function createHeartParticle() {
        if (!heartsContainer) return;
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = Math.random() > 0.5 ? '💖' : '💕';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        heart.style.fontSize = (Math.random() * 0.8 + 0.8) + 'rem';
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    let heartInterval = setInterval(createHeartParticle, 1500);

    for (let i = 0; i < 8; i++) {
        setTimeout(createHeartParticle, i * 300);
    }

    function showCompliment() {
        if (!complimentBox) return;
        const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
        complimentBox.innerHTML = `<span>${randomCompliment}</span>`;
        complimentBox.style.background = 'linear-gradient(135deg, #fff1f5, #ffe3ec)';
        complimentBox.style.transform = 'scale(0.95)';

        complimentBox.animate([
            { transform: 'scale(0.9) translateY(10px)', opacity: 0.8 },
            { transform: 'scale(1.05) translateY(-5px)', opacity: 1 },
            { transform: 'scale(1) translateY(0)', opacity: 1 }
        ], {
            duration: 500,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        });
    }

    function createSparkle(x, y, color) {
        const sparkleChars = ['✨', '✦', '✧', '✷', '✶', '·'];
        const sparkle = document.createElement('div');
        sparkle.innerHTML = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.color = color;
        sparkle.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem'; 
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1001';
        sparkle.style.opacity = '0'; 
        const angle = Math.random() * Math.PI * 2; 
        const radius = Math.random() * 150 + 50;
        const endX = Math.cos(angle) * radius;
        const endY = Math.sin(angle) * radius - (Math.random() * 50 + 20); 

        const midY = -Math.random() * 80 - 20; 

        sparkle.animate([
            { opacity: 1, transform: `translate(0px, 0px) scale(0.3) rotate(0deg)` }, 
            { opacity: 0.9, transform: `translate(${endX * 0.3}px, ${midY}px) scale(1.2) rotate(${Math.random() * 180 - 90}deg)` },
            { opacity: 0, transform: `translate(${endX}px, ${endY + 50}px) scale(0.2) rotate(${Math.random() * 360}deg)` } 
        ], {
            duration: Math.random() * 1200 + 800, 
            easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)', 
            fill: 'forwards'
        });

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2200); 
    }

    function launchFireworks() {
        const fireworkColors = ['#ff6b9d', '#ffd700', '#ff69b4', '#87ceeb', '#98fb98', '#f7b7a3', '#f9a8d4', '#ffca7b', '#b28dff'];
        const numSparklesBase = 20;
        const numSparklesVariation = 10;
        const numSparkles = numSparklesBase + Math.floor(Math.random() * numSparklesVariation);


        const launchX = window.innerWidth * (Math.random() * 0.4 + 0.3);
        const launchY = window.innerHeight * (Math.random() * 0.2 + 0.4); 

        for (let i = 0; i < numSparkles; i++) {
            setTimeout(() => {
                const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
                createSparkle(launchX, launchY, color);
            }, i * (Math.random() * 30 + 15)); 
        }
    }

    if (complimentButton) {
        complimentButton.addEventListener('click', showCompliment);
    }

    if (fireworksButton) {
        fireworksButton.addEventListener('click', () => {
            for(let i = 0; i < 3; i++) {
                setTimeout(launchFireworks, i * (Math.random() * 300 + 300)); 
            }
        });
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(heartInterval);
        } else {
            heartInterval = setInterval(createHeartParticle, 1500);
        }
    });
});
