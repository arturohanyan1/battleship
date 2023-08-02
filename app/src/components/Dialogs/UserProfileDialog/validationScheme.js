export const validationScheme = (value) => {
  if (value.length) {
    if (value.length < 5) {
      return 'Too Short!'
    } else if (value.length > 12) {
      return 'Too Long!'
    }
  } else {
    return 'Field is required!'
  }
};