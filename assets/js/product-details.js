window.addEventListener('load' , ()=>{ 
    
    let xhr = new XMLHttpRequest(); // This is a Requst to API

    xhr.onload = ()=> { // stats of request = 4

        if(xhr.status === 200){

            let product = JSON.parse(xhr.responseText); // This is product as a object after we trsnform it from text"string"
            let content = ""; // This is the place that we will dissplay a product details here in JSpage
            let details = document.getElementById('details'); // This is the place in HTMLpage that we will put the product detail in it which called here "content" up

            content = `
                <img src="product.image">
            `;

            details.innerHTML = content;
        } // success Respone 

    } // end of API load 
    
    let id= location.search.slice(1).split('=')[1];

    xhr.open('GET' , `https://69b309b1e224ec066bdb526a.mockapi.io/products/product?id=${id}`);
    xhr.send();


}); // end of window load