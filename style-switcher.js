// Style Switcher Toggler
var styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
if (styleSwitcherToggle) {
  styleSwitcherToggle.addEventListener("click", function () {
    var styleSwitcher = document.querySelector(".style-switcher");
    if (styleSwitcher) {
      if (styleSwitcher.classList && styleSwitcher.classList.toggle) {
        styleSwitcher.classList.toggle("open");
      } else {
        var hasOpen = styleSwitcher.className.indexOf("open") !== -1;
        if (hasOpen) {
          styleSwitcher.className = styleSwitcher.className.replace(
            " open",
            ""
          );
        } else {
          styleSwitcher.className += " open";
        }
      }
    }
  });
}

// Close Style Switcher on Scroll
window.addEventListener("scroll", function () {
  var styleSwitcher = document.querySelector(".style-switcher");
  if (styleSwitcher) {
    if (styleSwitcher.classList && styleSwitcher.classList.contains("open")) {
      styleSwitcher.classList.remove("open");
    } else if (styleSwitcher.className.indexOf("open") !== -1) {
      styleSwitcher.className = styleSwitcher.className.replace(" open", "");
    }
  }
});

// Set Active Style (Color Switcher)
function setActiveStyle(color) {
  var alternateStyles = document.querySelectorAll(".alternate-style");
  if (alternateStyles && alternateStyles.length > 0) {
    for (var i = 0; i < alternateStyles.length; i++) {
      var style = alternateStyles[i];
      if (style.getAttribute("title") === color) {
        style.removeAttribute("disabled");
      } else {
        style.setAttribute("disabled", "true");
      }
    }
  }
}

// Day/Night Mode Toggler
var dayNight = document.querySelector(".day-night");
if (dayNight) {
  dayNight.addEventListener("click", function () {
    var icon = dayNight.querySelector("i");
    if (icon) {
      // Toggle icons with fallback
      if (icon.classList && icon.classList.toggle) {
        icon.classList.toggle("fa-sun");
        icon.classList.toggle("fa-moon");
      } else {
        var hasSun = icon.className.indexOf("fa-sun") !== -1;
        var hasMoon = icon.className.indexOf("fa-moon") !== -1;
        if (hasSun) {
          icon.className = icon.className.replace("fa-sun", "fa-moon");
        } else if (hasMoon) {
          icon.className = icon.className.replace("fa-moon", "fa-sun");
        }
      }
    }
    // Toggle dark mode on body
    if (document.body.classList && document.body.classList.toggle) {
      document.body.classList.toggle("dark");
    } else {
      var hasDark = document.body.className.indexOf("dark") !== -1;
      if (hasDark) {
        document.body.className = document.body.className.replace(" dark", "");
      } else {
        document.body.className += " dark";
      }
    }
  });
}

// Initialize Day/Night Icon on Load
window.addEventListener("load", function () {
  var dayNight = document.querySelector(".day-night");
  if (dayNight) {
    var icon = dayNight.querySelector("i");
    if (icon) {
      if (document.body.classList && document.body.classList.contains("dark")) {
        icon.classList.add("fa-sun");
      } else {
        icon.classList.add("fa-moon");
      }
      if (!icon.classList) {
        var hasDark = document.body.className.indexOf("dark") !== -1;
        if (hasDark && icon.className.indexOf("fa-sun") === -1) {
          icon.className += " fa-sun";
        } else if (!hasDark && icon.className.indexOf("fa-moon") === -1) {
          icon.className += " fa-moon";
        }
      }
    }
  }
});
