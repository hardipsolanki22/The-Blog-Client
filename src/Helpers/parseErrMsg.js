const parseErrorMesaage = (stringDocument) => {

  const parseErrorMessage = stringDocument
    .split('/')[2]
    .split('<')[2]
    .replace("pre>Error:", "")
    .trim()

    if (parseErrorMessage) {
      return parseErrorMessage
    }

    return "Something want to wrong"

}

export { parseErrorMesaage }