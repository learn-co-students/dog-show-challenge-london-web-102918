const dogsTable = document.getElementById('table-body')
const dogsURL = 'http://127.0.0.1:3000/dogs'
const dogForm = document.getElementById('dog-form')
const updateDog = document.querySelector('input[type=submit]')


let formID = document.querySelector('#id')
function fetchDogs() {
  fetch(`${dogsURL}`)
  .then(response => response.json())
  .then(dogs => renderDogs(dogs))
}

function renderDogs(dogsArray) {
  dogsArray.forEach((dog) => {
    let dogRow = document.createElement('tr')
    let dogName = document.createElement('td')
    let dogBreed = document.createElement('td')
    let dogSex = document.createElement('td')
    let dogEdit = document.createElement('button')

    dogRow.id = dog.id
    dogName.className = 'name'
    dogBreed.className = 'breed'
    dogSex.className = 'sex'
    dogEdit.id = `btn-${dog.id}`

    dogName.innerText = dog.name
    dogBreed.innerText = dog.breed
    dogSex.innerText = dog.sex
    dogEdit.innerText = 'Edit'

    dogRow.appendChild(dogName)
    dogRow.appendChild(dogBreed)
    dogRow.appendChild(dogSex)
    dogRow.appendChild(dogEdit)

    document.getElementById('table-body').appendChild(dogRow)

    let formName = document.querySelector('input[name=name]')
    let formBreed = document.querySelector('input[name=breed]')
    let formSex = document.querySelector('input[name=sex]')
    let formID = document.querySelector('#id')
    dogEdit.addEventListener('click', () => {
      formName.value = dog.name
      formBreed.value = dog.breed
      formSex.value = dog.sex
      formID.value = dog.id
})
  })
}

function editDog(id) {
  let dog = document.getElementById(`${id}`)
  let dogName = dog.querySelector('.name').innerText
  let dogBreed = dog.querySelector('.breed').innerText
  let dogSex = dog.querySelector('.sex').innerText


  dogForm.querySelector('input[name=name]').value = dogName
  dogForm.querySelector('input[name=breed]').value = dogBreed
  dogForm.querySelector('input[name=sex]').value = dogSex
  }

function saveDog(id) {
  let formName = document.querySelector('input[name=name]').value
  let formBreed = document.querySelector('input[name=breed]').value
  let formSex = document.querySelector('input[name=sex]').value
  fetch(`${dogsURL}/${id.value}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json',
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: formName,
      breed: formBreed,
      sex: formSex
    })
  }).then((response) => response.json())
  .then((dog) => {
    let dogRow = document.getElementById(`${dog.id}`)
    dogRow.querySelector('.name').innerText = dog.name
    dogRow.querySelector('.breed').innerText = dog.breed
    dogRow.querySelector('.sex').innerText = dog.sex
  })

}
fetchDogs()

dogForm.querySelector('input[type=submit]').addEventListener('click', (event) => {
  console.log(event);
  event.preventDefault()
  saveDog(id)})
