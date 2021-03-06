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
let order = {};
let price = 0;
let breadPrice = 0;
let sizePrice = 0;
let addlPrice = 0;

let elPizzaSizeRadioTemplate = document.querySelector('.pizza-size-radio-template').content;
let elPizzaToppingCheckboxTemplate = document.querySelector('.pizza-topping-checkbox-template').content;
let toppingTemplate = document.querySelector('.toppings-template').content;

let elPizzaForm = document.querySelector('.pizza-form');
let elPizzaSizes = elPizzaForm.querySelector('.pizza-form__sizes');
let elPizzaToppings = elPizzaForm.querySelector('.pizza-form__toppings');
let elPizzaAddl = document.querySelector(".pizza-form__addl");
let elPizzaSortResult = document.querySelector(".pizza-form__sort-result");
let elSelect = document.querySelector(".pizza-form__field")
let toppingsList = document.querySelector('.toppings')


function createSizeRadio(size) {
  let elSizeRadio = elPizzaSizeRadioTemplate.cloneNode(true);
  elSizeRadio.querySelector('.radio__input').value = size.size;
  elSizeRadio.querySelector('.radio__control').textContent = size.size + ' ' + ' cm';
  return elSizeRadio;
}

function showPizzaSizeRadios() {
  let elSizeRadiosFragment = document.createDocumentFragment();
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

function createToppingCheckbox(topping) {
  let elToppingCheckbox = elPizzaToppingCheckboxTemplate.cloneNode(true);
  elToppingCheckbox.querySelector('.checkbox__input').value = topping.name;
  elToppingCheckbox.querySelector('.checkbox__control').textContent = topping.name;
  return elToppingCheckbox;
}


function showPizzaToppings() {
  let elToppingsFragment = document.createDocumentFragment();
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



showPizzaSizeRadios();
showPizzaToppings();

let sizeResult = document.querySelector(".pizza-form__size-result")
let elsSizeRadio = document.querySelectorAll('.radio__input');
if (elsSizeRadio.length > 0) {
  elsSizeRadio.forEach(function (radio) {
    radio.addEventListener('change', function () {
      order.size = pizzaOptions.sizes.find(size => size.size === Number(radio.value));
      sizeResult.textContent = `${order.size.name}  ${order.size.size} cm`

      sizePrice = order.size.price
      document.querySelector('.pizza-form__all-cost').textContent = breadPrice + price + sizePrice + addlPrice
    });
  });
}

elSelect.addEventListener("change", () => {
  order.breadTypes = pizzaOptions.breadTypes.find(breadTypes => breadTypes.name === elSelect.value)
  document.querySelector(".pizza-form__sort-result").textContent = order.breadTypes.name;
  breadPrice = order.breadTypes.price
  document.querySelector('.pizza-form__all-cost').textContent = breadPrice + price + sizePrice + addlPrice
})


const arr = [];
let elToppinInput = document.querySelectorAll(".checkbox__input");

elToppinInput.forEach(item => {
  item.addEventListener("click", () => {
    if (item.checked) {
      order.topCheck = pizzaOptions.toppings.find(e => e.name == item.value)
      price += order.topCheck.price
    }
    else if (!item.checked) {
      order.topCheck = pizzaOptions.toppings.find(e => e.name == item.value)
      price -= order.topCheck.price
    }
    document.querySelector(".pizza-form__all-cost").textContent = price + breadPrice + addlPrice + sizePrice;

  })
})

elToppinInput.forEach(item => {
  item.addEventListener('click', () => {

    if (arr.includes(item.value)) {
      const index = arr.findIndex(e => e === item.value)
      arr.splice(index, 1)
    }
    else {
      arr.push(item.value)
    }
    displayD(arr)
  })
})
function displayD(arry) {
  toppingsList.innerHTML = "";
  const frg = document.createDocumentFragment();

  arry.forEach(item => {
    let elT = toppingTemplate.cloneNode(true)
    elT.querySelector(`li`).textContent = item

    frg.appendChild(elT)
  })
  toppingsList.appendChild(frg);
}
