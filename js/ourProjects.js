import { API } from "./main.js"

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