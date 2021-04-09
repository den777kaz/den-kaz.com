let designWorks = document.querySelector('.webdesign .works');
let frontendWorks = document.querySelector('.frontend .works');

const formLayot = ``;
const figmaFrame = ``;

function webdesignWorkTemplate(imageUrl, title, links, desc, id) {
  const layout = `<div class="work flex" data-id="${id}" data-aos="fade-up">
    <div class="work__image">
      <div class="box16-9">
        <img src=${imageUrl} alt="">
      </div>
    </div>
    <div class="work__content">
      <h4>${title}</h4>
      <p>${desc}</p>
      <div class="links flex mt1rem">
        ${links}
      </div>
    </div>
  </div>`;

  return layout;
}

// FRONTEND
function frontendWorkTemplate(imageUrl, title, techList, links, desc, id) {
  const layout = `<div class="work flex" data-id="${id}" data-aos="fade-up">
    <div class="work__content">
      <h4>${title}</h4>
      <ul class="flex tech-list">${techList.join(' ')}</ul>
      <div class="links flex mt1rem">
      ${links}
      </div>
    </div>
  </div>`;

  return layout;
}
// fetch data portfolio
(async () => {
  try {
    const res = await fetch('../store/db.json');
    const data = await res.json();

    data.webdesign.forEach((work) => {
      let linkList = '';
      work.links.forEach((l) => {
        linkList += `<a href=${l.path} target="_blank">${l.name}</a>`;
      });

      designWorks.innerHTML += webdesignWorkTemplate(
        work.imageUrl,
        work.title,
        linkList,
        work.desc,
        work.id
      );
    });
    data.frontend.forEach((work) => {
      let techList = [];
      let linkList = '';

      work.links.forEach((l) => {
        linkList += `<a href=${l.path} target="_blank">${l.name}</a>`;
      });
      work.tech.forEach((t) => {
        techList.push(`<li>${t}</li>`);
        // console.log(techList);
      });

      frontendWorks.innerHTML += frontendWorkTemplate(
        work.imageUrl,
        work.title,
        techList,
        linkList,
        work.desc,
        work.id
      );
    });

    const works = document.querySelectorAll('.webdesign .work');

    works.forEach((elem) => {
      data.webdesign.forEach((work) => {
        if (work.id === +elem.dataset.id) {
          // callModal(elem, work.figma);
          callModal(elem, portModal, portContent, work.figma);
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
})();

//MODAL WINDOW

const contactModal = document.getElementById('contactModal');
const formContent = document.querySelector('#contactModal .modal__content');
const contactBtn = document.querySelector('.contactBtn');

const portModal = document.getElementById('portfolioModal');
const portContent = document.querySelector('#portfolioModal .modal__content');

// FORMS
const contactForm = document.querySelector('.contactForm');
const animTime = 300;
const timeBox = document.createElement('div');
timeBox.classList.add('renderContent');

function openModal(event, modalWindow, modalContent, template) {
  console.log(event.target.tagName);
  if (event.target.tagName !== 'A') {
    modalWindow.style.display = 'flex';
    console.log(template);
    if (template !== null) {
      timeBox.innerHTML = template;
      modalContent.append(timeBox);
    }

    setTimeout(() => {
      modalWindow.classList.add('show');
      document.body.style.overflow = 'hidden';
      modalContent.classList.add('fadeDown');
    }, 50);
  }
}

function closeModal(event, modalWindow, modalContent) {
  const statusMessage = document.querySelector('.statusMsg');

  if (
    event.target.classList.contains('modal') ||
    event.target.classList.contains('close-btn')
  ) {
    modalContent.classList.remove('fadeDown');
    modalWindow.classList.remove('show');
    setTimeout(() => {
      if (statusMessage !== null) statusMessage.remove();

      modalWindow.style.display = 'none';
      document.body.style.overflowY = 'auto';
    }, animTime);
  }
}

function callModal(target, modalWindow, modalContent, template) {
  target.addEventListener('click', (event) =>
    openModal(event, modalWindow, modalContent, template)
  );
  modalWindow.addEventListener('click', (event) =>
    closeModal(event, modalWindow, modalContent)
  );
}

// call contact form
callModal(contactBtn, contactModal, formContent, null);

// SUBMIT FORM
const submitForm = (form) => {
  const spinner = document.querySelector('.spinner');
  const errorMessage = 'Sorry, etwas ist schief gelaufen :(',
    // loadMessage = 'Loading...',
    successMessage =
      'Vielen Dank für Ihre Nachricht. Ich werde mich in kürze bei Ihnen melden!';

  const statusMessage = document.createElement('div');
  statusMessage.textContent = '';
  statusMessage.classList.add('statusMsg');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    statusMessage.textContent = '';
    spinner.classList.add('active');
    // statusMessage.textContent = loadMessage;

    const formData = new FormData(form);

    let body = {};
    formData.forEach((val, key) => {
      body[key] = val;
    });
    // console.log(body);

    fetch('https://formsubmit.co/ajax/ffc584b33e3f724962b9680ea74a7bf4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // console.log(data.message);
          form.reset();
          spinner.classList.remove('active');
          form.appendChild(statusMessage);
          statusMessage.textContent = successMessage;
        }
      })
      .catch((error) => {
        spinner.classList.remove('active');
        form.appendChild(statusMessage);
        statusMessage.classList.add('errorMsg');
        statusMessage.textContent = errorMessage;
        console.log(error);
      });
  });
};
submitForm(contactForm);

// FORM modal

// const textarea = document.querySelector('textarea');
// textarea.addEventListener('keydown', autosize);

// function autosize() {
//   let el = this;
//   setTimeout(function () {
//     el.style.cssText = 'height:auto; padding:0';
//     // for box-sizing other than "content-box" use:
//     // el.style.cssText = '-moz-box-sizing:content-box';
//     el.style.cssText = 'height:' + el.scrollHeight + 'px';
//   }, 0);
// }
