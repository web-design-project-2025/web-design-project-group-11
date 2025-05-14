//INSPIRED FROM https://chatgpt.com/c/681896cc-9914-8001-94c3-ac0e2a9127bf

const form = document.getElementById("form");

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email-form");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

//ERROR MESSAGES
const errorFirstName = document.getElementById("error-first-name");
const errorLastName = document.getElementById("error-last-name");
const errorEmail = document.getElementById("error-email");
const errorSubject = document.getElementById("error-subject");
const errorMessage = document.getElementById("error-message");

//CONFIRMATION ALERT POP-UP
const customAlert = document.getElementById("custom-alert");

//RUNS WHEN THE FORM IS SUBMITTED
form.addEventListener("submit", (e) => {
  let hasError = false;

  //CLEARS OUT PREVIOUS ERROR MESSAGES
  errorFirstName.textContent = "";
  errorLastName.textContent = "";
  errorEmail.textContent = "";
  errorSubject.textContent = "";
  errorMessage.textContent = "";

  //CHECKS IF THE VALUE IS EMPTY => ERROR MESSAGE
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

  //IF FORM IS INVALID, STOP THE PROCESS
  if (hasError) {
    e.preventDefault();
  } else {
    e.preventDefault(); //PREVENT PRELOAD
    customAlert.classList.add("show");

    //SET TIME FOR ALERT MESSAGE
    setTimeout(() => {
      customAlert.classList.remove("show");
    }, 3000);

    //CLEAR THE FORM
    form.reset();
  }
});
