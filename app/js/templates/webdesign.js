// WEBDESIGN TEMPLATE
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
