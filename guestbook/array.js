// 초기 배열
const fruits = ["Apple", "Banana", "kiwi", "WaterMelon"]; // 배열 안의 값들은 원소 ( Element ) 라고 부른다.

// 1. forEach(): 각 요소를 순회
// 콜백 함수 ( Callback Function ) : 함수 안에서 함수를 호출시키는 형태를 콜백이라 부른다.
fruits.forEach((fruit, index) => {
    console.log(`fruits[${index}] = ${fruit}`);
})
// 출력:
// fruits[0] = Apple
// fruits[1] = Banana
// ...

// 2. map(): 각 요소를 순회하여 새로운 배열을 만든다.
// const upperFruits = fruits.map(fruit => fruit.toUpperCase());
// console.log("대문자 배열:", upperFruits);
// // 출력: ["APPLE", "BANANA", "KIWI", "WATERMELON"]
const upperCaseFruits = fruits.map(function(fruit, index) {
    return fruit.toUpperCase();
})
console.log("Upper Case fruit array : ", upperCaseFruits);

const likeFruits = fruits.map((fruit) => `I like ${fruit}`);
console.log("Like Fruits: ", likeFruits);

// 3. filter(): 이름이 6글자 이상인 과일만 필터링
// const longFruits = fruits.filter(fruit => fruit.length >= 6);
// console.log("6글자 이상:", longFruits);
// // 출력: ["Banana", "WaterMelon"]
const longNameFruits = fruits.filter((fruit, index) => fruit.length >= 6);
console.log("Long than six letters : ", longNameFruits);

// 4. find(): 이름에 'i'가 포함된 첫 번째 과일 찾기
// const fruitWithI = fruits.find(fruit => fruit.includes("i"));
// console.log("'i'가 포함된 첫 과일:", fruitWithI);
// // 출력: "kiwi"
const fruitWithA = fruits.find((fruit) => fruit.includes("A")); // 조건에 맞는 첫번째 값을 반환
console.log("Include Alphabet a : ", fruitWithA);

// 5. includes(): 배열에 특정 값이 존재하는지 확인
// const hasKiwi = fruits.includes("kiwi");
// console.log("kiwi 포함 여부:", hasKiwi); // true
const hasPeach = fruits.includes("Peach");
console.log("Has Peach in array : ", hasPeach);

// 6. indexOf(): 특정 요소의 인덱스 찾기
// const indexBanana = fruits.indexOf("Banana");
// console.log("Banana 인덱스:", indexBanana); // 1
const indexOfBanana = fruits.indexOf("Banana"); // 제일 첫번째로 위치한 요소의 인덱스를 반환
console.log("index of banana : ", indexOfBanana);

const indexOfPeach = fruits.indexOf("Peach");
console.log("index of peach : ", indexOfPeach); // 존재하지 않으면 -1 반환

// 7. push(): 배열 끝에 요소 추가
// fruits.push("Peach");
// console.log("Peach 추가 후:", fruits);
// // 출력: ["Apple", "Banana", "kiwi", "WaterMelon", "Peach"]
fruits.push("Mango");
console.log("Array after push : ", fruits);

// 8. pop(): 배열 끝 요소 제거
// const removed = fruits.pop();
// console.log("제거된 과일:", removed); // Peach
// console.log("제거 후 배열:", fruits);
const lastFruit = fruits.pop(); // 배열의 마지막 요소를 꺼내온 후 제거
console.log("Removed fruit : ", lastFruit);
console.log("Array after pop : ", fruits);

// // 9. unshift(): 배열 앞에 요소 추가
fruits.unshift("Strawberry");
console.log("앞에 추가:", fruits);


// // 10. shift(): 배열 앞 요소 제거
const firstFruit = fruits.shift(); // 배열의 맨 앞 요소를 꺼내온 후 제거
console.log("제거된 앞 요소:", firstFruit);
console.log("제거 후 배열:", fruits);

// // 11. sort(): 배열을 알파벳 순으로 정렬 (기본은 대소문자 구분)
const sortedFruits = [...fruits].sort(); // 원본 배열을 복사한 뒤 정렬
console.log("원본 배열 : ", fruits);
console.log("정렬된 배열:", sortedFruits);

/**
 *  구조분해할당 
 * 문법 : [...array]
 *  구조를 분해한다 + 분해한 값을 할당
 * 
 * iterable 한 요소를 분해한 후, 그 값을 변수에 넣는다.
 * iterable : 반복 가능하다 ( for 문 가능하냐? 라는 뜻으로 지금은 이해하기 )
 * 
 * [...fruits] : fruits 배열의 값을 하나씩 꺼내와서 새로운 배열을 만든다.
 * 
 * iterable 하다면 객체도 가능하다.
 * 
 * 
 * 
 * =========
 * 
 * 전개 할당 ( spread operator )
 * functoin a(...items) {
 * }
 */

// // 12. reverse(): 배열 순서를 뒤집기
const reversed = [...fruits].reverse(); // 원본 배열을 수정하기 때문에, 배열을 구조분해할당으로 복사한 후 reverse로 뒤집기
console.log("원본 배열 : ", fruits);
console.log("역순 배열:", reversed);

// // 13. join(): 배열을 문자열로 합치기
const joined = fruits.join(" / ");
console.log("합쳐진 문자열:", joined); // Apple / Banana / kiwi / WaterMelon

const joined2 = fruits.join("~~~~");
console.log("합쳐진 문자열 2:", joined2);

// // 14. slice(): 배열의 일부분을 복사
const someFruits = fruits.slice(1, 3); // 인덱스 1~2, start ~ end - 1 의 범위만큼 자른다. end는 포함하지 않는다
console.log("부분 배열(slice):", someFruits);

// 15. splice(): 배열에서 요소 제거 또는 삽입
// 인덱스 2부터 1개 삭제하고 "Mango" 삽입
fruits.splice(2, 1, "Mango", "Blueberry"); // 첫번째 인자 ( start ) 에서부터 두번째 인자 ( deleteCount ) 만큼 삭제하고, 나머지 인자를 삽입
console.log("Splice 후 배열:", fruits);
