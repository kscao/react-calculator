import { create, all } from 'mathjs'

//shift + command + L: multi-select cursor


const config = { }
const math = create(all, config)

function isNumber(buttonName) {
    return buttonName === "1" || buttonName === "2" || buttonName === "3" 
    || buttonName === "4" || buttonName === "5" || buttonName === "6" || 
    buttonName === "7" || buttonName === "8" || buttonName === "9" || buttonName === "0"
}

function calculate(obj, buttonName) {

    let op;

    if (buttonName === "AC") {
        return {
            total: null,
            cur: null,
            operation: null
        }
    }else if (isNumber(buttonName)){

        if (buttonName === "0" && obj.cur === "0"){
            return {} //  若两次输入都是0那么什么都不改变
        }

        if (obj.cur) {
            return {
                cur: obj.cur + buttonName,
            }
        }else {
            return {
                cur: buttonName,
            }
        }
    }else if (buttonName === ".") {

        if (obj.cur) {
          // ignore a . if the number already has one
          if (obj.cur.includes(".")) {
            return {};
          }else {
              return {cur: obj.cur + "." };
          }
        }else {
            return { cur: "0." };
        }
      }else if (buttonName === "=") {

        if (obj.operation) {

            let result = obj.total === null ? "0" : obj.total; // eg: * 9 = 0
            let cur = obj.cur === null ? obj.total : obj.cur; // eg: 9 x = 81

            if (obj.operation === "x"){
                op = "*";
            }else if (obj.operation === "÷"){
                op = "/";
            }else {
                op = obj.operation;
            }
            return {
                total: parseFloat(math.evaluate(result + op + cur).toFixed(4)).toString(),
                cur: null,
                operation: null,
            };
           
        } else {
          // '=' with no operation, nothing to do
          return {};
        }
    }else if (buttonName === "+/-") {
        if (obj.cur) {
          return { cur: (-1 * parseFloat(obj.cur)).toString() };
        }
        if (obj.total) {
          return { total: (-1 * parseFloat(obj.total)).toString() };
        }
        return {};
    }else if (buttonName === "%") {
        if (obj.cur) {
            return {
                total: parseFloat(math.evaluate(obj.cur + "/ 100").toFixed(4)).toString(), //parseFloat保留应有的小数点位数
                cur: null
            }
        }

    } else{
        if (obj.operation) {
            if (obj.operation === "x"){
                op = "*";
            }else if (obj.operation === "÷"){
                op = "/";
            }else {
                op = obj.operation;
            }
            return {
                total: parseFloat(math.evaluate(obj.total + op + obj.cur).toFixed(4)).toString(),
                cur: null,
                operation: buttonName,
            };
        }else {
            return {
                total: obj.cur === null ? obj.total : obj.cur,
                cur: null,
                operation: buttonName,
            };
        }
    } 

}

export default calculate