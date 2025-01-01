const parseErrorMesaage = (htmlElement) => {
    const parser = new DOMParser();
    const document = parser.parseFromString(htmlElement, "text/html");
    const errorMessageEle = document.querySelector("pre");
    const errorMessage = errorMessageEle?.innerText
    

    if (errorMessage) {
        return errorMessage.split(":").pop().trim();;
    }

    return null
}

export {parseErrorMesaage}