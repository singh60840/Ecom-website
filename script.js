document.addEventListener('DOMContentLoaded',()=>{
    const products = [
        {id: 1, name: "product 1",price:29.99},
        {id: 2, name: "product 2",price:19.99},
        {id: 3, name: "product 3",price:59.99},
        {id: 4, name: "product 4",price:159.99},
    ];

const cart =[]

const productList=document.getElementById("product-list");
const cartItems=document.getElementById("cart-items");
const emptycartMessage=document.getElementById("empty-cart");
const cartTotalmessage=document.getElementById("cart-total");
const totalPriceDisplay=document.getElementById("total-price");
const checkoutButton= document.getElementById("checkout-btn");

products.forEach(product =>{
   const productdiv= document.createElement('div');
   productdiv.classList.add('product')
   productdiv.innerHTML= `
   <span>${product.name} - $${product.price.toFixed(2)}</span>
   <button data-id=" ${product.id}">Add to cart</button>`;

   productList.appendChild(productdiv);

});

productList.addEventListener('click',(e)=>{
    if(e.target.tagName==='BUTTON'){
        const productId=parseInt( e.target.getAttribute('data-id'))
        const product=products.find(p=> p.id ===productId)
        console.log(product);
        
        addToCart(product);
    }
});

function addToCart(product){
cart.push(product);
renderCart();
}

function renderCart(){
    cartItems.innerHTML="";
    let totalprice=0;
    if(cart.length>0){
        emptycartMessage.classList.add('hidden');
        cartTotalmessage.classList.remove('hidden');
        cart.forEach((item,index)=>{
            totalprice +=item.price;
            const cartItem=document.createElement('div')
            cartItem.innerHTML=`${item.name}- $${item.price.toFixed(2)}`

            cartItems.appendChild(cartItem);
            totalPriceDisplay.textContent=`${totalprice.toFixed(2)}`;
        })

    }else{
        emptycartMessage.classList.remove('hidden');
        totalPriceDisplay.textContent=`$0.00`;
       
    }
}

checkoutButton.addEventListener('click',()=>{
    cart.length=0;
    alert("Checkout Succesfullly");
    renderCart();
})















});