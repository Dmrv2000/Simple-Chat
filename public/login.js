let form = document.querySelector("form");


form.addEventListener("submit", async function(evt){
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

    const response = await fetch('/login',options);
    const resposta = await response.json();
    
    if(resposta.sucess == "true"){
        sessionStorage.setItem("id",resposta.id);
        window.location.href = "home.html";
    }else{
        console.log("failed loging in");
    }
    


});

