const portfolio = [
  {
    id: 1,
    title: 'Australien',
    subTitle: 'Webseite',
    desc: `Das Ziel des Projektes ist, die Menschen
    mit dem Land kennenlernen und helfen dabei die richtigen Entscheidungen zu treffen.`,
    image: './images/dest/australien3.png',
    bgImage: './images/dest/australien-bg.png',
    tech: ['css', 'html', 'js'],
    website: 'https://australien.netlify.app/',
    github: 'https://github.com/den777kaz/australien',
  },
  {
    id: 2,
    title: 'Fitness',
    subTitle: 'Website',
    desc: 'Mit dieser Webseite habe ich mit Bootstrap kennengelernt.',
    image: './images/dest/fit-1.png',
    bgImage: './images/dest/fit-as.png',
    tech: ['html', 'sass', 'bootstrap 5'],
    website: 'https://friendly-brattain-354084.netlify.app',
    github: 'https://github.com/den777kaz/fitmotion',
  },
  {
    id: 3,
    title: 'Netflix',
    subTitle: 'Web Application',
    desc: 'Spaß und Übung!',
    image: './images/dest/nitflex.png',
    bgImage: './images/dest/nitflex.png',
    tech: ['html', 'css', 'react', 'redux', 'restApi'],
    website: 'https://nitflex.netlify.app/home',
    github: 'https://github.com/den777kaz/netflix',
  },
  {
    id: 2345,
    title: 'Small Pizza Shop',
    subTitle: 'Web Application',
    desc: '',
    image: './images/dest/react-pizza.png',
    bgImage: './images/dest/react-pizza.png',
    tech: ['React', 'Redux', 'Sass', 'json-server'],
    website: 'https://shop-pizza.netlify.app',
    github: 'https://github.com/den777kaz/react-pizza',
  },
  {
    id: 4,
    title: 'Pizzeria',
    subTitle: 'Landing Page',
    desc: `Das Ziel des Projektes ist es, das Image des Unternehmens weiter zu stärken und die Bekanntheit des Restaurant do Deni zu erhöhen und somit eine optimale Neukundengewinnung zu erzielen.
    `,
    image: './images/dest/pizzeria.png',
    bgImage: './images/dest/pizza-bg.png',
    tech: ['html', 'css', 'js', 'php'],
    website: 'https://pizza-dodeni.netlify.app',
    github: 'https://github.com/den777kaz/pizza',
  },
];

// PORTFOLIO

const portBox = document.querySelector('.works-wrap');

portfolio.forEach((work, index) => {
  let tech = '';

  work.tech.forEach((item) => {
    tech += `<li>${item}</li>`;
  });
  portBox.innerHTML += `
        <div class="col2 work" data-aos="flip-up"
        data-aos-offset="300"
        data-id="${work.id}">
        <div class="flex">
          <div class="work-image col2">
            <div class="box16-9">
              <img src="${work.bgImage}" alt="">
            </div>  
          </div>
          <div class="work-desc col2">
            <h4>${work.title}</h4>
            <p>${work.subTitle}</p>
          </div>
        </div>
        <ul class="work-tech mt1rem">
        Tech:
          ${tech}
        </ul>
        <div class="work-line"></div>
        </div>
`;
});

//MODAL PORTFOLIO

const cards = document.querySelectorAll('.work');
const modalPort = document.querySelector('.modal-port');
const modalBg = document.querySelector('.modal-bg');

cards.forEach((item) => {
  item.addEventListener('click', () => {
    modalPort.style.display = 'flex';

    setTimeout(() => {
      const content = document.querySelector('.content-port');

      modalBg.classList.add('show');
      document.body.style.overflow = 'hidden';
      content.classList.add('fadeDown');
    }, 300);

    let data = portfolio.filter(
      (work) => work.id === parseInt(item.getAttribute('data-id'))
    );

    let tech = '';
    data[0].tech.forEach((item) => {
      tech += `<li>${item}</li>`;
    });

    modalPort.innerHTML = `
              <div class="content-port">
              <span class="close-btn">X</span>
              <div class="info">
                <h2>${data[0].subTitle}</h2>
                <h3>${data[0].title}</h3>
                <p>${data[0].desc}</p>
                <div class="tech">
                <ul class="tech-list">Tech:
                ${tech}
                </ul>
                </div>
                <div class="links">
                  <a href=${data[0].website} target="_blank">Website</a>
                  <a href=${data[0].github} target="_blank">Code</a>
                </div>
              </div>
        
              <div class="image">
                <img src="${data[0].image}" alt="sss">
              </div>
            </div>
    `;

    const image = document.querySelector('.image');
    const info = document.querySelector('.info');

    image.addEventListener('click', () => {
      if (!image.style.width || image.style.width !== '100%') {
        image.style.width = '100%';
      } else {
        image.style.width = '50%';
      }
      // info.style.transform = 'translateX(-100%)';
    });
  });
});

modalPort.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('modal-bg') ||
    e.target.classList.contains('close-btn')
  ) {
    const content = document.querySelector('.content-port');
    content.classList.remove('fadeDown');
    modalBg.classList.remove('show');
    setTimeout(() => {
      modalPort.style.display = 'none';
      document.body.style.overflowY = 'auto';
    }, 400);

    // modalPort.classList.remove('show');
    // modalPort.classList.add('d-none');
    // document.body.style.overflow = 'auto';
  } else return;
});
