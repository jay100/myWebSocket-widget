# **设置全局模式**


     <feature name="myWebSocket">
         <param name="isGlobal" value="true" />
     </feature>


# **示例**     
```js
var myWebSocket = api.require('myWebSocket');
myWebSocket.open({
    url:'ws://host:port',
    pingInterval:30,
    pingData:'ping',
    autoReconnect:true //使用自动重连
},function(ret, err) {
    if (ret) {
        alert("打开成功");
    } else {
        alert('打开失败');
    }
});
myWebSocket.bindEvent( function(ret,err) {
       var type = ret.type;
       var str =ret.data;

       switch (type){
           case 'opened':
                //登录...
                console.log("连接成功");
                break;
           case 'receive':
               var message = JSON.parse(str);
               console.log("接收消息：",message);
                break;
             case 'error':
               //do something ...
                console.log("连接发生错误");
                //打印关闭的log
                console.log(str)
                break;
           case 'closed':
               //do something ...
                console.log("连接已断开");
                //打印关闭的log
                console.log(str)
                break;
       }  
});
```