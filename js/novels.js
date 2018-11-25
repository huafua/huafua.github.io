var http=new XMLHttpRequest();
http.onreadystatechange=function(){
    if(this.readyState==4){
        if(this.status==200){
            var novel_list=JSON.parse(this.response);
            novel_list.forEach(function(novel,index){
                var novel_link="assets/"+novel;
                var element=document.createElement("div");
                element.style.position="relative";        
                element.style.borderBottom="1px #ddd dashed";              
                var icon=document.createElement("i");
                icon.innerText=index+1;             
                icon.className="icon";         
                element.appendChild(icon);
                var anchor=document.createElement("a");
                anchor.className="novel_item";
                anchor.href=novel_link;
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