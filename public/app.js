document.getElementById('addMeal').addEventListener('click', event => {
  event.preventDefault()

  axios.post('/api/burgers', {
    burger_name: document.getElementById('meal').value,
    devoured: false
  })
    .then(({ data }) => {
      const burgerElem = document.createElement('li')
      burgerElem.className = 'list-group-item'
      burgerElem.id = data.id
      burgerElem.innerHTML = `
       <div class="d-flex w-100 justify-content-between">
         <h5 class="mb-1">${document.getElementById('meal').value}</h5>
         <button 
          data-burger-name="${document.getElementById('meal').value}"
          class="purchase btn btn-success">✓</button>
       </div>
      `
      document.getElementById('notDevoured').append(burgerElem)

      document.getElementById('meal').value = ''
    })
    .catch(err => console.error(err))
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('purchase')) {
    axios.put(`/api/burgers/${event.target.parentNode.parentNode.id}`, {
      devoured: true
    })
      .then(() => {
        const burgerElem = document.createElement('li')
        burgerElem.className = 'list-group-item'
        burgerElem.id = event.target.parentNode.parentNode.id
        burgerElem.innerHTML = `
       <div class="d-flex w-100 justify-content-between">
         <h5 class="mb-1">${event.target.dataset.burgerName}</h5>
         <button class="btn btn-danger remove">X</button>
       </div>
      `
        console.log(event.target.dataset)
        document.getElementById('devoured').append(burgerElem)
        event.target.parentNode.parentNode.remove()
      })
      .catch(err => console.error(err))
  } else if (event.target.classList.contains('remove')) {
    axios.delete(`/api/burgers/${event.target.parentNode.parentNode.id}`)
      .then(() => {
        event.target.parentNode.parentNode.remove()
      })
      .catch(err => console.error(err))
  }
})
