function validateForm() {
  console.log('HALLOOOOOOOOO');
  const emailInput = document.getElementById('email'),
    nameInput = document.getElementById('name'),
    submitButton = document.querySelector('.contactForm button[type=submit]');

  const nameLength = 4;
  let isDisabledNameInput = false;
  let isDisabledEmailInput = false;
  const errorName = document.createElement('span');
  const errorEmail = document.createElement('span');

  function buttonDisabledCheck() {
    if (!isDisabledNameInput && !isDisabledEmailInput) {
      submitButton.disabled = false;
    } else submitButton.disabled = true;
  }

  nameInput.addEventListener('input', () => {
    setTimeout(() => {
      if (nameInput.value.length > nameLength - 1) {
        errorName.remove();
        isDisabledNameInput = false;
        buttonDisabledCheck();
      } else {
        errorName.textContent = 'min. 4 Zeichen';
        errorName.classList.add('error');
        nameInput.before(errorName);
        isDisabledNameInput = true;
        buttonDisabledCheck();
      }
    }, 1000);
  });

  emailInput.addEventListener('input', (e) => {
    const target = e.target.value;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    setTimeout(() => {
      if (emailRegex.test(target)) {
        errorEmail.remove();
        isDisabledEmailInput = false;
        buttonDisabledCheck();
      } else {
        errorEmail.textContent = 'ungültige E-Mail';
        errorEmail.classList.add('error');
        emailInput.before(errorEmail);
        isDisabledEmailInput = true;
        buttonDisabledCheck();
      }
    }, 1000);
  });
}
