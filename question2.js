var fName = "Hamza rahim";
console.log(fName.toLowerCase());
console.log(fName.toUpperCase());
//writing a program to change name to title case.
var amer = fName.split(' ');
var arr = [''];
for (var i = 0; i < amer.length; i++) {
    var string = amer[i];
    for (var j = 0; j < string.length; j++) {
        var call = string.charAt(0);
        var replacement = string.replace(call, call.toUpperCase());
        arr.push(replacement);
        break;
    }
}
console.log("".concat(arr[1], " ").concat(arr[2]));
