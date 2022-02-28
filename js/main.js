// API
export const API = `http://147.182.187.59:3000`

// FOR FILTER TOGGLE
const elFilter = document.querySelector('.our-projects__filter')
const elFilterBtn = document.querySelector('.js-filter-btn')
const elFilterCloseBtn = document.querySelector('.js-filter-close')

// FETCH FORM
function fetchForm() {
  const elUserFormData = document.querySelector('.get-in-touch__form')
  const elUserFormDataName = document.querySelector('.js-user-name')
  const elUserFormDataPhone = document.querySelector('.js-user-phone')
  const elUserFormDataMail = document.querySelector('.js-user-mail')
  const elUserFormDataMessage = document.querySelector('.js-user-message')

  elUserFormData.addEventListener('submit', getUserData)

  function getUserData(evt) {
    evt.preventDefault()

    let numbers = /^[+]?[0-9]+$/

    if (elUserFormDataName.value && elUserFormDataPhone.value.match(numbers) && elUserFormDataMail.value && elUserFormDataMessage.value) {
      let formdata = new FormData()
      formdata.append("name", elUserFormDataName.value)
      formdata.append("email", elUserFormDataMail.value)
      formdata.append("number", elUserFormDataPhone.value)
      formdata.append("about", elUserFormDataMessage.value)

      let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      }

      fetch(`${API}/api/submits`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
    }

  }

}

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

fetchForm()
