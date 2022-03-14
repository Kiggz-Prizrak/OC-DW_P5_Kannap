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
      
      let addA = document.createElement('a')
      
      let box = document.getElementById("items")
      addA.href = `./product.html?id=${article._id}`
      box.appendChild(addA)
      
      
      let addArticle = document.createElement('article')
      addA.appendChild(addArticle)

      let addImg = document.createElement('img')
      addImg.alt = article.altTxt
      addImg.src = article.imageUrl
      addArticle.appendChild(addImg)

      let addTitle = document.createElement('h3')
      addTitle.class = "productName"
      addTitle.innerText = article.name
      addArticle.appendChild(addTitle)
      
      let addDescription = document.createElement('p')
      addDescription.innerText = article.description
      addDescription.class = "ProductDescription"
      addArticle.appendChild(addDescription)
    }
  })
  .catch(function(err) {
    console.log(err)
  })
}
getKanaps()

