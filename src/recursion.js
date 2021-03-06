/* jshint esversion: 6 */

// Solve the following prompts using recursion.

// In most of the following I use the following sequence:
// base case(s)
// edge case(s)
// general case
// Later, I modified this by implementing a loop.

// comment inserted on 3/13/2020
// PAK's categorization of these cases:
// * or /: 1, 7
// + or -: 2, 3, 4, 11-13, 20, 22, 23, 25, 26, 29, 31
// build string: 9, 36
// build array: 6, 16-19, 25, 27, 28, 32, 33, 34, 35
// build object: 31
// boolean: 4, 8, 10, 15
// other: 14 (GCD), 21 (map), 38 (binary search), 39 (sort), 40
// flattening (in order done): 3, 30, 22, 23, 24, 29, 37?
// still problematic: 31 (build object), 35 (alternate signs)

// 1. Calculate the factorial of a number. The factorial of a non-negative integer n,
// denoted by n!, is the product of all positive integers less than or equal to n.
// Example: 5! = 5 x 4 x 3 x 2 x 1 = 120
// factorial(5); // 120
// I think that the return for negative integers should be Infinity, not null.
let factorial = function(n) {
	if (n === 0){
		return 1;
	}else if(n < 0){
		return null; 
	}else{
		return n * factorial(n-1);
	}
};

// 2. Compute the sum of an array of integers.
// sum([1,2,3,4,5,6]); // 21
let sum = function(array) {
	if(array.length === 0){
		return 0;
	}else{
		return array[0] + sum(array.slice(1));
	}
};

// 3. Sum all numbers in an array containing nested arrays.
// arraySum([1,[2,3],[[4]],5]); // 15
let arraySum = function(array) {
	const toggle = 1;
	if(toggle === 0){
		if(array.length === 0){
			return 0;
		}else{
			const prefix = array[0];
			const term = (Array.isArray(prefix))?arraySum(prefix):prefix;
			return term + arraySum(array.slice(1));
		}
	}else{
		let sum = 0;
		for(const element of array){
			sum +=(Array.isArray(element))?arraySum(element):element;
		};
		return sum;
	}
};

// 4. Check if a number is even.
let isEven = function(n) {
	if(n<0){n = Math.abs(n); }
	if(n === 0){
		return true;
	}else if (n === 1){
		return false;
	}else{
		return isEven(n-2);
	}
};

// 5. Sum all integers below a given integer.
// sumBelow(10); // 45
// sumBelow(7); // 21
let sumBelow = function(n) {
	if(n === 0 || n === 1){
		return 0;
	}else if(n<0){
		return -sumBelow(-n);
	}else{
		return n-1 + sumBelow(n-1);
	}
};

// 6. Get the integers within a range (x, y).
// range(2,9); // [3,4,5,6,7,8]
let range = function(x, y) {
	if(y  === x || y === x + 1){
		return [];
	}else if(y < x){
		return range(y,x).reverse();
	}else{
		return range(x,y-1).concat([y-1]);
	}
};

// 7. Compute the exponent of a number.
// The exponent of a number says how many times the base number is used as a factor.
// 8^2 = 8 x 8 = 64. Here, 8 is the base and 2 is the exponent.
// exponent(4,3); // 64
// https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/computing-powers-of-a-number
let exponent = function(base, exp) {
	if(exp === 0){
		return 1;
	}else if(exp < 0){
		return 1/exponent(base, -exp);
	}else if(base < 0){
		return exponent(-base, exp)*(exp%2 == 0)?1:-1;
	}else if(exp%2 === 0){
		return exponent(base*base, exp/2);
	}else{
		return base * exponent(base, exp - 1);
	}
};

// 8. Determine if a number is a power of two.
// powerOfTwo(1); // true
// powerOfTwo(16); // true
// powerOfTwo(10); // false
let powerOfTwo = function(n) {
	if(n === 1){
		return true;
	}else if(n <= 0){
		return false;
	}else{
		return powerOfTwo(n/2.0);
	}
};

// 9. Write a function that reverses a string.
let reverse = function(string) {
	if(string.length <= 1){
		return string;
	}else{
		return reverse(string.slice(1)) + string[0];
	}
};

// 10. Write a function that determines if a string is a palindrome.
let palindrome = function(string) {
	string = string.split(" ").join("").toLowerCase();
	if(string.length === 0 || string.length === 1){
		return true;
	}else{
		if(string[0] === string[string.length - 1]){
			return palindrome(string.slice(1,-1));
		}else{
			return false;
		}
	}
};

// 11. Write a function that returns the remainder of x divided by y without using the
// modulo (%) operator.
// modulo(5,2) // 1
// modulo(17,5) // 2
// modulo(22,6) // 4
let modulo = function(x, y) {
	if(y === 0){
		return NaN;
	}else if(x < 0){
		return -modulo(-x,y);
	}else if(y < 0){
		return modulo(x,-y);
	}else if(x < y){
		return x;
	}else{
		return modulo(x - y, y);
	}
};

// 12. Write a function that multiplies two numbers without using the * operator or
// Math methods.
let multiply = function(x, y) {
	if(x === 0 || y === 0){
		return 0;
	}else if(x < 0){
		return -multiply(-x,y);
	}else if(y < 0){
		return -multiply(x,-y);
	}else if(y === 1){
		return x;
	}else{
		return x + multiply(x, y-1);
	}
};

// 13. Write a function that divides two numbers without using the / operator or
// Math methods to arrive at an approximate quotient (ignore decimal endings).
let divide = function(x, y) {
	if(y === 0){
		return NaN;
	}else if(x < 0){
		return -divide(-x,y);
	}else if(y < 0){
		return -divide(x,-y);
	}else if(x < y){
		return 0;
	}else{
		return 1 + divide(x-y,y);
	}
};

// 14. Find the greatest common divisor (gcd) of two positive numbers. The GCD of two
// integers is the greatest integer that divides both x and y with no remainder.
// gcd(4,36); // 4
// http://www.cse.wustl.edu/~kjg/cse131/Notes/Recursion/recursion.html
// https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm
let gcd = function(x, y) {
	const toggle = 1;
	if(x < 0 || y < 0){
		return null;
	}
	if(toggle === 0){
		let factor = 1;
		while(factor < Math.min(x,y)){
			factor ++;
			if(x%factor === 0 && y%factor === 0){
				return factor * gcd(x/factor, y/factor);
			}
		};
	// Below is the base case, which happens when numbers are relatively prime.
		return 1;
	}else if(toggle === 1){
		return (x === 0)?y:(y === 0)?x:gcd(y,x%y);
	}
};

// 15. Write a function that compares each character of two strings and returns true if
// both are identical.
// compareStr('house', 'houses') // false
// compareStr('tomato', 'tomato') // true
let compareStr = function(str1, str2) {
	if(str1.length === 0 && str2.length === 0){
		return true;
	}else{
		if(str1[0] !== str2[0]){
			return false;
		}else{
			return compareStr(str1.slice(1),str2.slice(1));
		}
	}
};

// 16. Write a function that accepts a string and creates an array where each letter
// occupies an index of the array.
let createArray = function(str) {
	if(str.length === 0){
		return [];
	}else{
		return [str[0]].concat(createArray(str.slice(1)));
	}
};

// 17. Reverse the order of an array
let reverseArr = function(array) {
	if(array.length === 0 || array.length === 1){
		return array;
	}else{
		return [array[array.length - 1]].concat(reverseArr(array.slice(1,array.length - 1)),[array[0]]);
	}
};

// 18. Create a new array with a given value and length.
// buildList(0,5) // [0,0,0,0,0]
// buildList(7,3) // [7,7,7]
let buildList = function(value, length) {
	if(length === 0){
		return [];
	}else{
		return buildList(value, length - 1).concat([value]);
	}
};

// 19. Implement FizzBuzz. Given integer n, return an array of the string representations of 1 to n.
// For multiples of three, output 'Fizz' instead of the number.
// For multiples of five, output 'Buzz' instead of the number.
// For numbers which are multiples of both three and five, output “FizzBuzz” instead of the number.
// fizzBuzz(5) // ['1','2','Fizz','4','Buzz']
let fizzBuzz = function(n) {
	if(n === 0){
		return [];
	}else{
		let temp = (n%3 !== 0 && n%5 !== 0)?String(n):'';
		temp += (n%3 === 0)?'Fizz':"";
		temp += (n%5 === 0)?'Buzz':"";
		return fizzBuzz(n-1).concat([temp]);
	}
};

// 20. Count the occurence of a value in a list.
// countOccurrence([2,7,4,4,1,4], 4) // 3
// countOccurrence([2,'banana',4,4,1,'banana'], 'banana') // 2
let countOccurrence = function(array, value) {
	if(array.length === 0){
		return 0;
	}else{
		return ((array[0] === value)?1:0) + countOccurrence(array.slice(1), value);
	}
};

// 21. Write a recursive version of map.
// rMap([1,2,3], timesTwo); // [2,4,6]
let rMap = function(array, callback) {
	if(array.length === 0){
		return [];
	}else{
		return [callback(array[0])].concat(rMap(array.slice(1),callback));
	}
};

// 22. Write a function that counts the number of times a key occurs in an object.
// var obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countKeysInObj(obj, 'r') // 1
// countKeysInObj(obj, 'e') // 2
let countKeysInObj = function(obj, key) {
	const toggle = 1;
    if(toggle === 0){
      let newObj = {};
	  for(const key in obj){
		newObj[key] = obj[key];
	  };
	  const keys = Object.keys(newObj);
	  if(keys.length === 0){
		return 0;
	  }else{
		let count = (keys[0] === key)?1:0; 
		const prefix = newObj[keys[0]];
		if(typeof prefix === "object"){
		  count += countKeysInObj(prefix,key);
		}
		delete newObj[keys[0]];
		return count + countKeysInObj(newObj,key);
	  }
	}else if(toggle === 1){
	  let sum = 0;
	  for(const keyInner in obj){
	    sum += (((keyInner === key)?1:0) + ((typeof obj[keyInner] === "object")?countKeysInObj(obj[keyInner],key):0));
	  };
	  return sum
	}
};

// 23. Write a function that counts the number of times a value occurs in an object.
// var obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
let countValuesInObj = function(obj, value) {
	const toggle = 1;
	if(toggle === 0){
	  let newObj = {};
	  for(const key in obj){
		newObj[key] = obj[key];
	  };
	  const keys = Object.keys(newObj);
	  if(keys.length === 0){
		return 0;
	  }else{
		const prefix = newObj[keys[0]];
		let count;
		if(typeof prefix === "object"){
			count = countValuesInObj(prefix,value);
		}else{
			count = (prefix === value)?1:0; 
		}
		delete newObj[keys[0]];
		return count + countValuesInObj(newObj,value);
	  }
	}else if(toggle === 1){
	  let sum = 0;
	  for(const key in obj){
	  	const val = obj[key];
	    sum += (((val === value)?1:0) + ((typeof val === "object")?countValuesInObj(val,value):0));
	  };
	  return sum
	}
};

// 24. Find all keys in an object (and nested objects) by a provided name and rename
// them to a provided new name while preserving the value stored at that key.
let replaceKeysInObj = function(obj, oldKey, newKey) {
	for(const key in obj){
		let value = obj[key];
		if(typeof value === "object"){
			value = replaceKeysInObj(value,oldKey,newKey);
		}
		if(key === oldKey){
			obj[newKey] = value;
			delete obj[oldKey];
		}
	};
	return obj;
};

// 25. Get the first n Fibonacci numbers. In the Fibonacci sequence, each subsequent
// number is the sum of the previous two.
// Example: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.....
// fibonacci(5); // [0,1,1,2,3,5]
// Note: The 0 is not counted.
// PAK notes that fibonacci(0) should equal [0], not null.
let fibonacci = function(n) {
	if(n === 1){
		return [0, 1];
	}else if(n <= 0){
		return null;
	}else{
		const array = fibonacci(n-1);
		return array.concat(array[n - 2] + array[n - 1]);
	}
};

// 26. Return the Fibonacci number located at index n of the Fibonacci sequence.
// [0,1,1,2,3,5,8,13,21]
// nthFibo(5); // 5
// nthFibo(7); // 13
// nthFibo(3); // 2
let nthFibo = function(n) {
	// I didn't use this helper function, but its use would shorten
	// time-complexity from O(2**N) to O(N).
	let fib2 = function(n) {if(n === 1){return [0, 1]; }else{const temp = fib2(n - 1); return [temp[1],temp[0] + temp[1]]; } };
	if(n < 0){
		return null;
	}else if(n == 0){
		return 0;
	}else if(n === 1){
		return 1;
	}else{
		return nthFibo(n-2) + nthFibo(n-1);
	}
};

// 27. Given an array of words, return a new array containing each word capitalized.
// var words = ['i', 'am', 'learning', 'recursion'];
// capitalizedWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']
let capitalizeWords = function(array) {
	if(array.length == 0){
		return [];
	}else{
		return [array[0].toUpperCase()].concat(capitalizeWords(array.slice(1)));
	}
};

// 28. Given an array of strings, capitalize the first letter of each index.
// capitalizeFirst(['car','poop','banana']); // ['Car','Poop','Banana']
let capitalizeFirst = function(array) {
	if(array.length == 0){
		return [];
	}else{
		const word = array[0];
		const Word = word[0].toUpperCase() + word.slice(1);
		return [Word].concat(capitalizeFirst(array.slice(1)));
	}
};

// 29. Return the sum of all even numbers in an object containing nested objects.
// var obj1 = {
//   a: 2,
//   b: {b: 2, bb: {b: 3, bb: {b: 2}}},
//   c: {c: {c: 2}, cc: 'ball', ccc: 5},
//   d: 1,
//   e: {e: {e: 2}, ee: 'car'}
// };
// nestedEvenSum(obj1); // 10
let nestedEvenSum = function(obj) {
	let sum = 0;
	for(const key in obj){
		const value = obj[key];
		if(typeof value !== "object"){
			sum += (((typeof value === "number") && (value%2 === 0))?value:0);
		}else{
			sum += nestedEvenSum(value);
		}
	};
	return sum;
};

// 30. Flatten an array containing nested arrays.
// flatten([1,[2],[3,[[4]]],5]); // [1,2,3,4,5]
let flatten = function(array) {
	const toggle = 1;
	if(toggle === 0){
		if(array.length === 0){
			return [];
		}else{
			const prefix = array[0];
			const suffix = flatten(array.slice(1));
			return(Array.isArray(prefix))?flatten(prefix).concat(suffix):[prefix].concat(suffix);
		}
	}else{
		let newArr = [];
		for(const element of array){
			newArr = newArr.concat((Array.isArray(element))?flatten(element):[element]);
		};
		return newArr;
	}
};

// 31. Given a string, return an object containing tallies of each letter.
// letterTally('potato'); // {p:1, o:2, t:2, a:1}
let letterTally = function(str, obj) {
	if(typeof obj === "undefined"){
		obj = {};
	}
	if(str.length === 0){
		obj = {};
	}else{
		obj = letterTally(str.slice(1),obj);
		const char = str[0];
		if(obj[char] === undefined){
			obj[char] = 1;
		}else{
			obj[char] ++;
		}
	}
	return obj;
};

// 32. Eliminate consecutive duplicates in a list. If the list contains repeated
// elements they should be replaced with a single copy of the element. The order of the
// elements should not be changed.
// compress([1,2,2,3,4,4,5,5,5]) // [1,2,3,4,5]
// compress([1,2,2,3,4,4,2,5,5,5,4,4]) // [1,2,3,4,2,5,4]
let compress = function(list) {
	if(list.length === 0){
		return [];
	}else{
		const elem = list[0];
		const smaller = list.slice(1);
		if(elem === smaller[0]){
			return compress(smaller);
		}else{
			return [elem].concat(compress(smaller));
		}
	}
};

// 33. Augment every element in a list with a new value where each element is an array
// itself.
// augmentElements([[],[3],[7]], 5); // [[5],[3,5],[7,5]]
let augmentElements = function(array, aug) {
	if(array.length === 0){
		return [];
	}else{
		array[0].push(aug);
		return [array[0]].concat(augmentElements(array.slice(1),aug));
	}
};

// 34. Reduce a series of zeroes to a single 0.
// minimizeZeroes([2,0,0,0,1,4]) // [2,0,1,4]
// minimizeZeroes([2,0,0,0,1,0,0,4]) // [2,0,1,0,4]
let minimizeZeroes = function(array) {
	if(array.length === 0){
		return [];
	}else{
		const elem = array[0];
		const smaller = array.slice(1);
		if(elem === smaller[0] && elem === 0){
			return compress(smaller);
		}else{
			return [elem].concat(minimizeZeroes(smaller));
		}
	}
};

// 35. Alternate the numbers in an array between positive and negative regardless of
// their original sign. The first number in the index always needs to be positive.
// alternateSign([2,7,8,3,1,4]) // [2,-7,8,-3,1,-4]
// alternateSign([-2,-7,8,3,-1,4]) // [2,-7,8,-3,1,-4]
let alternateSign = function(array) {
	if(array.length === 1){
		array[0] = array[0]*((array[0]>0)?1:-1);
		return array;
	}else{
		let elem = array[array.length - 1];
		const smaller = alternateSign(array.slice(0,-1));
		elem = elem * ((elem*smaller[smaller.length - 1] > 0)?-1:1);
		return smaller.concat([elem]);
	}
};

// 36. Given a string, return a string with digits converted to their word equivalent.
// Assume all numbers are single digits (less than 10).
// numToText("I have 5 dogs and 6 ponies"); // "I have five dogs and six ponies"
let numToText = function(str) {
	const numWords = ["zero","one","two","three","four","five","six","seven","eight","nine"];
	if(str.length === 0){
		return '';
	}else{
		const newStr = numToText(str.slice(1));
		if(numWords[str[0]] === undefined){
			return str[0] + newStr;
		}else{
			return numWords[str[0]] + newStr;
		}
	}
};


// *** EXTRA CREDIT ***

// 37. Return the number of times a tag occurs in the DOM.
let tagCount = function(tag, node) {
};

// 38. Write a function for binary search.
// var array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
// binarySearch(array, 5) // 5
// https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
let binarySearch = function(array, target, min, max) {
	if(typeof min === "undefined"){
		min = 0;
		max = array.length-1;
	}
	let amin = array[min];
	let amax = array[max];
	if(amin === target){
	  return min;
	}else if(amax === target){
	  return max;
	}else if(min + 1 === max || target < array[0] || target > array[array.length - 1]){
		return null;
	}
    const mid = Math.floor((min + max)/2);
    const amid = array[mid];
    if(amid === target){
      return mid;
    }else if(amid < target){
      return binarySearch(array, target, mid, max);
    }else{
      return binarySearch(array, target, min, mid);
    }
};

// 39. Write a merge sort function.
// mergeSort([34,7,23,32,5,62]) // [5,7,23,32,34,62]
// https://www.khanacademy.org/computing/computer-science/algorithms/merge-sort/a/divide-and-conquer-algorithms
let mergeSort = function(array) {
	if(array.length <= 1){
		return array;
	}else{
		const target = array[0];
		const subArray = mergeSort(array.slice(1));
        let i = 0;
//The following loop is O(N) but should be made O(log N) using a bisection search.
        while(target > subArray[i]){
        	i ++;
        };
        return (subArray.slice(0,i)).concat([target].concat(subArray.slice(i)));
	}
};

// 40. Deeply clone objects and arrays.
// var obj1 = {a:1,b:{bb:{bbb:2}},c:3};
// var obj2 = clone(obj1);
// console.log(obj2); // {a:1,b:{bb:{bbb:2}},c:3}
// obj1 === obj2 // false
let clone = function(input) {
	let output = Array.isArray(input)?[]:{};
	for(key in input){
		value = input[key];
		output[key] = (typeof value === "object")?clone(value):value;
	};
	return output;
};
