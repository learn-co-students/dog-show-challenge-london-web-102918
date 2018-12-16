const dogsTable = document.getElementById('table-body')
const dogsURL = 'http://127.0.0.1:3000/dogs'
// TODO: WHY IS THE CONST NOT WORKING (null values)
// const dogForm = document.getElementById('dog-form')
// const updateDog = dogForm.querySelector('input[type=submit]')

// TODO: DOGS NOT SAVING


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
  console.log("IM IN ");
  let dog = document.getElementById(`${id}`)
  let dogName = dog.querySelector('.name').innerText
  let dogBreed = dog.querySelector('.breed').innerText
  let dogSex = dog.querySelector('.sex').innerText
  let dogForm = document.getElementById('dog-form')
  const updateDog = document.querySelector('input[type=submit]')
  dogForm.querySelector('input[name=name]').value = dogName
  dogForm.querySelector('input[name=breed]').value = dogBreed
  dogForm.querySelector('input[name=sex]').value = dogSex
  document.querySelector('input[type=submit]').addEventListener('click', console.log('YO'))
}

function saveDog(id) {
  let formName = document.querySelector('input[name=name]').value
  let formBreed = document.querySelector('input[name=breed]').value
  let formSex = document.querySelector('input[name=sex]').value
  console.log(`${formName}`);
  console.log(`${formBreed}`);
  console.log(`${formSex}`);
  console.log(`${id}`);
  fetch(`${dogsURL}/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: formName,
      breed: formBreed,
      sex: formSex
    })
  })
  fetchDogs
}
fetchDogs()
