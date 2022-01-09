const elFilter = document.querySelector('.our-projects__filter')
const elFilterBtn = document.querySelector('.js-filter-btn')
const elFilterCloseBtn = document.querySelector('.js-filter-close')


function openFilter() {
  elFilter.classList.add('our-projects__filter--open')
  elFilterBtn.removeEventListener('click', openFilter)
  elFilterCloseBtn.addEventListener('click', closeFilter)
}

function closeFilter() {
  elFilter.classList.remove('our-projects__filter--open')
  elFilterBtn.addEventListener('click', openFilter)
  elFilterCloseBtn.addEventListener('click', closeFilter)
}

if (elFilterBtn) {
  elFilterBtn.addEventListener('click', openFilter)
}
