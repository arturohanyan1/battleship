const setBoardTableClasses = (item) => {
  switch (item.body) {
    case "+":
      return "disabled";
    case "1-1":
    case "1-2":
    case "1-3":
    case "1-4":
      return "one";
    case "2-1":
    case "2-2":
    case "2-3":
      return "two";
    case "3-1":
    case "3-2":
      return "three";
    case "4-1":
      return "four";
    default:
      break;
  }
};

export default setBoardTableClasses;