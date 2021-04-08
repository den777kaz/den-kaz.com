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
          callModal(elem, work.figma);
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
})();

//MODAL WINDOW
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content');
const contactBtn = document.querySelector('.contactBtm');

const animTime = 300;

const box = document.createElement('div');
box.classList.add('renderContent');

function callModal(elem, content) {
  elem.addEventListener('click', () => openModal(content));
  modal.addEventListener('click', (e) => closeModal(e));
}

function openModal(content) {
  console.log(content);
  modal.style.display = 'flex';
  box.innerHTML = content;
  modalContent.append(box);

  setTimeout(() => {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    modalContent.classList.add('fadeDown');
  }, 50);
}

function closeModal(e) {
  if (
    e.target.classList.contains('modal') ||
    e.target.classList.contains('close-btn')
  ) {
    modalContent.classList.remove('fadeDown');
    modal.classList.remove('show');
    const box = document.querySelector('renderContent');
    console.log(box);
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflowY = 'auto';
    }, animTime);
  }
}

// FORM modal
const formTemplate = `<h1>form template</h1>`;
callModal(contactBtn, formTemplate);

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

const contactForm = document.querySelector('.contactForm');
console.log(contactForm);

const sendForm = (form) => {
  const errorMessage = 'Something was wrong',
    loadMessage = 'Loading...',
    successMessage = 'thank you! We will contact you shortly!';

  const statusMessage = document.createElement('div');
  statusMessage.textContent = '';
  statusMessage.style.cssText = 'font-size: 1.2rem;';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.appendChild(statusMessage);
    statusMessage.textContent = loadMessage;

    const formData = new FormData(form);

    let body = {};
    formData.forEach((val, key) => {
      body[key] = val;
    });
    // console.log(body);

    fetch('https://formsubmit.co/ajax/k19den85@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        formName.reset();
        console.log(data);
      })
      .catch((error) => console.log(error));
  });
};
sendForm(contactForm);
