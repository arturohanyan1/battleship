// proveryaem mojem li mi vstavit korabl v etom cordinate 'X'
function checkIsRowEmpty(row, shipLength, cordY) {
  for (let i = 0; i < shipLength; i++) {
    if (cordY + i < 10) {
      if (!row[cordY + i]?.empty) {
        return false
      }
    } else {
      return false
    }
  }
  return true
}

export default checkIsRowEmpty;