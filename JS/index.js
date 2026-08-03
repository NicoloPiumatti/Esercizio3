"use strict"

let container = document.createElement("div");
container.classList.add("container");
container.style.border = "5px solid black";
container.style.margin = "10px";
container.style.padding = "10px";
container.style.height = "150px";
container.style.width = "750px";
document.body.append(container);

for (let i = 0; i < 10; i++) {
    let div = document.createElement("div");
    div.style.border = "3px solid black";
    div.style.display = "inline-block";
    div.style.margin = "10px";
    div.style.height = "100px";
    div.style.width = "50px";
    div.style.backgroundColor = "yellow";
    div.setAttribute("id", "div_" + i);
    container.append(div);
}

let btnAvvia = document.createElement("button");
let p = document.createElement("p");
p.style.margin = "10px"

btnAvvia.textContent = "Avvia animazione";
btnAvvia.style.textAlign = "center";
btnAvvia.style.width = "750px";
btnAvvia.style.height = "60px";
btnAvvia.style.border = "4px solid black";
btnAvvia.style.margin = "10px";

let countdown;
let animationInterval;
let indiceCorrente = 0, direzione = "andata", isStoppato = true;;

btnAvvia.addEventListener('click', function () {
    clearInterval(countdown);
    clearInterval(animationInterval);
    if (isStoppato === true) {
        let sec = 3;
        p.textContent = "L'animazione partirà entro " + sec + " secondi...";
        countdown = setInterval(() => {
            sec--;
            if (sec > 0) {
                p.textContent = "L'animazione partirà entro " + sec + " secondi...";
            }
            if (sec === 0) {
                clearInterval(countdown);
                p.textContent = "Animazione in corso...";
                avviaAndata();
            }
        }, 1000);
    } else
    {
        p.textContent = "Animazione ripresa...";
        isStoppato = false;
        if(direzione === "andata")
        {
            avviaAndata()
        } else
            avviaRitorno();
    }
});

function avviaAndata() {
    direzione = "andata";
    animationInterval = setInterval(() => { 
        if (indiceCorrente === 10) { 
            clearInterval(animationInterval);
            indiceCorrente = 9;
            avviaRitorno();
            return; 
        } 
        if (indiceCorrente > 0) { 
            document.getElementById('div_' + (indiceCorrente - 1)).style.backgroundColor = 'yellow'; 
        } 
        document.getElementById('div_' + indiceCorrente).style.backgroundColor = 'blue'; 
        indiceCorrente++;
    }, 50); 
}

function avviaRitorno() {
    direzione = "ritorno";
    animationInterval = setInterval(() => { 
        if (indiceCorrente === -1) { 
            clearInterval(animationInterval);
            indiceCorrente = 0;
            avviaAndata();
            return; 
        } 
        if (indiceCorrente < 9) { 
            document.getElementById('div_' + (indiceCorrente + 1)).style.backgroundColor = 'yellow'; 
        } 
        document.getElementById('div_' + indiceCorrente).style.backgroundColor = 'blue'; 
        indiceCorrente--;
    }, 50); 
}

document.body.append(btnAvvia);
document.body.append(p);

let btnStop = document.createElement("button");
btnStop.textContent = "Stop animazione";
btnStop.style.textAlign = "center";
btnStop.style.width = "750px";
btnStop.style.height = "60px";
btnStop.style.border = "4px solid black";
btnStop.style.margin = "10px";
document.body.append(btnStop);

btnStop.addEventListener("click", function () {
    clearInterval(countdown);
    clearInterval(animationInterval);
    p.textContent = "Animazione interrotta";
    isStoppato = false;
})