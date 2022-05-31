"use strict";

// ----------------------------filter

// const names = ["Olia", "Ann", "Oleh", "Voldemart"];

// const shortNames = names.filter((name) => {
//   return name.length < 5;
// });

// console.log(shortNames);

//------------------------------map

// const answers = ["OlIa", "AnN", "OlEh", "VolDemart"]

// const result = answers.map((el) => el.toLocaleLowerCase())

// console.log(result);

//--------------------------every/some

// const answers = ["OlIa", "AnN", 55, "VolDemart"]

// console.log(answers.some(el => typeof(el) == 'number'));
// console.log(answers.some(el => typeof(el) == 'number'));

// ------------------------------- reduce

// const nums = [1, 2, 3]

// const res = nums.reduce((acc, cur) => {
//    return acc + cur
// }, 2)

// console.log(res);

// const obj = {
//     ivan: 'human',
//     ann: 'human',
//     dog: 'animal',
//     cat: 'animal'
// }

// const newArr = Object.entries(obj)
// .filter(el => el[1] === 'human')
// .map(el => el[0])

// console.log(newArr);

const funds = [
  { amount: -1400 },
  { amount: 2400 },
  { amount: -1000 },
  { amount: 500 },
  { amount: 10400 },
  { amount: -11400 },
];

const getPositiveIncomeAmount = (data) => {
  return data
    .filter((el) => el.amount > 0)
    .reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);
};

const getTotalIncomeAmount = (data) => {
  return data.some((el) => el.amount < 0)
    ? data.reduce((acc, cur) => acc + cur.amount, 0)
    : getPositiveIncomeAmount(data);
};
