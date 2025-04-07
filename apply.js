Function.prototype.selfApply = function (thisArg, argArray) {
  console.log("selfApply被執行了");

  // 1. 獲取需要被執行的函數
  let fn = this; // 利用隱式綁定特性，知道 this 就會是該函數

  // 2. 將 thisArg 轉換為物件類型
  thisArg = thisArg ? Object(thisArg) : window; // 如果 thisArg 是 null 或 undefined，則設置為 window

  // 3. 調用需要被執行的函數
  thisArg._fn = fn;
  let args = argArray || []; // 如果 argArray 是 null 或 undefined，則設置為空陣列
  let result = thisArg._fn(...args); // 使用展開運算符將陣列展開為參數列表

  // 4. 刪除 thisArg 上的 _fn 屬性
  delete thisArg._fn;

  // 5. 返回函數的執行結果
  return result;
};

function foo() {
  console.log("foo 函數被執行了", this);
}

function sum(num1, num2) {
  console.log("sum 函數被執行了", this, num1, num2);
  return num1 + num2;
}

// 測試 selfApply 方法
foo.selfApply("abc");
sum.selfApply({ name: "sum" }, [1, 2]);
