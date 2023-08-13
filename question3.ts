let fName:string = "Hamza rahim";
console.log(fName.toLowerCase());
console.log(fName.toUpperCase());
//writing a program to change name to title case.
let title = fName.split(' ');
let arr:string[] = [];
for (let i = 0; i < title.length; i++) {
    let  string = title[i];
    for (let j = 0; j < string.length; j++) {
        let call = string.charAt(0);
        let replacement = string.replace(call, call.toUpperCase());
        arr.push(replacement);
        break;
    }
}
console.log(...arr);