// FRONTEND TEMPLATE
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
