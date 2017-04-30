export const stringPropertySort = (property, ascending=true) => {
  //This function is "fooled" by strings that are numbers or lead with number characters
  return function (a,b) {
    if (typeof a[property] !== 'string' || typeof b[property] !== 'string') {
      return 0
    }

    const aBeforeB = a[property].toLowerCase() < b[property].toLowerCase()
    const bBeforeA = a[property].toLowerCase() > b[property].toLowerCase()
    if(ascending ? bBeforeA : aBeforeB) {
      //when in ascending sort, move a to later if a < b
      //when in descending sort, move a to later if a > b
      return 1
    }
    else if(ascending ? aBeforeB : bBeforeA) {
      //when in ascending sort, move a to earlier if a > b
      //when in descending sort, move a to earlier if a < b
      return -1
    }
    else {
      return 0
    }
  }
}
