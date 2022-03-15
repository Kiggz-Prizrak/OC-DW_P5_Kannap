const getOrderId = localStorage.getItem("orderNumber")
console.log(getOrderId)
const cardNumberOrder= document.getElementById('orderId') 
cardNumberOrder.innerText =  getOrderId
