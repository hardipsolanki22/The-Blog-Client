const parseErrorMesaage = (stringDocument) => {

  const message = stringDocument
    .split('/')[2]
    .split('<')[2]
    .replace("pre>Error:", "")
    .trim()

    if (message) {
      return message
    } else {
      return "☹ Something want to wrong"
    }


}

export { parseErrorMesaage }