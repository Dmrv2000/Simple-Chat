let x = sessionStorage.getItem("id");
let nome;
//sessionStorage.clear();


async function load(){

    const data = { x };

    const options = {
        mode: 'cors',
        method: 'POST',
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };

    const response = await fetch('/load_data',options);

    const resposta = await response.json();
    console.log(resposta);
    if(resposta.sucess == "true"){
        nome = resposta.us;
        document.getElementById("name").textContent = nome;
    }else{
        console.log("failed");
    }

}

async function getMessages(){
    const response = await fetch('/get_messages');
    const resposta = await response.json()


    for(item of resposta){
        const root = document.createElement('div');
        root.className = 'content';
        const us = document.createElement('div');
        us.className = 'user-name';
        const ms = document.createElement('div');
        ms.className = 'message';

        const n = document.createElement('p');
        n.textContent = item.us;

        const msg = document.createElement('p');
        msg.textContent = item.msg;

        us.append(n);
        ms.append(msg);

        root.append(us,ms);

        document.getElementById("messages").prepend(root);
    }
}

document.getElementById("send").addEventListener("click",async function(){
    let msgContent = document.getElementById("textarea").value;

    const data = { us_id:x ,us:nome ,msg:msgContent };

    const options = {
        mode: 'cors',
        method: 'POST',
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };

    const response = await fetch('/sendMessage',options);
    const resposta = await response.json();
    
    if(resposta.sucess == "true"){
        console.log("sucess ");
        document.getElementById("textarea").value = "";
        window.location.reload();
    }else{
        console.log("failed ");
    }
})

load();
getMessages();



