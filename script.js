
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");


if(bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active')
    })
}

if(close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active')
    })
}





let carts = document.querySelectorAll(".shop-item-button");

let products =[
    {
        name: 'T-shirt',
        tag: 'f1',
        price : 78,
        inCart: 0
    },
    {
        name: 'T-shirt',
        tag: 'f2',
        price : 75,
        inCart: 0
    },
    {
        name: 'T-shirt',
        tag: 'f3',
        price : 78,
        inCart: 0
    },
    {
        name: 'T-shirt',
        tag: 'f4',
        price : 78,
        inCart: 0
    },
    {
        name: 'T-shirt',
        tag: 'f5',
        price : 78,
        inCart: 0
    },
    {
        name: 'T-shirt',
        tag: 'f6',
        price : 78,
        inCart: 0
    },
    {
        name: 'Bagge',
        tag: 'f7',
        price : 78,
        inCart: 0
    },
    {
        name: 'Blouse',
        tag: 'f8',
        price : 78,
        inCart: 0
    },
    {
        name: 'Blouse',
        tag: 'n1',
        price : 78,
        inCart: 0
    },
    {
        name: 'T-shirt',
        tag: 'n2',
        price : 78,
        inCart: 0
    },
    {
        name: 'Blouse',
        tag: 'n3',
        price : 78,
        inCart: 0
    },
    {
        name: 'T-shirt',
        tag: 'n4',
        price : 78,
        inCart: 0
    },
    {
        name: 'T-shirt',
        tag: 'n5',
        price : 78,
        inCart: 0
    },
    {
        name: 'Short',
        tag: 'n6',
        price : 78,
        inCart: 0
    },
    {
        name: 'T-shirt',
        tag: 'n7',
        price : 78,
        inCart: 0
    },
    {
        name: 'T-shirt',
        tag: 'n8',
        price : 60,
        inCart: 0
    },
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', (event) => {
        event.preventDefault();
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartsNumbers');
    if(productNumbers) {
        document.querySelector('#lg-bag span').textContent = productNumbers;
        document.querySelector('#mobile span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartsNumbers')
    productNumbers = parseInt(productNumbers)
    if( productNumbers ) {
        localStorage.setItem("cartsNumbers", productNumbers + 1)
        document.querySelector('#lg-bag span').textContent = productNumbers + 1;
        document.querySelector('#mobile span').textContent = productNumbers + 1;
    }else{
        localStorage.setItem("cartsNumbers", 1)
        document.querySelector('#lg-bag span').textContent = 1
        document.querySelector('#mobile span').textContent = 1

    }

    updateCartIcon();

    setItems(product);
   
}



function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems)
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ... cartItems, 
                [product.tag]: product
            } 
        }
        cartItems[product.tag].inCart += 1  
    }else{
        product.inCart = 1
        cartItems = {
        [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    
}

function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");
    if(cartCost != null){
        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCost", cartCost + product.price)
    }else{
        localStorage.setItem('totalCost', product.price)
    }
}


function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    console.log(cartItems);
    let cartCost = localStorage.getItem("totalCost");

    if( cartItems && productContainer ) {
       productContainer.innerHTML = '';
       Object.values(cartItems).map(item => {
        productContainer.innerHTML +=   
        `<div class="product">
            <i class="fas fa-trash remove-btn" data-tag="${item.tag}"></i>
            <img src="./images/products/${item.tag}.jpg" >
            <span class="name">${item.name}</span>
        </div>
        <div class="price">$${item.price}.00</div>
        <div class=" quantity input">
         
        <input type="number" class="item-quantity" value="${item.inCart}" min="1" data-tag="${item.tag}">
        </div>
        <div class="total">
        $${item.inCart * item.price}.00
        </div>`
        
       })

       productContainer.innerHTML += 
       `
       <div class="basketTotalContainer">
           <h4 class="basketTotalTitle">
               Basket Total
           </h4>
           <h4 class="basketTotal"> $${cartCost}.00 </h4>
         
       </div>
       <div class="btn-container">
       <button class="checkout-btn">Check Out</button>
       </div>
      
       `

         // Add event listeners to input fields for quantity adjustment
        const quantityInputs = document.querySelectorAll('.item-quantity');
        quantityInputs.forEach(input => {
            input.addEventListener('change', () => {
                const tagToUpdate = input.getAttribute('data-tag');
                const newQuantity = parseInt(input.value);
                updateQuantity(tagToUpdate, newQuantity);
            });
        });

        onLoadCartNumbers();
        updateCartIcon()

        // Check if there are items in the cart before showing the message
        if (Object.keys(cartItems).length > 0) {
            const checkoutButton = document.querySelector('.checkout-btn');
            checkoutButton.addEventListener('click', () => {
                alert("Thanks for your patronage! See you soon.");
            });
        }



    }

    const deleteButtons = document.querySelectorAll('.remove-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tagToDelete = button.getAttribute('data-tag');
            removeFromCart(tagToDelete);
        });
    });
}

function updateQuantity(tag, newQuantity) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems && cartItems[tag]) {
        const itemToUpdate = cartItems[tag];
        const oldQuantity = itemToUpdate.inCart;
        const pricePerItem = itemToUpdate.price;

        // Update the cart total cost
        let cartCost = localStorage.getItem("totalCost");
        cartCost = parseInt(cartCost) - (pricePerItem * oldQuantity) + (pricePerItem * newQuantity);
        localStorage.setItem("totalCost", cartCost);

        // Update the item quantity in the cart
        itemToUpdate.inCart = newQuantity;

         // Update cart numbers
         let productNumbers = localStorage.getItem('cartsNumbers');
         productNumbers = parseInt(productNumbers) - oldQuantity + newQuantity;
         localStorage.setItem("cartsNumbers", productNumbers);

        // Update the cart in localStorage
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));

        // Refresh the cart display
        displayCart();
    }
}



onLoadCartNumbers();
displayCart();


function removeFromCart(tag) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems && cartItems[tag]) {
        const itemToRemove = cartItems[tag];
        const cartCost = localStorage.getItem("totalCost");

        // Reduce the cart total cost
        const newCartCost = parseInt(cartCost) - (itemToRemove.inCart * itemToRemove.price);
        localStorage.setItem("totalCost", newCartCost);

        // Remove the item from the cart
        delete cartItems[tag];
        
    // Update cart numbers
    let productNumbers = localStorage.getItem('cartsNumbers');
    productNumbers = parseInt(productNumbers) - itemToRemove.inCart;
    localStorage.setItem("cartsNumbers", productNumbers);

    // Update the cart in localStorage
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    displayCart();
    
    }
}

function updateCartIcon() {
    let productNumbers = localStorage.getItem('cartsNumbers');
    productNumbers = parseInt(productNumbers) || 0; // Ensure it's a number

    // Update the cart icon
    document.querySelector('#lg-bag span').textContent = productNumbers;
    document.querySelector('#mobile span').textContent = productNumbers;
}








