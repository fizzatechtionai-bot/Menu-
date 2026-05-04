const prompt = require("prompt-sync")();

let products = [
    {name : "laptop" , price : 50000 , inStock : true},
    {name : "mouse" , price : 1500 , inStock : false}
];  

let choice = 0;
while (choice !== 9){

    showMenu();
    choice = Number(prompt("Enter your choice: "));
    if (choice === 1){
        showProducts(products);
    }
    else if (choice === 2){
        addProduct(products);
        console.log("");
        showProducts(products);
    }
    else if (choice === 3){
        let findProduct = getProductName("Enter the name of the product to find: ");
        checkProduct(findProduct, products);
    }
    else if (choice === 4){
        let delProduct = getProductName("Enter the name of the product to delete from the list: ");
        deleteProduct(delProduct, products);
    }
    else if (choice === 5){
        let prodName = getProductName("Enter the name of the product to update: ");
        updateProduct(prodName, products);
    }
    else if (choice === 6){
        showAvailableProducts(products);
    }
    else if (choice === 7){
        let minPrice = getProductPrice("Enter minimum price for the products: ");
        if(isNaN(minPrice) || minPrice < 0){
            console.log("Invalid Price");
        }else{
            showProductsAbovePrice(products, minPrice);
        }
        
    }
    else if (choice === 8){
       showOutOfStocProducts(products);
        
    }
    else if (choice === 9){
        console.log("Program Ended.");
        
    }
    else{
        console.log("Invalid choice. ");
    }
}





function showProducts(products){
    if (products.length === 0) {
        console.log("No products available.");
        return;
    }

    console.log("Product List:");
    for(let i = 0 ; i < products.length ; i++){
        if(products[i].inStock === true){
            console.log(products[i].name + " - " + products[i].price + " - Available");
        } else{
            console.log(products[i].name + " - " + products[i].price + " - Out of Stock");
        }
    }
}

function addProduct(products){
    let iname = getProductName("Enter name of product: ");
    if(iname === ""){
        console.log("Product name cannot be empty.");
        return;
    }
    for (let i =0 ; i < products.length; i++){
        if( iname === products[i].name){
            console.log("Product already exists.");
            return;
        }
    }
    let iprice = getProductPrice("Enter price of the product: ");
    if(isNaN(iprice) || iprice <= 0){
        console.log("Invalid price.");
        return;
    }
    let inStock = getStockStatus("Is the product available? (yes/no): ");
    // let inStock = inStockInput ;

    // if(inStockInput === "yes"){
    //     inStock = true;
    // }

    let newProduct ={
        name : iname,
        price : iprice,
        inStock : inStock
    };
    products.push(newProduct);
    console.log("Product added successfully!");
}

function checkProduct(name, products){
    if(name === ""){
        console.log("Product name cannot be empty.");
        return;
    }
    let found = false;
    let status = "Out of Stock";
    for(let i = 0 ;  i < products.length ; i++){
        if( name === products[i].name){
            console.log("Product found!");
            console.log("Name: " + products[i].name);
            console.log("Price: " + products[i].price);
            if(products[i].inStock === true){
                status = "Available";
            }
            
            console.log("Status: " + status);

            found = true;
            break;
        }
    }
    if(found === false){
        console.log("Product not found.");
    }
}

function deleteProduct(name, products){
    if(name === ""){
        console.log("Product name cannot be empty.");
        return;
    }
    let found  = false;

    for(let i = 0 ; i < products.length ; i++){
        if(name === products[i].name){
            products.splice(i, 1);
            console.log("Product deleted successfully! ");
            found   = true;
            showProducts(products);
            break;
        }
    }
    if(found === false){
        console.log("Product not found.");
    }
}
function updateProduct(name, products) {
    let found = false;

    if(name === ""){

        console.log("Product name cannot be empty.");
        return;
    }
    for (let i = 0; i < products.length; i++) {
        if (name === products[i].name) {
            found = true;

            let newName = getProductName("Enter the new name for the product: ");
            if(newName === ""){
                console.log("Product name cannot be empty.");
                return;
            }

            for (let j = 0; j < products.length; j++) {
                if (j !== i && products[j].name === newName) {
                    console.log("Another product with this name already exists.");
                    return;
                }
            }
            
            let newPrice = getProductPrice("Enter price for the product: ");
            if(isNaN(newPrice) || newPrice <= 0){
                console.log("Invalid price.");
                return;
            }

            let newStock = getStockStatus("Is the product available? (yes/no): ");
            // let newStock = stockInput;
            // if (stockInput === "yes") {
            //     newStock = true;
            // }

            products[i].name = newName;
            products[i].price = newPrice;
            products[i].inStock = newStock;

            console.log("Product updated successfully!");
            showProducts(products);
            break;
        }
    }

    if (found === false) {
        console.log("Product not found.");
    }
}

function getProductName(message){
    let name = prompt(message).trim().toLowerCase();
    return name;
}

function getProductPrice(message){
    let price = Number(prompt(message));
    return price;
}

function getStockStatus(message){
    let stockInput = prompt(message).trim().toLowerCase();
    if (stockInput === "yes"){
        return true;
    }else{
        return false;
    }
}


function showMenu(){
    console.log("");
    console.log("1. Show Products");
    console.log("2. Add Product");
    console.log("3. Find Product");
    console.log("4. Delete Product");
    console.log("5. Update Product");
    console.log("6. Show Available Products");
    console.log("7. Show Products above Price");
    console.log("8. Show Out of Stock Products");
    console.log("9. Exit");

    return;
}

function showAvailableProducts(products){
    let found = false;
    console.log("Available Products:");
    for (let i = 0; i < products.length; i++) {
        if (products[i].inStock === true) {
            console.log(products[i].name + " - " + products[i].price + " - Available");
            found = true;
        }
    }

    if (found === false) {
        console.log("No available products.");
    }
}

function showProductsAbovePrice(products, minPrice){
    let found  = false;
    for(let i = 0 ; i < products.length ; i++){
        
        if(products[i].price > minPrice){
            if(found === false){
            console.log("Products Above Price:");

        }
            found = true;
             if(products[i].inStock === true){
            console.log(products[i].name + " - " + products[i].price + " - Available");
            } else{
                console.log(products[i].name + " - " + products[i].price + " - Out of Stock");
            }
        }
    }

    if(found === false)
    {
        console.log("No product found above this price.");
    }
        
}

function showOutOfStocProducts(products){
    let found = false;
    for(let i = 0 ; i < products.length ; i++){
        if (products[i].inStock === false){
            if(found === false){
                console.log("Out of Stock Products:");
            }
            console.log(products[i].name + " - " + products[i].price + " - Out of Stock");
            found = true;
        }
    }
    if(found === false){
        console.log("No out of stock products.");
    }
}