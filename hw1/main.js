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

const LOCAL_API = "data.json"

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
       makeGETRequest(LOCAL_API, (data) => {
           this.goods = data
           console.log(data)
           this.renderAll()
       }, this.goods
       )
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


class BasketList extends ProductsList {
    constructor(contaner){
        super(contaner, BasketProduct)
    }

    getFullSum() {
        return this.allProducts.reduce((accum, item ) => accum += +item.price)
    }

    addProductToBascket(item){
        this.goods.add(item)
    }


}


function makeGETRequest(url=LOCAL_API, callback, errorCallback = (error) => console.log(error)){
  fetch(url)
      .then(result => result.json())
      .then(result => callback(result))
      .catch(error => errorCallback(error))

}

let productsTemp = new ProductsList();

