export function makeImgPath(id,format){
    return (
        `https://image.tmdb.org/t/p/${format?format:"original"}/${id}`
        )
}
