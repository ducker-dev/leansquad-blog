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

async function f(method, body, url) {
  let xhr = new XMLHttpRequest();
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.open(method, `${basePath}/${url}`, true);
  body ? xhr.send(JSON.stringify(body)) : xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      alert(xhr.responseText);
    }

  }
}

