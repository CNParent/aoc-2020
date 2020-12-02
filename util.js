let getFile = (url) => {
    return new Promise(resolve => {
        let req = new XMLHttpRequest();
        req.open('get', url);
        req.setRequestHeader('accept', 'text/plain');
        req.onloadend = () => {
            resolve(req.response.split('\r\n'));
        };
        req.send();
    });
}