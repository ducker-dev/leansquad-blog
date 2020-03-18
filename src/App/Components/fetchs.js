const basePath = "https://simpleblogapi.herokuapp.com";

export const dataInteraction = (method, body, url, resultFunc, errorFunc ) => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: body ? JSON.stringify(body) : null
  };
  fetch(`${basePath}/${url}`, options)
    .then(
      method === "GET"
        ? response => {
          return response.json();
        }
        : response => response.text()
    )
    .then(result => resultFunc(result))
    .catch(error => errorFunc(error));
};