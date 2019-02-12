const products = [
    {title: "Notebook", price: 1500},
    {title: "mouse", price: 20},
    {title: "Keyboard", price: 35},
    {title: "Monitor", price: 300},
    {title: "Chair", price: 55},
    {title: "Gamepad", price: 135},
    {title: "Notebook", price: 1500},
    {title: "mouse", price: 20},
    {title: "Keyboard", price: 35},

];


class Product {
    constructor(title, price, img = 'https://placehold.it/200x150') {
        this.title = title;
        this.price = price;
        this.img = img;
    }
}


class ProductItem extends Product {
    constructor(title, price, img = 'https://placehold.it/200x150') {
        super(title, price, img);
        console.log(this.title)
    }

    render() {
        return `<div class="product-item">
           <img src="${this.img}" alt="Some img">
            <div class="desc">
                <h3>${this.title}</h3>
                <p>$${this.price}</p>
            </div>
         </div>`;
    }
}


class ProductsList {
    constructor(container = '.products', element = ProductItem) {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._getProducts();
        this.element = element
    }

    _getProducts() {
        this.goods = products;
    }

    renderAll() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new this.element(product.title, product.price);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}

class BasketProduct extends Product {
    constructor(title, price, img = 'https://placehold.it/200x150', count = 1) {
        super(title, price, img);
        this.count = count
    }

    _fullPrice() {
        return +this.count * +this.price
    }

    render() {
        return `<div class="basket-item">
           <img src="${this.img}" alt="Some img">
            <div class="desc">
                <h3>${this.title}</h3>
                <p>$${this.price}</p>
                
            </div>
            <div>
                <p>Колличество: ${this.count}</p>
                <p>Полная ценна: $${this._fullPrice()}</p>
            </div>
         </div>`;
    }


}


let productsTemp = new ProductsList();
productsTemp.renderAll();