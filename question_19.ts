let invite = ["Umar","saad","Abubakar"];
    for(var i=0; i < invite.length; i++){
        let message =`Mr.${invite[i]},you are invited for Dinner.`;
        console.log(message);
}
console.log(`Mr.${invite[2]} cannot attain the Dinner.`);
invite.splice(2,1,"Asad");
for(var j=0; j < invite.length; j++){
    let message2 =`Mr.${invite[j]},you are invited for Dinner.`;
    console.log(message2);        
}
let inform = "Hello gentlemen,There is more space available on Table."
console.log(inform);
invite.unshift("yasir")
invite.splice(2,0,"Anis");
invite.push("Shahzad");
console.log(invite);
for(var k=0; k < invite.length; k++){
    let message3 =`Mr.${invite[k]},you are invited for Dinner.`;
    console.log(message3);        
}
let sorry = "I can invite only two person for dinner."
console.log(sorry);
let a = invite.pop();
let b = invite.pop();
let c = invite.pop();
let d = invite.pop();
console.log(`Sorry Mr.${a},you are not invited for Dinner.`);
console.log(`Sorry Mr.${b},you are not invited for Dinner.`);
console.log(`Sorry Mr.${c},you are not invited for Dinner.`);
console.log(`Sorry Mr.${d},you are not invited for Dinner.`);
for(var h=0; h<invite.length; h++){
    console.log(`Mr.${invite[h]},you are still invited for dinner.`);
}
invite.pop();
invite.pop();
console.log(invite);

// number of people I am inviting.

let numberOfPeople = invite.length;
console.log(`The number of people invited for dinner is ${numberOfPeople}`);
