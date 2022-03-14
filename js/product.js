
const articleId = new URL(location.href).searchParams.get("id")

fetch(`http://localhost:3000/api/products/${articleId}`)
.then((res) => res.json()) 
.then((value) => {

    //======AFFICHAGE DES ELEMENTS SUR LA PAGE======
    
    //// On affiche les données de l'API (titre, description ... )
    let title = document.getElementById("title")
    title.innerText = value.name
    let description = document.getElementById("description")
    description.innerText = value.description
    let price = document.getElementById("price")
    price.innerText = value.price
      
    //// afficher l'image du produit
    let imgBlock = document.getElementsByClassName("item__img")[0]
    imgBlock.setAttribute("id", 'block_img')
    let addImg = document.createElement('img')
    addImg.alt = value.altTxt
    addImg.src = value.imageUrl
    imgBlock.appendChild(addImg)

    ////afficher les couleurs disponible sur le select
    let colorsList = value.colors
    for(let i = 0; i < colorsList.length; i++) {
        let selectColor = document.getElementById('colors')
        let addOption = document.createElement("option")
        selectColor.appendChild(addOption) 
        addOption.innerText = (colorsList[i])
        addOption.value = (colorsList[i])
    }
    //======RÉCUPÉRATEUR DE DONNÉES======

    //// Récupérateur de la couleur sélectionnée
    const colorSelected = document.getElementById('colors')

    ////Récupérer le nombre de cannapé choisis 
    const quantity = document.getElementById('quantity')
    
    //// on récupère le bouton et on ajoute un type "submit"
    let submitBtn = document.getElementById('addToCart')
    submitBtn.addEventListener('click', () => {
        
        ///// On empêche de poster un article dans le panier sans couleurs ni nombre
        if (Number(quantity.value) >= 101 || Number(quantity.value) <= 0 || colorSelected.value === '--SVP, choisissez une couleur --') return;
        
        //// création d'un objet retenant les données pour le pannier 
        let cartProduct = {
            ProductId : articleId,
            color : colorSelected.value,
            numberProduct : Number(quantity.value),
        }

        ////Verification si le panier est créé 
        let cart = null
        if (localStorage.getItem('cart') === null) { // si null : création du panier 
            cart = []
        } else { // si il existe, on reprend le json et on entre la valeur dans le tableau
            cart = JSON.parse(localStorage.getItem('cart')) 
        }

        //// On empêche la duplication d'article de la même couleur tout en additionnant la valeur

        for(let i = 0; i < cart.length; i++) {
            let cartContent = cart[i]
           
            if(cartContent.color === cartProduct.color) {
                console.table(cart)
                let previousQuantity = Number(cartContent.numberProduct)
                let newQuantity = Number(quantity.value)
                cartProduct.numberProduct = newQuantity + previousQuantity
                let suppr = cart.splice(1, i)   //(cartContent)
                console.table(cart)
            }
        }
        
        //// création du tableau qui reprendra l'ensemble des objets créés
        cart.push(cartProduct)

        ///// conversion du tableau en json et envoi sur le local storage
        const cartString = JSON.stringify(cart)
        localStorage.setItem('cart', cartString)
    })
})
.catch(function(err) {
    // Une erreur est survenue 
})