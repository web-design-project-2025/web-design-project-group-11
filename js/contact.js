//Inspired from https://chatgpt.com/c/681896cc-9914-8001-94c3-ac0e2a9127bf

const form = document.getElementById("form");

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email-form");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

// Felmeddelande-element
const errorFirstName = document.getElementById("error-first-name");
const errorLastName = document.getElementById("error-last-name");
const errorEmail = document.getElementById("error-email");
const errorSubject = document.getElementById("error-subject");
const errorMessage = document.getElementById("error-message");

const customAlert = document.getElementById("custom-alert");

form.addEventListener("submit", (e) => {
  let hasError = false;

  // Rensa gamla fel
  errorFirstName.textContent = "";
  errorLastName.textContent = "";
  errorEmail.textContent = "";
  errorSubject.textContent = "";
  errorMessage.textContent = "";

  if (firstName.value.trim() === "") {
    errorFirstName.textContent = "*Please enter first name";
    hasError = true;
  }
  if (lastName.value.trim() === "") {
    errorLastName.textContent = "*Please enter last name";
    hasError = true;
  }
  if (email.value.trim() === "" || !email.value.includes("@")) {
    errorEmail.textContent = "*Incorrect email";
    hasError = true;
  }
  if (subject.value.trim() === "") {
    errorSubject.textContent = "*Please enter a subject";
    hasError = true;
  }
  if (message.value.trim() === "") {
    errorMessage.textContent = "*Please enter a message";
    hasError = true;
  }

  if (hasError) {
    e.preventDefault();
  } else {
    e.preventDefault(); // valfritt: hindra att sidan laddas om
    customAlert.classList.add("show");

    // Valfritt: göm meddelandet efter 3 sekunder
    setTimeout(() => {
      customAlert.classList.remove("show");
    }, 3000);

    form.reset(); // töm formuläret
  }
});
