let make_album = (albumTitle,artistName,tracks?:Number)=>{
    let musicAlbum = {
        albumTitle,
        artistName
    }
    if (tracks !== undefined){
        musicAlbum.tracks = tracks;
    }
    return musicAlbum;
}
let a = make_album('Sing','khan');
let c = make_album('nice','richer');
let b = make_album('song','hick',20);
console.log(a);
console.log(c);
console.log(b);
