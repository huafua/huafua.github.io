var http=new XMLHttpRequest();
http.onreadystatechange=function(){
    if(this.readyState==4){
        if(this.status==200){
            var novel_list=JSON.parse(this.response);
            novel_list.forEach(function(novel,index){
                var novel_link="assets/"+novel;
                var element=document.createElement("div");
                element.className="item-wrapper";
                var icon=document.createElement("i");
                // icon.innerText=index+1;             
                icon.className="icon";         
                element.appendChild(icon);
                var anchor=document.createElement("a");
                anchor.className="novel_item";
                anchor.href="javascript:void(0)";
                element.onclick=function(){
                    http=new XMLHttpRequest();
                    http.onreadystatechange=function(){
                        if(this.readyState==4){
                            if(this.status==200){
                                var panel=document.createElement("div");
                                panel.className="panel";
                                panel.style.width=document.documentElement.clientWidth+"px";
                                panel.style.height=document.documentElement.clientHeight+"px";
                                var titlebar=document.createElement("div");
                                titlebar.innerText=novel.split(".")[0];
                                titlebar.className="titlebar";
                                var btnback=document.createElement("div");
                                btnback.className="btnback";
                                // btnback.innerHTML="&larr;";
                                btnback.onclick=function(){
                                    document.body.removeChild(panel);
                                    panel=null;
                                }
                                titlebar.appendChild(btnback);
                                var content=document.createElement("div");
                                content.innerHTML=this.responseText.replace(/null/g,"");
                                content.className="content";
                                content.style.height=document.documentElement.clientHeight-titlebar.offsetHeight+"px";
                                panel.appendChild(titlebar);
                                panel.appendChild(content);
                                document.body.appendChild(panel);
                            }
                        }
                    }
                    http.open("get",novel_link,true);
                    http.send();
                }
                anchor.setAttribute("target","_blank");
                anchor.style.zIndex=100;
                anchor.innerText=novel.split(".")[0];
                element.appendChild(anchor);
                
                document.querySelector("#container").appendChild(element);
            });
        }
    }
}
http.open("get","./assets/data.json",true);
http.send();