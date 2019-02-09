const products = [
    {title: "Notebook", price: 1500 },
    {title: "mouse", price: 20},
    {title: "Keyboard", price: 35},
    {title: "Monitor", price: 300},
    {title: "Chair", price: 55},
    {title: "Gamepad", price: 135},
    {title: "Notebook", price: 1500 },
    {title: "mouse", price: 20},
    {title: "Keyboard", price: 35},

];

const renderProduct = (title, price) => {
    return `<div class="product-item"<h3>${title}</h3><p>${price}</p></div>`
};


const renderPage = list => {
    list.map(
        item => {
            document.querySelector('.products').innerHTML += renderProduct(item.title, item.price)
        }
    );

};

renderPage(products);