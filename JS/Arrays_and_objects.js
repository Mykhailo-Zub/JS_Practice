// find average

function findAverage1(array) {
  let sum = 0;
  let amount = 0;
  for (let i = 0; i < array.length; i += 1) {
    if (i % 2 !== 0 && array[i] % 2 !== 0) {
      sum += array[i];
      amount += 1;
    }
  }
  const result = sum / amount;
  console.log("Find average 1: ", result);
  return result;
}

function findAverage2(array) {
  let amount = 0;
  const sum = array.reduce((sum, el, i) => {
    if (el % 2 !== 0 && i % 2 !== 0) {
      amount += 1;
      return (sum += el);
    } else return sum;
  }, 0);
  const result = sum / amount;
  console.log("Find average 2: ", result);
  return result;
}

findAverage1([4, 3, 2, 53, 33, 32, 345, 353, 32, 78, 89]);
findAverage2([4, 3, 2, 53, 33, 32, 345, 353, 32, 78, 89]);

// count amount of check

const goods = [
  {
    name: "tea",
    amount: 3,
    price: 56,
  },
  {
    name: "cofee",
    amount: 1,
    price: 110,
  },
  {
    name: "milk",
    amount: 2,
    price: 29,
  },
  {
    name: "beer",
    amount: 15,
    price: 21,
  },
  {
    name: "fish",
    amount: 0.46,
    price: 360,
  },
];

function countAmount(array) {
  let sum = 0;
  array.forEach((el) => {
    const { amount, price } = el;
    sum += amount * price;
  });
  console.log("Count amount: ", sum);
  return sum;
}

countAmount(goods);

// create object from array
const arrayOfGoods = [
  ["tea", 3, 56],
  ["cofee", 1, 110],
  ["milk", 2, 29],
  ["beer", 15, 21],
  ["fish", 0.46, 360],
];

function createObject(array) {
  const result = array.reduce((arr, el, i) => {
    const [name, amount, price] = el;
    arr[i] = {
      name: name,
      amount: amount,
      price: price,
    };
    return arr;
  }, []);
  console.log("Create object: ", result);
  return result;
}

createObject(arrayOfGoods);

// filter object

const filteringObject = { a: "asd", asd: [1, 2, 3], bret: "qwe", bta: 123 };

function filterObjectByName(object, filter) {
  const newObject = {};
  for (names in object) {
    if (names.includes(filter)) {
      newObject[names] = object[names];
    }
  }
  console.log("Filter object by name: ", newObject);
  return newObject;
}

filterObjectByName(filteringObject, "a");
