let current_users = ['Hamza','Yasir','Adnan','Anis','Sufyan'];
let new_users = ['Shahzad','Khan','king','hamza','muna'];
for (let i = 0; i < new_users.length; i++){
  let a = new_users[i].toLocaleLowerCase()
  for (let j = 0; j < current_users.length; j++){
    let b = current_users[j].toLocaleLowerCase();
    if(a == b){
      console.log(`${new_users[i]} will need to enter a new username`);
      break;
    }else if(a != b){
      console.log(`${new_users[i]} username is available.`);
      break;
    }
  }
};
