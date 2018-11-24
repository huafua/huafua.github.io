window.onload=function(){
    var container=this.document.querySelector("div.container");
    var rightBlock=container.querySelector(".right");
    var img=rightBlock.querySelector("img");
    
    var titlebar=container.querySelector("div.title");
    titlebar.onmousedown=function(evt){
        var deltaX=evt.clientX-container.offsetLeft;
        var deltaY=evt.clientY-container.offsetTop;
        titlebar.onmousemove=function(e){
            // console.log(e.clientX-deltaX+"px");
            container.style.left=e.clientX-deltaX+"px";
            container.style.top=e.clientY-deltaY+"px";
        };
    };
    titlebar.onmouseout=titlebar.onmouseup=function(){
        titlebar.onmousemove=function(){};
    };
    var loginMask=this.document.querySelector("div.login-mask");
    var bottom=this.document.querySelector("div.bottom");
    var button=bottom.querySelector("input[type='button']");
    button.addEventListener("click",function(){
        var txtUsername=document.querySelector("input#username");
        var txtPassword=document.querySelector("input#password");
        if(txtUsername.value=="huafua"&&txtPassword.value=="huafua"){
            // document.body.removeChild(loginMask);
            loginMask.style.display="none";
            document.title="歡迎,huafua";
        }else{
            window.alert("用户名或密码错误！");
        }
    });
    var logout=document.querySelector("span.logout");
    logout.addEventListener("click",function(){
        loginMask.style.display="block";
    });
    document.querySelector("div.home span.btn-login").addEventListener("click",function(){
        document.querySelector("div.home").style.display="none";
    })
}