function validate() {
  const emailInput = document.getElementById('email'),
    nameInput = document.getElementById('name'),
    submitButton = document.querySelector('.contactForm button[type=submit]');

  const nameLength = 4;
  const errorName = document.createElement('span');
  const errorEmail = document.createElement('span');

  nameInput.addEventListener('input', () => {
    setTimeout(() => {
      if (nameInput.value.length > nameLength) {
        errorName.remove();
        submitButton.disabled = false;
      } else {
        errorName.textContent = 'min. 4 Zeichen';
        errorName.classList.add('error');
        nameInput.before(errorName);
        submitButton.disabled = true;
      }
    }, 1000);
  });

  emailInput.addEventListener('input', (e) => {
    const target = e.target.value;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    setTimeout(() => {
      if (emailRegex.test(target)) {
        errorEmail.remove();
        submitButton.disabled = false;
      } else {
        errorEmail.textContent = 'ungültige E-Mail';
        errorEmail.classList.add('error');
        emailInput.before(errorEmail);
        submitButton.disabled = true;
      }
    }, 1000);
  });
}
validate();
