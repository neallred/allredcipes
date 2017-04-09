export const stringPropertySort = (property, ascending=true) => {
  return function (a,b) {
    if (typeof a[property] !== 'string' || typeof a[property] !== 'string') {
      return 0
    }

    const aBeforeB = a[property].toLowerCase() < b[property].toLowerCase()
    const bBeforeA = a[property].toLowerCase() > b[property].toLowerCase()
    if(ascending ? aBeforeB : bBeforeA) {
      return 1
    }
    else if(ascending ? bBeforeA : aBeforeB ) {
      return -1
    }
    else {
      return 0
    }
  }
}
