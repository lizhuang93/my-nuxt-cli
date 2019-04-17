function getJS(url, needTs = true, id) {
  return new Promise(function(resolve, reject) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (id) script.id = id;

    if (script.readyState) {
      //IE
      script.onreadystatechange = function() {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null;
          resolve('success: ' + url);
        }
      };
    } else {
      //Others
      script.onload = function() {
        resolve('success: ' + url);
      };
    }

    script.onerror = function() {
      reject(Error(url + 'load error!'));
    };

    if (needTs) {
      url + (url.indexOf('?') !== -1 ? '&' : '?') + 'ts=' + Date.parse(new Date());
    }

    script.src = url;

    document.body.appendChild(script);
  });
}
export default getJS;
