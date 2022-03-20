function createElement(tag, parent, attributes, innerText) {
  const element = document.createElement(tag)
  parent.appendChild(element)
  if (attributes) {
    attributes.forEach((attribute) => {
      element.setAttribute(attribute.name, attribute.value)
    })
  }
  if (innerText) {
    element.innerText = innerText;
  }
  return element;
}

let calculPrice = []
let calculArticles = []
let fetchPromises = []

// création du tableau qui contenir l'ensemble des prix 
cart = JSON.parse(localStorage.getItem('cart')) 
console.table(cart)

if(cart === null) {
  cart = []
}
// tableau article = ProductId | color | numberProduct
for(let i = 0; i < cart.length; i++) {
  let cartProduct = cart[i]
  let articleId = cartProduct.ProductId
  let colorChosen = cartProduct.color
 
  const fetchPromise = fetch(`http://localhost:3000/api/products/${articleId}`)
    .then((res) => res.json()) 
    .then((value) => {
      
      // ==/ Création de l'article 
      let blockItems = document.getElementById('cart__items')
      let article = createElement("article", blockItems, [{
        name : "class",
        value : "cart__item",
      },
      {
        name : "dataset.id",
        value : `${articleId}`,
      },
      {
        name : "dataset.color",
        value : `${colorChosen}`,
      },])

      // ==/==/ Création du block img 
      let blockImg = createElement("div", article, [{
        name : "class",
        value : "cart__item__img",
      }])

      // ==/==/==/ Incorporation de l'image
      let productImg = createElement("img", blockImg, [{
        name : 'alt',
        value : value.altTxt,
      },
      {
        name : 'src',
        value : value.imageUrl,
      }])
      
      // ==/==/ contenu article 
      let blockItemContent = createElement("div", article, [{
        name : "class",
        value : "cart__item__content"
      }])

      // ==/==/==/ Description article 
      let blockItemContentDescription = createElement("div", blockItemContent, [{
        name :"class",
        value : "cart__item__content__description",
      }])

      // ==/==/==/==/ Titre de l'article
      let articleName = createElement("h2", blockItemContentDescription, [], value.name)
      
      // ==/==/==/==/ Couleur de l'article
      let articleColor = createElement("p", blockItemContentDescription, [], cartProduct.color)
   
      // ==/==/==/==/ Prix de l'article
      let totalProductPrice = value.price*cartProduct.numberProduct
      let articlePrice = createElement("p", blockItemContentDescription, [], totalProductPrice )
  
      // ==/==/==/==/ Block settings
      
      let blockItemContentSettings = createElement("div", blockItemContent, [{
        name : "class",
        value : "cart__item__content__settings",
      }])

      // ==/==/==/==/==/  block quantity
      let blockItemContentSettingsQuantity = createElement("div", blockItemContentSettings, [{
        name : "class",
        value : "cart__item__content__settings__quantity",
      }])

      let itemsQuantity = createElement("p", blockItemContentSettingsQuantity, [], `Qté : ${cartProduct.numberProduct}`  )

      let inputQuantity = createElement("input", blockItemContentSettingsQuantity, [{
        name : "type",
        value : "number",
      },
      {
        name : "class",
        value : "itemQuantity",
      },
      {
        name : "name",
        value : "itemQuantity",
      },
      {
        name : "min",
        value : "1",
      },
      {
        name : "max",
        value : "100"
      },
      {
        name : "value",
        value : cartProduct.numberProduct,
      }])
       inputQuantity.addEventListener('change', function(e) {
        let quantity = e.target.value
        itemsQuantity.innerText = `Qté : ${quantity}`
        cartProduct.numberProduct = Number(quantity)
        if (quantity >= 101 || quantity <= 0) return;
        localStorage.removeItem('cart')
        const cartString = JSON.stringify(cart)
        localStorage.setItem('cart', cartString)
        window.location.reload()     
      })

      let blockItemContentSettingsDelete = createElement("div", blockItemContentSettings, [{
        name : "class",
        value : "cart__item__content__settings__delete"
      }])

      let deleteItem = createElement("p", blockItemContentSettingsDelete, [{
        name : "class",
        value : "deleteItem"
      }], "Supprimer")
      deleteItem.addEventListener("click", function(e) { 
        cart.splice(i, 1)
        const cartString = JSON.stringify(cart)
        localStorage.removeItem('cart')
        localStorage.setItem('cart', cartString)
        window.location.reload()   
      }) 
      
      calculPrice.push(totalProductPrice) 
  
    })
    .catch(function(err) {
      console.log(err)
    })
// création d'un tableau fetch pour récuper les données totales après leurs éxécution
  fetchPromises.push(fetchPromise)
  console.log(fetchPromises)
}
//// Affichage du total de la commande qui attends la réalisation des promesses 
//Affichage de la quantité d'articles
blockQuantity = document.getElementById("totalQuantity")
blockQuantity.innerText = cart.length
//Affichage du prix total 
async function waitFetch() {
  await Promise.all(fetchPromises) 
  for (let i = 0; i < fetchPromises.length; i++) {
    let totalPrice = calculPrice.reduce((a, b)=> a + b,0)   
    blockPrice = document.getElementById("totalPrice")
    blockPrice.innerText = totalPrice
  }
}
waitFetch()

///récupération des id du panier
let productId = cart.map(x => x.ProductId)
console.log(productId)

// récupération du message d'erreur
function getInputError(message, errorMessage){
  document
    .getElementById(message)
    .innerText = errorMessage}

//création d'un objet contenant les filtre de validation du form

const inputValidators = {
  firstNameInputValidator: undefined,
  lastNameInputValidator: undefined,
  addressInputValidator: undefined,
  cityInputValidator: undefined,
  emailInputValidator: undefined,
}


//création d'une fonction qui nous permet de paramétrer les inputs
function inputParameters(tag, regex, validator, message, errorMessage) {
  const element = document.getElementById(tag)
  element.addEventListener("change", function(e) {
    if(regex.test(e.target.value)) {
      inputValidators[validator] = true
    } else {
      inputValidators[validator] = false
      getInputError(message, errorMessage)
    }
  })
}

// Application de fonction sur chaque input
inputParameters("firstName", /[^\d]+/, "firstNameInputValidator", "firstNameErrorMsg", "veuillez saisir un prénom valide")
inputParameters("lastName", /[^\d]+/, "lastNameInputValidator", "lastNameErrorMsg", "Veuillez saisir un nom valide")
inputParameters("address", /[^\d]+/, "addressInputValidator", "addressErrorMsg", "Veuillez saisir une adresse valide")
inputParameters("city", /[^\d]+/, "cityInputValidator", "addressErrorMsg","Veuillez saisir une commune valide")
inputParameters("email", /^\S.*@\S+$/, "emailInputValidator", "emailErrorMsg", "veuillez saisir une adresse E-mail valide")

// création de l'évènement du submit
let submit = document.getElementById("order")
submit.addEventListener("click", function(e) {
  console.log('test')
  e.preventDefault()
  e.stopPropagation()
  // application d'une condition prenant en compte les filtres
  if (inputValidators.firstNameInputValidator === true && inputValidators.lastNameInputValidator === true && inputValidators.addressInputValidator === true && inputValidators.cityInputValidator === true && inputValidators.emailInputValidator === true) {
    
    // récupération des données du formulaire 
    let customerFirstName = document.getElementById("firstName").value
    //let customerFirstName = firstName.value
    let customerLastName = document.getElementById("lastName").value
    let customerAddress = document.getElementById("address").value
    let customerCity = document.getElementById("city").value
    let customerEmail = document.getElementById("email").value
    
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
      let orderResponse = JSON.stringify(value.orderId)
      localStorage.setItem("orderNumber", orderResponse);
      document.location.href="http://localhost:5500/html/confirmation.html"
    })
    .catch(function(err) {
      console.log(err)
    })
  }
})