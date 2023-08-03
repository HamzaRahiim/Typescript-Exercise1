let userNames = ['admin','hamza','adnan','anis','adnan'];
for(var i=0; i < userNames.length; i++){
    if(userNames[i]  === 'admin'){
        console.log(`hello ${userNames[i]}, would you like to see a status report.`);
    }else {
        console.log(`hello ${userNames[i]},thanks you for logging again.`);
    }
}
