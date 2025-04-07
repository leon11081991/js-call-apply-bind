Function.prototype.selfBind = function (thisArg, ...argArray) {
  console.log("selfBind被執行了");

  // 1. 獲取需要被執行的函數
  let fn = this; // 利用隱式綁定特性，知道 this 就會是該函數

  // 2. 將 thisArg 轉換為物件類型
  thisArg = thisArg ? Object(thisArg) : window; // 如果 thisArg 是 null 或 undefined，則設置為 window

  // 3. 需返回一個新的函數
  function proxyFn(...args) {
    thisArg._fn = fn; // 將函數綁定到 thisArg 上

    // 4. 將 args 陣列與 argArray 陣列合併
    // 這樣可以實現類似於 Function.prototype.bind 的效果
    // 這裡的 args 陣列是 proxyFn 函數的參數
    // 這裡的 argArray 陣列是 selfBind 函數的參數
    let finalArgs = argArray.concat(args); // 將 args 陣列與 argArray 陣列合併

    // 5. 調用需要被執行的函數
    let result = thisArg._fn(...finalArgs); // 使用展開運算符將陣列展開為參數列表

    // 6. 刪除 thisArg 上的 _fn 屬性
    delete thisArg._fn;

    return result; // 返回函數的執行結果
  }

  return proxyFn;
};

function foo() {
  console.log("foo 函數被執行了", this);
}

function sum(num1, num2) {
  console.log("sum 函數被執行了", this, num1, num2);
  return num1 + num2;
}

// Web API bind:
// let newSum = sum.bind({ name: "sum" }, 1, 2);
// newSum();

// let newSum = sum.bind({ name: "sum" });
// newSum(1, 2);

// let newSum = sum.bind({ name: "sum" }, 3);
// newSum(1);

// 測試 selfBind 方法
// let newSum = sum.selfBind({ name: "sum" }, 1, 2);
// newSum();

let newSum = sum.selfBind({ name: "sum" }, 2);
newSum(9);
