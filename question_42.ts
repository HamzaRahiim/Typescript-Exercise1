let MagiciansArray = ['Joker','MagicsMAster','Smile0','UnknownMagician'];
// modifying the old MAgicians array;
let make_great = (Magicians)=>{
  MagiciansArray.forEach(e => console.log(`The Great ${e}`))
}
make_great(MagiciansArray);