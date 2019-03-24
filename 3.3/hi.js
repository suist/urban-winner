
const clicked_class ="clicked";

function handleClick(){
    title.classList.toggle("clicked");

}

function init(){
title.addEventListener("click",handleClick);
}
init();