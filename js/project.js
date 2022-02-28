import { API } from "./main.js"
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