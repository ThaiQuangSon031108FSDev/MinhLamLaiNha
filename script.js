document.addEventListener("DOMContentLoaded", () => {
  // --- Lấy các phần tử ---
  const startScreen = document.getElementById("start-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const slideshowContainer = document.getElementById("slideshow-container");
  const letterScreen = document.getElementById("letter-screen");

  const startBtn = document.getElementById("start-btn");
  const secretLetterBtn = document.getElementById("secret-letter-btn");
  const slideshowCloseBtn = document.querySelector(".slideshow-close");

  const envelope = document.querySelector(".envelope");
  const finalContent = document.getElementById("final-content");
  const letterTextEl = document.getElementById("letter-text");

  const slides = document.querySelectorAll(".slide");
  const slideshowNav = document.querySelectorAll(".slideshow-nav");
  let currentSlide = 0;

  const audio = document.getElementById("background-music");
  const letterContent =
    "Dù Thơ chọn gì thì em vẫn chọn yêu Thơ 💞\n\nCảm ơn Thơ đã đến bên em, làm cho mỗi ngày của em đều trở nên thật đặc biệt và dịu dàng hơn. Yêu Sốp của em nhiều 💖";

  // --- Chức năng chung ---
  function showScreen(screenToShow) {
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active");
    });
    screenToShow.classList.add("active");
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function typeWriterEffect(text) {
    let i = 0;
    letterTextEl.textContent = "";
    const interval = setInterval(() => {
      if (i < text.length) {
        letterTextEl.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
  }

  // --- Chức năng mới: Hiệu ứng mưa tim ---
  function createFallingHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart-fall");
    heart.innerText = "💖"; // Bạn có thể đổi icon trái tim khác

    // Random vị trí, tốc độ và kích thước
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s"; // Rơi từ 4-7 giây
    heart.style.fontSize = Math.random() * 10 + 10 + "px"; // Kích thước từ 10-20px

    document.body.appendChild(heart);

    // Xóa trái tim sau khi nó rơi xong
    setTimeout(() => {
      heart.remove();
    }, 7000); // 7 giây
  }

  function startHeartFall() {
    // Tạo một trái tim mỗi 300ms
    const heartInterval = setInterval(createFallingHeart, 300);

    // Dừng hiệu ứng sau 10 giây
    setTimeout(() => {
      clearInterval(heartInterval);
    }, 10000);
  }

  // --- Luồng sự kiện chính ---

  // 1. Nhấn nút "Mở quà"
  startBtn.addEventListener("click", () => {
    showScreen(quizScreen);
    audio.play().catch((e) => console.error("Audio play failed:", e));
  });

  // 2. Chọn đáp án Quiz
  document.querySelectorAll(".option").forEach((button) => {
    button.addEventListener("click", () => {
      secretLetterBtn.classList.remove("hidden");
    });
  });

  // 3. Nhấn nút "Có điều bất ngờ..." -> HIỆN SLIDESHOW
  secretLetterBtn.addEventListener("click", () => {
    showScreen(slideshowContainer);
    showSlide(currentSlide);
  });

  // 4. Điều hướng slideshow
  slideshowNav.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("next")) {
        currentSlide = (currentSlide + 1) % slides.length;
      } else {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      }
      showSlide(currentSlide);
    });
  });

  // 5. Đóng slideshow -> HIỆN MÀN HÌNH THƯ VÀ BẮT ĐẦU MƯA TIM
  slideshowCloseBtn.addEventListener("click", () => {
    showScreen(letterScreen);
    startHeartFall(); // <<< BẮT ĐẦU HIỆU ỨNG TẠI ĐÂY

    // Bắt đầu hiệu ứng mở thư
    setTimeout(() => {
      envelope.classList.add("open");
      setTimeout(() => {
        envelope.style.display = "none";
        finalContent.classList.remove("hidden");
        finalContent.classList.add("visible");
        typeWriterEffect(letterContent);
      }, 2000); // Đợi phong bì mở xong
    }, 500); // Đợi màn hình hiện ra
  });
});
