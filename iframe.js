
// TODO: Add defualt listeners
function addAsceneListeners(){
    window.addEventListener('message', function(e){ return executeCommand(e)});
}

function executeCommand(msg){
    // get the data
    // Message format
    /*
        {
            'cmd' : command,
            'args' : command data,
            'reply': boolean stating if reply is required (not sure about it though)
        }
    */
    // get the data first
    var cmdData = msg.data;
    // compare the command and call the respective funtionc
    switch(cmdData.cmd){
        case 'get-code' : getCode(cmdData.args); break;
        case 'post-code' : postCode(cmdData.args); break;
        case 'change-sky' : changeSKy(cmdData.args); break;
    }
}

function getCode(cmd){
    if(cmd.type === "HTML")
        parent.postMessage({"cmd": "receive-code", type: "HTML", "code": document.querySelector('html').outerHTML,});
    else if(cmd.type === "a-scene")
         parent.postMessage({"cmd": "receive-code", type: "a-scene", "code": document.querySelector('a-scene').outerHTML,});
    else if(cmd.type === "customJS")
         parent.postMessage({"cmd": "receive-code", type: "customJS", "code": document.querySelector('#customJS').inneHTML,});
    else   
        Error("Invalid type requested");
}

function postCode(code){
    /* format
        {
            type: "a-scene/customJS"
            code: ~code~
        }
    */
    // When loading for the first time, both code needs to be processed
    var codeString = code.code;
   if(code.type === "a-scene"){
        document.querySelector('a-scene').outerHTML = codeString;
   }
    else if(code.type === "customJS"){
        var scriptEl = document.querySelector('#customJS');
        scriptEl.parentElement.removeChild(scriptEl);
        scriptEl = document.createElement('script');
        scriptEl.id = 'cusotmJS';
        scriptEl.innerHTML = codeString;
        document.body.appendChild(scriptEl);
    }
    else
        Error('invalid type');
}

//TODO: define fadeOut
// function fadeOut(){

// }

// function loadScene(){

// }

// function loadScene(aframeCode, javaScriptCode){
//     var parser =new DOMParser();
//     // fadeOut();
//     // clearScene();
//     var doc = parser.parseFromString(htmlCode, "text/html");
//     window.postMessage("")
// } 

addAsceneListeners();


