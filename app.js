const $ = document;
const submitBtn = $.querySelector(".submit-btn");
const emailInputElem = $.getElementById("emailInput");
const errorMsgElem = $.querySelector(".invalid-email-error-msg");
const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  emailValidation();
});

emailInputElem.addEventListener("keypress", () => {
  emailInputElem.classList.remove("invalid-email-error");
  errorMsgElem.innerHTML = "";
});

const emailValidation = () => {
  let emailInputValue = emailInputElem.value;

  if (!emailInputValue) {
    createErrorMessage();
  } else {
    let isValidEmail = emailRegex.test(emailInputValue);
    if (isValidEmail) {
      successMessage(emailInputValue);
      emailInputElem.value = "";
    } else {
      createErrorMessage();
    }
  }
};

const createErrorMessage = () => {
  emailInputElem.classList.add("invalid-email-error");
  emailInputElem.classList.add("shake-animation");
  setTimeout(() => emailInputElem.classList.remove("shake-animation"), 1000);

  if (!errorMsgElem.innerHTML) {
    errorMsgElem.insertAdjacentText("beforeend", "Valid email required");
  }
};

const successMessage = (emailValue) => {
  let bodyElem = $.body;

  bodyElem.insertAdjacentHTML(
    "afterbegin",
    `<div class="success-container">
    <div class="content">
    <img src="assets/images/icon-list.svg" />
    <h1>Thanks for subscribing!</h1>
    <p>
    A confirmation email has been sent to <span>${emailValue}</span>. Please open it and
    click the button inside to confirm your subscription.
    </p>
    <button class="dismiss-btn btn">Dismiss message</button>
    </div>
    </div>`
  );
  const dismissBtnElem = $.querySelector(".dismiss-btn");
  dismissBtnElem.addEventListener("click", successMsgDelete);
};

const successMsgDelete = () => {
  const msgContainer = $.querySelector(".success-container");
  msgContainer.remove();
};
