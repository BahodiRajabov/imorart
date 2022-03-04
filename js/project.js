import { API } from "./main.js"
const projectId = JSON.parse(localStorage.getItem('projectId'))

const elMaterialTemplate = document.querySelector('#material-template').content
const elMaterialList = document.querySelector('.materials__list')
// PROJECT
const elProjectTemplate = document.querySelector('#project-gallery-temp').content
const elProjectList = document.querySelector('.project-info__gallery')
// CAROUSEL
const elCarouselTemplate = document.querySelector('#carousel-temp').content
const elCarouselList = document.querySelector('.carousel__list')

function showProject() {
  fetch(API + '/api/projects')
  .then(res => res.json())
  .then(data => {
    if(data.success) {
      getProject(data.data.projects)
    }
  })
  .catch(err => console.log(err))
}

function getProject(projects) {
  if(projects.length > 0) {

    const currentProject = projects.find(project => project.id === projectId)
    const elProjectFragment = document.createDocumentFragment()
    const elCarouselFragment = document.createDocumentFragment()

    const currentYear= new Date(currentProject.category.updated_at).getFullYear(); 

    document.querySelector('.project-hero__heading').textContent = currentProject.name
    document.querySelector('.project-hero__type-style').textContent = currentProject.category.name
    document.querySelector('.project-hero__type-year').textContent = currentYear

    elMaterialTemplate.querySelector('.materials__img').src = API + '/uploads/images/' + currentProject.material.image.src
    elMaterialTemplate.querySelector('.materials__desc').textContent = currentProject.material.name

    elMaterialList.append(elMaterialTemplate)
    

    for (const image of currentProject.project_images) {
      const projectClone = elProjectTemplate.cloneNode(true)
      const carouselClone = elCarouselTemplate.cloneNode(true)
      
      projectClone.querySelector('.project-info__gallery-img-content').src = API + '/uploads/images/' + image.image.src
      carouselClone.querySelector('.carousel__img-content').src = API + '/uploads/images/' + image.image.src
      
      elProjectFragment.append(projectClone)
      elCarouselFragment.append(carouselClone)
    }

    elProjectList.append(elProjectFragment)
    elCarouselList.append(elCarouselFragment)

  }
}

showProject()
