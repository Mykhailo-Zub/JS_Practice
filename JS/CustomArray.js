class CustomArray {
  constructor() {
    this.array = [];
    for (let i = 0; i < arguments.length; i++) {
      this.array[i] = arguments[i];
    }
  }

  customPush(item) {
    this.array[this.array.length] = item;
  }

  customPop() {
    const newArray = [];
    for (let i = 0; i < this.array.length - 1; i++) {
      newArray[i] = this.array[i];
    }
    this.array = newArray;
  }

  customForEach(callback) {
    for (let i = 0; i < this.array.length; i++) {
      callback(this.array[i], i);
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
      if (typeof callback(this.array[i], i) === "boolean" && callback(this.array[i], i) === true) {
        newArray[j] = this.array[i];
        j++;
      }
    }
    return newArray;
  }

  customFind(callback) {
    const newArray = [];
    for (let i = 0; i < this.array.length; i++) {
      if (typeof callback(this.array[i], i) === "boolean" && callback(this.array[i], i) === true) {
        newArray[0] = this.array[i];
        break;
      }
    }
    if (newArray[0] === undefined) {
      return;
    } else return newArray;
  }

  customEvery(callback) {
    const newArray = [];
    for (let i = 0, j = 0; i < this.array.length; i++) {
      if (typeof callback(this.array[i], i) === "boolean" && callback(this.array[i], i) === true) {
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
      if (typeof callback(this.array[i], i) === "boolean" && callback(this.array[i], i) === true) {
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

// customArray.customPush("this is push");

// customArray.log();

// customArray.customPop();

// customArray.customForEach((el, i) => console.log(el, i));

// const mappedCustomArray = customArray.customMap((el, i) => el + "" + i);

// console.log(mappedCustomArray);

// const filteredCustomArray = customArray.customFilter((el, i) => typeof el === "number");

// console.log(filteredCustomArray);

// const foundCustomArray = customArray.customFind((el, i) => el > 50);

// console.log(foundCustomArray);

// const everyCustomArray = customArray.customEvery((el, i) => el !== 50);

// console.log(everyCustomArray);

// const someCustomArray = customArray.customSome((el, i) => el === "awd");

// console.log(someCustomArray);
