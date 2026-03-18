window.addEventListener('load' , ()=>{ 
    
    let xhr = new XMLHttpRequest(); // This is a Requst to API
    
    let id= --location.search.slice(1).split('=')[1];


    xhr.open('GET' , `assets/js/JSON.js`);

    xhr.onload = ()=> { // stats of request = 4

        if(xhr.status === 200){

            let product = JSON.parse(xhr.responseText); // This is product as a object after we trsnform it from text"string"
            let content = ""; // This is the place that we will dissplay a product details here in JSpage
            let details = document.getElementById('details'); // This is the place in HTMLpage that we will put the product detail in it which called here "content" up

            content = `
                    <div class= "container">
                        <div class= "img" > <img class= "img1" src="${product[id].image}" alt= "${product[id].name}"> </div>

                        <div class= "product">

                            <div class= "info">
                            <h3 class= "title">${product[id].name}</h3>
                            <p class= "desc">${product[id].description} </p>
                            </div>

                            <br><hr> 
                            <div class="price"> <p>${product[id].price}$</p> </div>
                            <br>

                            <div class= "list">
                            <ul>
                                <li>Brand : <span class="brand"> <b>${product[id].brand}</b> </span></li>
                                <li>Category : ${product[id].category}</li>
                                <li>Users's Rate : (${product[id].rating})</li>
                            </ul>
                            </div>

                            <br>

                            <div class= "stock">
                                <span class= "stock1"> <p>in stock :</p> </span>
                                ${product[id].stock}
                            </div>

                            <div class= "Buttons">
                            <button class= "add-to-cart">Add To Cart</button>
                            </div>


                        </div>
                        
                    </div>
            `;

            details.innerHTML = content;
        } // success Respone 
        
    } // end of API load 
    
    xhr.send();

}); // end of window load


