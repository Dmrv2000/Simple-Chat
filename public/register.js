let form = document.querySelector("form");


form.addEventListener("submit",function(evt){
    evt.preventDefault();
    let formData = new FormData(form);
    const us = formData.get("username");
    const pwd = formData.get("password");
    
    
    const data = { us , pwd };

    const options = {
        mode: 'cors',
        method: 'POST',
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };

    fetch('/register',options);



});