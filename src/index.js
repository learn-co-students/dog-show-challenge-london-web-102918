document.addEventListener('DOMContentLoaded', () => {

dogsApi = `http://localhost:3000/dogs`

const tableBody = document.querySelector('#table-body')
const dogForm = document.querySelector('#dog-form')
const nameInput = document.getElementsByName('name')[0]
const breedInput = document.getElementsByName('breed')[0]
const sexInput = document.getElementsByName('sex')[0]
let currentDog = 0



const fetchDogs = () => {
    fetch(dogsApi)
    .then(resp => resp.json())
    .then(renderDogs)
  }

  const renderDogs = (dogArray) => {
    dogArray.forEach(renderSingleDog)
  }

  const renderSingleDog = (dog) => {
    const tableContent = document.createElement('tr')
    tableContent.id = dog.id
    tableContent.innerHTML =
    `
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex}</td>
      <td><button data-dogid=${dog.id} class="edit-btn"> Edit Dog</button></td>
      `
      tableBody.appendChild(tableContent)
    }

function handleEdit(event) {
  console.log(event)
currentDog = event.target.dataset.dogid
  if (event.target.className === 'edit-btn') {
    const tableRow = event.target.parentNode.parentNode
    let dogName = tableRow.children[0].innerHTML
    let dogBreed = tableRow.children[1].innerHTML
    let dogSex = tableRow.children[2].innerHTML

    nameInput.value = dogName
    breedInput.value = dogBreed
    sexInput.value = dogSex

  }
}

function updateDog(event) {
  event.preventDefault()
  fetch(`${dogsApi}/${currentDog}`, {
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: nameInput.value,
      breed: breedInput.value,
      sex: sexInput.value

    })
  }).then(res => res.json())
  .then(updateFront)
  dogForm.reset()
}

function updateFront(dog) {
let dogRow = document.getElementById(dog.id)
dogRow.children[0].innerHTML = dog.name
dogRow.children[1].innerHTML = dog.breed
dogRow.children[2].innerHTML = dog.sex
}


tableBody.addEventListener('click', handleEdit)
dogForm.addEventListener('submit', updateDog)


fetchDogs()



})
