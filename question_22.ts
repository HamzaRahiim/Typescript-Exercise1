let mixed1 = ["Mount Everst","Mahodan Lake","Saudi Arabia","Sakardu","Urdu"];
//Making Intentional error
let error = mixed1.indexOf("english");  // output = -1
let error2 = mixed1[7];                 // output=undefined
// Making it write 
error = mixed1.indexOf("Urdu");
error2 = mixed1[2];
console.log(error);
console.log(error2);
console.log(mixed1);