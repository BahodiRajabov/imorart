import { API } from "./main.js"
let PROJECTS = null

// CATEGORIES
const elCategoryTemplate = document.querySelector('#categories-template').content
const elCategoriesList = document.querySelector('.our-projects__list')
// PROJECTS
const elGalleryList = document.querySelector('.gallery__list')
const elGalleryTemplate = document.querySelector('#gallery-template').content

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
    elCategory.querySelector('.our-projects__btn').id = category.id
    categoryFragment.appendChild(elCategory)
  }

  elCategoriesList.appendChild(categoryFragment)

}

// SHOW PROJECTS
function showProjects() {
  fetch(API + '/api/projects')
  .then(res => res.json())
  .then(data => {
    if(data.success) {
      PROJECTS = data.data.projects
      getProjects(data.data.projects)
    }
  })
  .catch(err => console.log(err))
}

// RENDER PROJECTS
function getProjects(projects) {
  const projectFragment = document.createDocumentFragment()
  
  if (projects.length < 1) {
    elGalleryList.innerHTML = 'Bunday turdagi mebellar hali mavjud emas('
  } else {
    for (const project of projects) {
      elGalleryList.innerHTML = ''
      const projectClone = elGalleryTemplate.cloneNode(true)
  
      projectClone.querySelector('.gallery__figure-link').id = project.id
      projectClone.querySelector('.gallery__img-design').src = API + '/uploads/images/' + project.project_images[0].image.src
      projectClone.querySelector('.gallery__design-heading').textContent = project.name
      projectClone.querySelector('.gallery__design-style').textContent = project.category.name
  
      projectFragment.append(projectClone)
    }
    elGalleryList.append(projectFragment)
  }
}

// FILTER PROJECTS
function onFilterListClick(evt) {
  const clickedElement = evt.target

  if(clickedElement.dataset.filter === 'all') {
    getProjects(PROJECTS)
  }
  else if(clickedElement.matches('.our-projects__btn')) {
    fetch(API + '/api/projects')
    .then(res => res.json())
    .then(data => {
      if(data.success) {
        const projects = data.data.projects
        getProjects(projects.filter(project => project.category_id === clickedElement.id))
      }
    })
    .catch(err => console.log(err))
  }
}

if (elCategoriesList) {
  elCategoriesList.addEventListener('click', onFilterListClick)
}

showCategories()
showProjects()