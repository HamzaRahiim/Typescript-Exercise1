function show_magicians(magicians: string[]): void {
  for (const magician of magicians) {
    console.log(magician);
  }
}

function make_great(magicians: string[]): string[] {
  const greatMagicians: string[] = [];
  for (const magician of magicians) {
    greatMagicians.push(`the Great ${magician}`);
  }
  return greatMagicians;
}

const magicians: string[] = ['Joker','MagicsMAster','Smile0','UnknownMagician'];
console.log("Original Magicians:");
show_magicians(magicians);

const greatMagicians: string[] = make_great(magicians);
console.log("\nGreat Magicians:");
show_magicians(greatMagicians);

console.log("\nUnchanged Magicians:");
show_magicians(magicians);
