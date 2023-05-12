export const filterMovieByQuery = (movieArray, query) => {
  let filteredByQueryArray = movieArray.filter((film) => {
    return film.nameRU.toLowerCase().includes(query.toLowerCase()) ||
      film.nameEN.toLowerCase().includes(query.toLowerCase())
  })

  return filteredByQueryArray;
}


export const filterMovieByDuration = (movieArray, checkboxState) => {
  if (checkboxState) {
    let filteredMoviesByDurationArray = movieArray.filter((film) => {
      return film.duration <= 40;
    })

    return filteredMoviesByDurationArray;
  }
  else {
    return movieArray;
  }
}

// export default {
//   filterMovieByQuery,
//   filterMovieByDuration
// }
