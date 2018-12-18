document.addEventListener('DOMContentLoaded', () => {

    const dogApi = "http://localhost:3000/dogs"
    const dogTable = document.querySelector('#table-body')
    const editFormEl = document.querySelector('#dog-form')
    const dogNameEl = document.querySelector('input[name=name]')
    const dogBreedEl = document.querySelector('input[name=breed]')
    const dogSexEl = document.querySelector('input[name=sex]')
    const dogTableName = document.querySelector('.dog-name')
    const dogTableBreed = document.querySelector('.dog-breed')
    const dogTableSex = document.querySelector('.dog-sex')
    const editBtn = document.querySelector('.edit-btn')
    const dogName = document.querySelector('#dogName')

    let editingDogId

    // let state = {
    //     editingDogId: null,
    // }
   
    //fetch list of dogs from API
    function fetchDogs() {
        fetch(dogApi)
            .then(res => res.json())
            .then(renderDogs)
    }

    //format list of dogs and append to table
    function renderDogs(dogArray) {
        console.log(dogArray)

        dogArray.forEach(renderSingleDog)
    }

    function renderSingleDog(dog) {
        const dogTableInfo = document.createElement('tr')
        dogTableInfo.innerHTML = `
            <td class="dog-name">${dog.name}</td>
            <td class="dog-breed">${dog.breed}</td>
            <td class="dog-sex">${dog.sex}</td>
            <td><button data-dogid=${dog.id} class="edit-btn">Edit</button></td>
        `
        dogTable.appendChild(dogTableInfo)
        
    }

    //patch dog edit
    const patchEdit = (event) => {
        event.preventDefault()
        console.log(event)
        const dName = dogNameEl.value
        const dBreed = dogBreedEl.value
        const dSex = dogSexEl.value


        fetch(dogApi + `/${editingDogId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: dName, breed: dBreed, sex: dSex})
        })
        .then(res => res.json())
        .then((dog) => {
            dogTable.querySelector('.dog-name').innerText = dog.name
            dogTable.querySelector('.dog-breed').innerText = dog.breed
            dogTable.querySelector('.dog-sex').innerText = dog.sex
        })
    }

    dogTable.addEventListener('click', popEditDog)

    function popEditDog(event) {
        event.preventDefault()
        let editDogName = event.target.parentNode.parentNode.querySelector('.dog-name').innerText
        let editDogBreed = event.target.parentNode.parentNode.querySelector('.dog-breed').innerText
        let editDogSex = event.target.parentNode.parentNode.querySelector('.dog-sex').innerText
    

        dogName.value = editDogName
        dogBreedEl.value = editDogBreed
        dogSexEl.value = editDogSex

        editingDogId = event.target.dataset.dogid
    }

    // const getUpdatedDogs = (event) => {
    //     fetch(dogApi {
    //         method: 'GET',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({name: dName, breed: dBreed, sex: dSex})
    //     })
    //     .then(res => res.json())
    // }

    fetchDogs()
    editFormEl.addEventListener('submit', patchEdit)
    // getUpdatedDogs()

})