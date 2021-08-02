let pizzaOptions = {
  breadTypes: [
    {
      name: "Yupqa",
      price: 10000
    },
    {
      name: "Qalin",
      price: 10000
    },
    {
      name: "Buxanka",
      price: 7000
    }
  ],
  sizes: [
    {
      name: "Katta",
      size: 35,
      price: 45000
    },
    {
      name: "Kichik",
      size: 25,
      price: 25000
    },
    {
      name: "Oilaviy",
      size: 40,
      price: 50000
    },
    {
      name: "O'rtacha",
      size: 30,
      price: 30000
    }
  ],
  toppings: [
    {
      name: "Pomidor",
      price: 4000
    },
    {
      name: "Birnima",
      price: 1000
    },
    {
      name: "Tuzlangan bodring",
      price: 5000
    },
    {
      name: "Qazi",
      price: 15000
    },
    {
      name: "Kurka go'shti",
      price: 12000
    },
    {
      name: "Zaytun",
      price: 5000
    },
    {
      name: "Qo'ziqorin",
      price: 7000
    }
  ],
  addl: [
    {
      name: "Sosiska",
      price: 7000
    },
    {
      name: "Achchiq",
      price: 6000
    },

  ]
};
let order = {
  type: [],
  size: [],
  topping:[],
  addl: [],
};

var elPizzaSizeRadioTemplate = document.querySelector('.pizza-size-radio-template').content;
var elPizzaToppingCheckboxTemplate = document.querySelector('.pizza-topping-checkbox-template').content;
var elPizzaAddlTemplate = document.querySelector(".pizza-addl-checkbox-template").content;

var elPizzaForm = document.querySelector('.pizza-form');
var elPizzaSizes = elPizzaForm.querySelector('.pizza-form__sizes');
var elPizzaToppings = elPizzaForm.querySelector('.pizza-form__toppings');
var elPizzaAddl = document.querySelector(".pizza-form__addl");
var elPizzaSortResult = document.querySelector(".pizza-form__sort-result");


function createSizeRadio (size) {
  var elSizeRadio = elPizzaSizeRadioTemplate.cloneNode(true);
  elSizeRadio.querySelector('.radio__input').value = size.size;
  elSizeRadio.querySelector('.radio__control').textContent = size.size + ' ' + ' cm';
  return elSizeRadio;
}

function showPizzaSizeRadios () {
  var elSizeRadiosFragment = document.createDocumentFragment();
  pizzaOptions.sizes
    .slice()
    .sort(function (a, b) {
      return a.size - b.size;
    })
    .forEach(function (size) {
      elSizeRadiosFragment.appendChild(createSizeRadio(size))
    });
  elPizzaSizes.appendChild(elSizeRadiosFragment);
}

function createToppingCheckbox (topping) {
  var elToppingCheckbox = elPizzaToppingCheckboxTemplate.cloneNode(true);
  elToppingCheckbox.querySelector('.checkbox__input').name = topping.name;
  elToppingCheckbox.querySelector('.checkbox__control').textContent = topping.name;
  return elToppingCheckbox;
}


function showPizzaToppings () {
  var elToppingsFragment = document.createDocumentFragment();
  pizzaOptions.toppings
    .slice()
    .sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    })
    .forEach(function (topping) {
      elToppingsFragment.appendChild(createToppingCheckbox(topping));
    });
  elPizzaToppings.appendChild(elToppingsFragment);
}

function createAddlCheckbox (addl) {
  var elAddlCheckbox = elPizzaAddlTemplate.cloneNode(true);
  elAddlCheckbox.querySelector(".checkbox-addl__input").value = addl.name;
  elAddlCheckbox.querySelector(".checkbox-addl__control").textContent = addl.name;
  return elAddlCheckbox;
};

function showPizzaAddl () {
  var elAddlFragment = document.createDocumentFragment();
  pizzaOptions.addl
  .slice()
  .sort(function(a,b){
    if (a.name > b.name){
      return 1;
    }
    else if (a.name < b.name){
      return -1;
    }
    return 0;
  })
  .forEach(elAddlItem => {
    elAddlFragment.appendChild(createAddlCheckbox(elAddlItem));
  });
  elPizzaAddl.appendChild(elAddlFragment);
};

showPizzaSizeRadios();
showPizzaToppings();
showPizzaAddl();


var elsSizeRadio = document.querySelectorAll('.radio__input');
if (elsSizeRadio.length > 0) {
  elsSizeRadio.forEach(function (radio) {
    radio.addEventListener('change', function () {
      order.size = pizzaOptions.sizes.find(size => size.size === Number(radio.value));
      console.log(order.size);
    });
  });
}
