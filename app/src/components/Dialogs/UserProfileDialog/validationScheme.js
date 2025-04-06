export const validationScheme = (value) => {
  if (value.length) {
    if (value.length < 2) {
      return 'Too Short!'
    } else if (value.length > 15) {
      return 'Too Long!'
    }
  } else {
    return 'Field is required!'
  }
};