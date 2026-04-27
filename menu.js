const prompt = require("prompt-sync")();

let products = [
    {name : "laptop" , price : 50000 , inStock : true},
    {name : "mouse" , price : 1500 , inStock : false}
];  

let choice = Number(prompt("Enter 1 to showProducts, 2 to addProducts : "));
if (choice === 1){
    showProducts(products);
}
else if (choice === 2){
    addProduct(products);
    console.log("");
    showProducts(products);
}
else{
    console.log("Invalid choice. ");
}






function showProducts(products){
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
    let iname = prompt("Enter name of product : ").trim().toLowerCase();
    let iprice = Number(prompt ("Enter price of the product : "));
    let inStockInput = prompt("Is the product available? (yes/no): ").trim().toLowerCase();
    let inStock = false;

    if(inStockInput === "yes"){
        inStock = true;
    }

    let newProduct ={
        name : iname,
        price : iprice,
        inStock : inStock
    };
    products.push(newProduct);
    console.log("Product added successfully !");
}