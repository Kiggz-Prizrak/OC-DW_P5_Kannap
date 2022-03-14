cart = JSON.parse(localStorage.getItem('cart')) 
console.table(cart)
// tableau article = ProductId | color | numberProduct
for(let i = 0; i < cart.length; i++) {
  let cartProduct = cart[i]
  let articleId = cartProduct.ProductId
  let colorChosen = cartProduct.color
 
  fetch(`http://localhost:3000/api/products/${articleId}`)
    .then((res) => res.json()) 
    .then((value) => {
      
      // ==/ Création de l'article 
      let blockItems = document.getElementById('cart__items')
      let article = document.createElement('article')
      article.className = "cart__item"
      article.dataset.id = `${articleId}`
      article.dataset.color = `${colorChosen}`
      blockItems.appendChild(article)

      // ==/==/ Création du block img 
      let blockImg = document.createElement('div')
      blockImg.className = "cart__item__img"
      article.appendChild(blockImg)

      // ==/==/==/ Incorporation de l'image
      let productImg = document.createElement('img')
      productImg.alt = value.altTxt
      productImg.src = value.imageUrl
      blockImg.appendChild(productImg)
      
      // ==/==/ contenu article 
      let blockItemContent = document.createElement('div')
      blockItemContent.className = "cart__item__content"
      article.appendChild(blockItemContent)

      // ==/==/==/ Description article 
      let blockItemContentDescription = document.createElement("div")
      blockItemContentDescription.className = "cart__item__content__description"
      blockItemContent.appendChild(blockItemContentDescription)

      // ==/==/==/==/ Titre de l'article
      let articleName = document.createElement("h2")
      articleName.innerText = value.name
      blockItemContentDescription.appendChild(articleName)
      
      // ==/==/==/==/ Couleur de l'article
      let articleColor = document.createElement("p")
      articleColor.innerText = cartProduct.color
      blockItemContentDescription.appendChild(articleColor)
      
      // ==/==/==/==/ Prix de l'article
      let articlePrice = document.createElement("p")
      articlePrice.innerText = `${value.price} €`
      blockItemContentDescription.appendChild(articlePrice)

      // ==/==/==/==/ Block settings
      let blockItemContentSettings = document.createElement("div")
      blockItemContentSettings.className = "cart__item__content__settings"
      blockItemContent.appendChild(blockItemContentSettings)

      // ==/==/==/==/==/  block quantity 
      let blockItemContentSettingsQuantity = document.createElement("div")
      blockItemContentSettingsQuantity.className = "cart__item__content__settings__quantity"
      blockItemContentSettings.appendChild(blockItemContentSettingsQuantity)

      let itemsQuantity = document.createElement("p")
      itemsQuantity.innerText = `Qté : ${cartProduct.numberProduct}`
      blockItemContentSettingsQuantity.appendChild(itemsQuantity)

      let inputQuantity = document.createElement("input")
      inputQuantity.type = "number"
      inputQuantity.className = "itemQuantity"
      inputQuantity.name = "itemQuantity"
      inputQuantity.min = "1"
      inputQuantity.max = "100"
      inputQuantity.value = cartProduct.numberProduct
      blockItemContentSettingsQuantity.appendChild(inputQuantity)
      inputQuantity.addEventListener('change', function(e) {
        let quantity = e.target.value
        itemsQuantity.innerText = `Qté : ${quantity}`
        cartProduct.numberProduct = Number(quantity)
        if (quantity >= 101 || quantity <= 0) return;
        localStorage.removeItem('cart')
        const cartString = JSON.stringify(cart)
        localStorage.setItem('cart', cartString)    
      })

      let blockItemContentSettingsDelete = document.createElement("div")
      blockItemContentSettingsDelete.className = "cart__item__content__settings__delete"
      blockItemContentSettings.appendChild(blockItemContentSettingsDelete)

      let deleteItem = document.createElement("p")
      deleteItem.className = "deleteItem"
      deleteItem.innerText = "Supprimer"
      blockItemContentSettingsDelete.appendChild(deleteItem)
      deleteItem.addEventListener("click", function(e) { 

        cart.splice(1, i)
        const cartString = JSON.stringify(cart)
        localStorage.removeItem('cart')
        localStorage.setItem('cart', cartString)   
        }) 
      //////////////////////////////////////////////

     total = cart.reduce(x => value.price)

     console.log(total)

      ///////////////////////////////////////////
      
    })
    .catch(function(err) {
      console.log(err)
    })
}

///////////////////////////////////////////////

///récupération des id du panier

let productId = cart.map(x => x.ProductId)
console.log(productId)


////////////////////////////////////////////////////


function getInputError(message, errorMessage){
  document
    .getElementById(message)
    .innerText = errorMessage}

let firstNameInputValidator = undefined;
let lastNameInputValidator = undefined;
let adressInputValidator = undefined;
let cityInputValidator = undefined;
let emailInputValidator = undefined;
//====FIRSTNAME
let firstNameInput = document.getElementById("firstName")
firstNameInput.addEventListener("change", function(e){
  if(/[^\d]+/.test(e.target.value)) {
    firstNameInputValidator = true
    let firstName = e.target.value
  } else if (e.target.value === "") {
    firstNameInputValidator = false
    getInputError("firstNameErrorMsg","veuillez saisir les informations sur le champs")
  } else {
    firstNameInputValidator = false
    getInputError("firstNameErrorMsg","Vous n'avez pas saisi les bonnes informations")
  }
})
//====LAST NAME
let lastNameInput = document.getElementById("lastName")
lastNameInput.addEventListener("change", function(e){
  if(/[^\d]+/.test(e.target.value)) {
    lastNameInput  = true
    let lastName = e.target.value
  } else if (e.target.value === "") {
    lastNameInput = false
    getInputError("lastNameErrorMsg","veuillez saisir les informations sur le champs")
  } else {
    lastNameInput = false
    getInputError("lastNameErrorMsg","Vous n'avez pas saisi les bonnes informations")
  }
})
//==== ADRESSE
let addressInput = document.getElementById("address")
addressInput.addEventListener("change", function(e){
  if(/[^\d]+/.test(e.target.value)) {
    addressInputValidator = true
    let address = e.target.value
  } else if (e.target.value === "") {
    addressInput = false
    getInputError("addressErrorMsg","veuillez saisir les informations sur le champs")
  } else {
    addressInput = false
    getInputError("addressErrorMsg","Vous n'avez pas saisi les bonnes informations")
  }
})
//==== Ville
let cityInput = document.getElementById("city")
cityInput.addEventListener("change", function(e){
  if(/[^\d]+/.test(e.target.value)) {
    cityInputValidator = true
    let city = e.target.value
  } else if (e.target.value === "") {
    cityInput = false
    getInputError("cityErrorMsg","veuillez saisir les informations sur le champs")
  } else {
    cityInputValidator = false
    getInputError("cityErrorMsg","Vous n'avez pas saisi les bonnes informations")
  }
})
//==== EMAIL
let emailInput = document.getElementById("email")
emailInput.addEventListener("change", function(e){
  if(/[^\d]+/.test(e.target.value)) {
    emailInputValidator = true
    let email = e.target.value
    console.log(email)
   
  } else if (e.target.value === "") { 
    emailInputValidator = false
    getInputError("adressErrorMsg","veuillez saisir les informations sur le champs")
  } else {
    emailInputValidator = false
    getInputError("adressErrorMsg","Vous n'avez pas saisi les bonnes informations")
  }
}) 


let submit = document.getElementById("order")
submit.addEventListener("click", function(e) {
  e.preventDefault()
  e.stopPropagation()
  if (firstNameInputValidator === true || lastNameInputValidator === true || adressInputValidator === true || cityInputValidator === true || emailInputValidator === true) {
    
    // récupération des données du formulaire 
    let customerFirstName = firstName.value
    let customerLastName = lastName.value
    let customerAddress = address.value
    let customerCity = city.value
    let customerEmail = email.value
    
    //création de l'objet body contetnant les data du form et les éléments du panier
    
    
    const order = {
      contact : {
        "firstName" : customerFirstName,
        "lastName" : customerLastName,
        "address" : customerAddress,
        "city" : customerCity,
        "email" : customerEmail,
      },
      // "products" est une clé obligatoire non précisée sur la documentation 
      "products" : productId
    }
    console.log(`création de la commande ${order}`)
    console.log(order)
   
    //envoies de l'objet vers le serveur  
    //////////////////////////////////////////
    fetch("http://localhost:3000/api/products/order", {
	    method: "POST",
	    headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },  
      body: JSON.stringify(order)
    })
      //récupération de la réponse
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      //récupération de la valeur et envoi vers le localstorage
      .then(value => {
        localStorage.removeItem('cart')
        orderResponse = JSON.stringify(value.orderId)
        localStorage.setItem("orderNumber", orderResponse);
        submit.location.href="http://localhost:5500/html/confirmation.html"
        e.stopPropagation()
      })
      .catch(function(err) {
        console.log(err)
      })
  }
})






// créer un numéro de ticket via "Math.random"