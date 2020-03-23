const basePath = "https://simpleblogapi.herokuapp.com";
// /**
//  * @function dataInteraction
//  *
//  * @description qwe
//  * @param method
//  * @param body
//  * @param url
//  * @param resultFunc
//  * @param errorFunc
//  *
//  * @return
//  */
export async function dataInteraction(method, body, url) {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: body ? JSON.stringify(body) : null
  };
  try {
    const response = await fetch(`${basePath}/${url}`, options);
    return method === "GET"
      ? await response.json()
      : await response.text()
  } catch (e) {
    throw e
  }
}

