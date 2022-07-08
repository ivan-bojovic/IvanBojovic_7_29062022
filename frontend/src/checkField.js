const regexs = {
  Email: /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/,
  Password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,50}$/g,
  Alpha: /^[a-zA-Zçñàéèêëïîôüù][a-zA-Zçñàéèêëïîôüù\- '\\.]{1,25}$/g,
};

function checkField(typeRegex, value) {
  if (value == null && value == "") {
    return false;
  }
  const foundRegex = regexs[typeRegex];
  if (foundRegex != undefined) {
    return foundRegex.test(value);
  }
  return true;
}

export default checkField;
