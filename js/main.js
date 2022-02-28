// API
const API = `http://147.182.187.59:3000`

// FOR FILTER TOGGLE
const elFilter = document.querySelector('.our-projects__filter')
const elFilterBtn = document.querySelector('.js-filter-btn')
const elFilterCloseBtn = document.querySelector('.js-filter-close')

// GET PAGE LOCATION
function getPageURL() {
  return window.location.href
}

// OUR PROJECTS PAGE
function ourProjectPage() {
  // CATEGORIES
  const elCategoryTemplate = document.querySelector('#categories-template').content
  const elCategoriesList = document.querySelector('.our-projects__list')

  function showCategories() {
    fetch(API + '/api/categories')
      .then(res => res.json())
      .then(data => {
        getCategories(data.data.categories)
      })
  }

  function getCategories(categories) {
    const categoryFragment = document.createDocumentFragment()

    for (const category of categories) {
      const elCategory = elCategoryTemplate.cloneNode(true)
      elCategory.querySelector('.our-projects__btn-txt').textContent = category.name
      elCategory.querySelector('.our-projects__btn').dataset.filter = category.name.trim()
      categoryFragment.appendChild(elCategory)
    }

    elCategoriesList.appendChild(categoryFragment)

  }

  // http://147.182.187.59:3000/api/projects/api/projects

  showCategories()
}
// HOME PAGE
function homePage() {
  // PLANS
  const elPlansTemplate = document.querySelector('#plans-template').content
  const elPlansList = document.querySelector('.plans-services__grid')
  // PARTNERS
  const elPartnerTemplate = document.querySelector('#partners-template').content
  const elPartnerList = document.querySelector('.partners__list')

  // PLANS LIST
  function showPlans() {
    fetch(API + '/api/plans')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          getPlans(data.data)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  // RENDER PLANS
  function getPlans(plans) {
    const planFragment = document.createDocumentFragment()

    for (let plan of plans.plans) {
      const elPlan = elPlansTemplate.cloneNode(true)
      const planListFragment = document.createDocumentFragment()

      elPlan.querySelector('.plans-services__item-heading').textContent = plan.name
      elPlan.querySelector('.plans-services__desc-sum').textContent = plan.price + '$'

      if (plan.plan_lists) {
        plan.plan_lists.forEach(planList => {
          const elPlanItem = document.createElement('li')
          const elPlanMark = document.createElement('span')
          const elPlanText = document.createElement('p')

          elPlanItem.setAttribute('class', 'plans-services__item-plan')
          elPlanMark.setAttribute('class', 'mark')
          elPlanText.setAttribute('class', 'plans-services__item-text')

          elPlanText.textContent = planList.name

          elPlanItem.appendChild(elPlanMark)
          elPlanItem.appendChild(elPlanText)

          planListFragment.appendChild(elPlanItem)
        })

        elPlan.querySelector('.plans-services__item-list').appendChild(planListFragment)
      }

      planFragment.appendChild(elPlan)
    }

    elPlansList.appendChild(planFragment)
  }

  // PARTNERS
  function showPartners() {
    fetch(API + '/api/partners')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          getPartners(data.data.partners)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  // RENDER PARTNERS
  function getPartners(partners) {
    const elPartnerFragment = document.createDocumentFragment()
    for (let partner of partners) {
      const partnerClone = elPartnerTemplate.cloneNode(true)

      partnerClone.querySelector('.partners__link').href = partner.url
      partnerClone.querySelector('.partners__img').src = API + '/uploads/images/' + partner.image.src

      elPartnerFragment.appendChild(partnerClone)
    }
    elPartnerList.appendChild(elPartnerFragment)
  }

  showPartners()

  showPlans()
}
// PROJECT PAGE
function projectPage() {
  const elMaterialTemplate = document.querySelector('#material-template').content
  const elMaterialList = document.querySelector('.materials__list')

  function showMaterials() {
    fetch('http://147.182.187.59:3000/api/materials')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          getMaterials(data.data.materials)
        }
      })
  }

  function getMaterials(materials) {
    const materialFragment = document.createDocumentFragment()
    for (let material of materials) {
      const materialClone = elMaterialTemplate.cloneNode(true)

      materialClone.querySelector('.materials__img').src = API + '/uploads/images/' + material.image.src
      materialClone.querySelector('.materials__desc').textContent = material.name

      materialFragment.appendChild(materialClone)
    }
    elMaterialList.appendChild(materialFragment)
  }

  showMaterials()

}

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
// IF USER ON OUR PROJECTS PAGE
if (window.location.href.match('our-projects.html')) {
  ourProjectPage()
} else if (window.location.href.match('index.html')) {
  homePage()
} else if (window.location.href.match('/project.html')) {
  projectPage()
} else {
  homePage()
}
