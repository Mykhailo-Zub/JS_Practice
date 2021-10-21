class CustomArray {
  constructor(...args) {
    this.array = args;
  }

  customPush(item) {
    this.array[this.array.length] = item;
  }

  customPop() {
    this.array.length = this.array.length - 1;
  }

  customForEach(callback) {
    for (let i = 0; i < this.array.length; i++) {
      callback(this.array[i], i, this.array);
    }
  }

  customMap(callback) {
    const newArray = [];
    for (let i = 0; i < this.array.length; i++) {
      newArray[i] = callback(this.array[i], i);
    }
    return newArray;
  }

  customFilter(callback) {
    const newArray = [];
    for (let i = 0, j = 0; i < this.array.length; i++) {
      if (callback(this.array[i], i)) {
        newArray[j] = this.array[i];
        j++;
      }
    }
    return newArray;
  }

  customFind(callback) {
    for (let i = 0; i < this.array.length; i++) {
      if (callback(this.array[i], i)) {
        return this.array[i];
      }
    }
    return;
  }

  customEvery(callback) {
    const newArray = [];
    for (let i = 0, j = 0; i < this.array.length; i++) {
      if (callback(this.array[i], i)) {
        newArray[j] = this.array[i];
        j++;
      }
    }
    if (newArray.length === this.array.length) {
      return true;
    } else return false;
  }

  customSome(callback) {
    const newArray = [];
    for (let i = 0; i < this.array.length; i++) {
      if (callback(this.array[i], i)) {
        newArray[0] = this.array[i];
        break;
      }
    }
    if (newArray[0] === undefined) {
      return false;
    } else return true;
  }

  log() {
    console.log(this.array);
  }
}

let customArray = new CustomArray(10, "awda", 4, "awd", null, 65, 48);

customArray.customPush("this is push");

customArray.log();

customArray.customPop();

customArray.log();

customArray.customForEach((el, i, array) => console.log(el, i, array));

const mappedCustomArray = customArray.customMap((el, i) => el + "" + i);

console.log(mappedCustomArray);

const filteredCustomArray = customArray.customFilter((el, i) => typeof el === "number");

console.log(filteredCustomArray);

const foundCustomArray = customArray.customFind((el, i) => el > 50);

console.log(foundCustomArray);

const everyCustomArray = customArray.customEvery((el, i) => el !== 50);

console.log(everyCustomArray);

const someCustomArray = customArray.customSome((el, i) => el === "awd");

console.log(someCustomArray);
