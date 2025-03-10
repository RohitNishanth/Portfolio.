document.addEventListener("DOMContentLoaded", function () {
  var navToggler = document.querySelector(".nav-toggler");
  var aside = document.querySelector(".aside");
  var mainContent = document.querySelector(".main-content");

  if (navToggler && aside && mainContent) {
    navToggler.addEventListener("click", function () {
      if (aside.classList && aside.classList.toggle) {
        aside.classList.toggle("active");
        mainContent.classList.toggle("active");
      } else {
        var hasActive = aside.className.indexOf("active") !== -1;
        if (hasActive) {
          aside.className = aside.className.replace(" active", "");
          mainContent.className = mainContent.className.replace(" active", "");
        } else {
          aside.className += " active";
          mainContent.className += " active";
        }
      }
    });

    document.addEventListener("click", function (e) {
      if (
        aside.classList &&
        aside.classList.contains("active") &&
        !aside.contains(e.target) &&
        !navToggler.contains(e.target)
      ) {
        aside.classList.remove("active");
        mainContent.classList.remove("active");
      } else if (
        aside.className.indexOf("active") !== -1 &&
        !aside.contains(e.target) &&
        !navToggler.contains(e.target)
      ) {
        aside.className = aside.className.replace(" active", "");
        mainContent.className = mainContent.className.replace(" active", "");
      }
    });

    aside.addEventListener("transitionend", function () {
      if (aside.classList && aside.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }

      if (!aside.classList) {
        var hasActive = aside.className.indexOf("active") !== -1;
        document.body.style.overflow = hasActive ? "hidden" : "auto";
      }
    });
  }

  var typingElement = document.querySelector(".typing");
  if (typingElement) {
    var words = ["Developer", "Designer", "Freelancer", "Creator"];
    var wordIndex = 0;
    var charIndex = 0;
    var currentWord = "";
    var isDeleting = false;
    var typingSpeed = 150;

    function type() {
      currentWord = words[wordIndex];

      if (isDeleting) {
        charIndex--;
        typingElement.textContent = currentWord.substring(0, charIndex);
        typingSpeed = 100;
      } else {
        charIndex++;
        typingElement.textContent = currentWord.substring(0, charIndex);
        typingSpeed = 150;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }
});
