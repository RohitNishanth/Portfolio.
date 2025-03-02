var typed = new Typed(".typing", {
  strings: ["", "Web Designer", "web Developer", "Graphic Designer", "Fresher"],
  typeSpeed: 100,
  BackSpeed: 60,
  loop: true,
});
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || subject === "" || message === "") {
      alert("Please fill out all fields before submitting.");
      return;
    }

    alert(`Thank you, ${name}! Your message has been sent successfully.`);

    document.getElementById("contactForm").reset();
  });
