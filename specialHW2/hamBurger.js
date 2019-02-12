// keys const
const cheese = "cheese";
const salate = "salate";
const patates = "patates";
const spice = "spice";
const mayonnaise = "mayonnaise";
const calorie = "calorie";
const price = "price";

// Base Name const
const smallBurger = "SmallBurger";
const bigBurger = "BigBurger";

// map for init ingridients
const ingridiens = {
    cheese: {
        price: 10,
        calorie: 20
    },
    patates: {
        price: 15,
        calorie: 10
    },
    salate: {
        price: 20,
        calorie: 5
    },
    spice: {
        price: 15,
        calorie: 0
    },
    mayonnaise: {
        price: 20,
        calorie: 5
    }
};


class Burger {
    constructor() {
        this.title = smallBurger;
        this.price = 50;
        this.calorie = 20;
    }

    info() {
        return `${this.title} for $${this.price} have ${this.calorie} ${calorie}`
    }
}

// instance of builder patern for burger
class BurgerBuilder {
    constructor() {
        this._burger = new Burger();
        this._withIngridients = false;
        this._withMayonnaise = false;
        this._withSpices = false;
    }

    _makeWithIngridiens(ingridients) {
        if (!this._withIngridients) {
            this._withIngridients = true;
            this._burger.title = `${this._burger.title} with ${ingridients}`;
            this._addIngridient(ingridients);
        } else {
            console.log("we already have ingridient!!!")
        }
    }

    _addIngridient(ingridients) {
        this._burger.price += ingridiens[ingridients][price];
        this._burger.calorie += ingridiens[ingridients][calorie];
    }

    build() {
        return this._burger
    }

    makeBig() {

        if (this._burger.title.startsWith(smallBurger)) {
            this._burger.title = this._burger.title.replace(smallBurger, bigBurger);
            this._burger.calorie += 20;
            this._burger.price += 50;
        }
    }

    makeWithCheese() {
        this._makeWithIngridiens(cheese)
    }

    makeWithPatate() {
        this._makeWithIngridiens(patates)
    }

    makeWithSalate() {
        this._makeWithIngridiens(salate)
    }

    addSpice() {
        if (!this._withSpices) {
            this._withSpices = true;
            this._burger.title = `Spicy ${this._burger.title}`;
            this._addIngridient(spice)
        }
    }

    addMayonnaise() {
        if (!this._withMayonnaise) {
            this._withSpices = true;
            this._burger.title = `${this._burger.title} with ${mayonnaise}`;
            this._addIngridient(mayonnaise)
        }
    }
}


function calculatePriceAndTitle() {
    let builder = new BurgerBuilder();

    switch (document.getElementById("ing").value) {
        case cheese:
            builder.makeWithCheese();
            break;
        case salate:
            builder.makeWithSalate();
            break;
        case patates:
            builder.makeWithPatate();
            break;
        default:
            break;
    }

    switch (document.getElementById("size").value) {
        case "big":
            builder.makeBig();
            break;
        default:
            break;
    }

    if (document.getElementById("isSpicy").checked) builder.addSpice();
    if (document.getElementById("isMayonnaise").checked) builder.addMayonnaise();

    document.getElementById("result").textContent = builder.build().info()

}