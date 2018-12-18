const apiURL = 'http://localhost:3000/dogs'
const nameEl = document.querySelector('#form-name')
const breedEl = document.querySelector('#form-breed')
const sexEl = document.querySelector('#form-sex')
const dogTableEl = document.querySelector('#table-body')
const formNameEl = document.querySelector('#form-name')
const formBreedEl = document.querySelector('#form-breed')
const formSexEl = document.querySelector('#form-sex')
let state
// let state = {
//   currentlyEditingTaskEl: null
// }


function fetchDogs() {
  fetch(apiURL)
    .then(response => response.json())
    .then(renderDogs)
}

function renderDogs (dogsArray) {
  console.log(dogsArray)
  dogsArray.forEach(renderSingleDog)
}

function renderSingleDog(dog) {
    const dogEl = document.createElement('tr')
    dogEl.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class ='edit-button' data-id='${dog.id}'>Edit</button></td>`
    dogTableEl.append(dogEl)


        const editButton = dogEl.querySelector('.edit-button')
        editButton.addEventListener('click', (e) => {
          formNameEl.value = dog.name
          formBreedEl.value = dog.breed
          formSexEl.value = dog.sex
          state = dog.id
      })

      const submitButton = document.querySelector('#submit_button')
      submitButton.addEventListener('click', (e) => {
        e.stopPropagation()
        updateDogs(state).then(console.log)
      })

}

const updateDogs = (dogId) => {
  // Form Values
  const nameVal = formNameEl.value
  const breedVal = formBreedEl.value
  const sexVal = formSexEl.value

  return fetch(apiURL + `/${dogId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name: nameVal,
                          breed: breedVal,
                          sex: sexVal})
  }).then(res => res.json())


}


  fetchDogs()
