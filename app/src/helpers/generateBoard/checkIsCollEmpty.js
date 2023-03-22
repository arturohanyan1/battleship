// proveryaem mojem li mi vstavit korabl v etom cordinate 'Y'
function checkIsCollEmpty(board, cordX, cordY, shipLength) {
  for (let i = 0; i < shipLength; i++) {
    if (cordX + i < 10) {
      if (!board[cordX + i][cordY]?.empty) {
        return false
      }
    } else {
      return false
    }
  }
  return true
}

export default checkIsCollEmpty;