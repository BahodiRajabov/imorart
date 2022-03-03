import { API } from "./main.js"
// PROJECTS
const elGalleryList = document.querySelector('.gallery__list')
const elGalleryTemplate = document.querySelector('#gallery-template').content
// PLANS
const elPlansTemplate = document.querySelector('#plans-template').content
const elPlansList = document.querySelector('.plans-services__grid')
// PARTNERS
const elPartnerTemplate = document.querySelector('#partners-template').content
const elPartnerList = document.querySelector('.partners__list')

// SHOW PROJECTS
function showProjects() {
  fetch(API + '/api/projects')
  .then(res => res.json())
  .then(data => {
    if(data.success) {
      getProjects(data.data.projects)
    }
  })
  .catch(err => console.log(err))
}

// RENDER PROJECTS
function getProjects(projects) {
  const projectFragment = document.createDocumentFragment()
  
  for (const project of projects) {
    const projectClone = elGalleryTemplate.cloneNode(true)

    projectClone.querySelector('.gallery__figure-link').id = project.id
    projectClone.querySelector('.gallery__img-design').src = API + '/uploads/images/' + project.project_images[0].image.src
    projectClone.querySelector('.gallery__design-heading').textContent = project.name
    projectClone.querySelector('.gallery__design-style').textContent = project.category.name

    projectFragment.append(projectClone)
  }
  elGalleryList.append(projectFragment)
}

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


showProjects()
showPartners()
showPlans()