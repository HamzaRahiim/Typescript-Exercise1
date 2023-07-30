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