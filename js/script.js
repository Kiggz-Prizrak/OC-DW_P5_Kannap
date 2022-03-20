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

function getKanaps() {
  fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if(res.ok) {
      return res.json()   
    }
  })
  .then(function(kanaps) {
    for(let i = 0; i < kanaps.length; i++) {
      
      let article = kanaps[i]
      console.log(article)
      
      let box = document.getElementById("items")

      let addA = createElement("a", box, [{
        name : "href",
        value: `./product.html?id=${article._id}`
      }])
      
      let addArticle = createElement("article", addA)

      let addImg = createElement('img', addArticle, [{
        name : "alt",
        value : article.altTxt,
      },
      {
        name : "src",
        value : article.imageUrl,
      }])

      let addTitle = createElement('h3', addArticle, [{
        name : "class",
        value : "ProductName",
      }], article.name)
      
      let addDescription = createElement('p', addArticle, [{
        name : "class",
        value : "ProductName",
      }], article.description)
    }
  })
  .catch(function(err) {
    console.log(err)
  })
}
getKanaps()

