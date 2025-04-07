// 使用原型鏈的方式來擴展 Function 類別，實現一個自定義的 selfCall 方法
Function.prototype.selfCall = function (thisArg, ...args) {
  console.log("selfCall被執行了");

  // 1. 獲取需要被執行的函數
  let fn = this; // 利用隱式綁定特性，知道 this 就會是該函數

  // 2. 將 thisArg 轉換為物件類型
  thisArg = thisArg ? Object(thisArg) : window; // 如果 thisArg 是 null 或 undefined，則設置為 window

  // 3. 調用需要被執行的函數
  thisArg._fn = fn;
  let result = thisArg._fn(...args);

  // 4. 刪除 thisArg 上的 fn 屬性
  delete thisArg._fn;

  // 5. 返回函數的執行結果
  return result;
};

function foo() {
  console.log("函數被執行了");
}

function sum(num1, num2) {
  return num1 + num2;
}

// 測試 selfCall 方法
foo.selfCall();
sum.selfCall({ name: "sum" }, 1, 2);
