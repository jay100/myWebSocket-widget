
<div class="outline">

[open](#a1)

[bindEvent](#a2)

[send](#a3)

[close](#a4)

[readyState](#a5)


<!--[listenerMiniLanuchApp](#listenerMiniLanuchApp)-->
</div>

# **概述**

**WebSocket**
本模块封装了 安卓与ios websocket原生SDK 基础功能

**模块概述**

- 发送消息
- 支持自定义心跳数据 
- 新增断网重连机制



## **模块接口**
    
# **设置全局模式**


     <feature name="myWebSocket">
         <param name="isGlobal" value="true" />
     </feature>
    
<div id="a1"></div>

# **open**
打开连接<br>
是否连接成功，请以事件监听(bindEvent) 状态为准 

open(params,callback(ret, err))
## params

url：

- 类型：字符串
- 描述：服务端地址

pingInterval：

- 类型：整型
- 描述：（可选项）心跳间隔，单位秒，设置大于0时起效果
- 默认值：0
- 取值范围：
    * \> 0 等整型
    
pingData：

- 类型：字符串
- 描述：（可选项）心跳数据，配合pingInterval 使用
- 默认值：ping


## callback(ret, err)

ret：

- 类型：JSON 对象
- 内部字段：

```js
{
    status: true      //打开成功
    data: "打开成功" // 
}
```
err：

- 类型：JSON 对象
- 内部字段：

```js
{
    status: false     //打开失败；
    data:"提示信息"      
}
```
## 示例代码

```js
var myWebSocket = api.require('myWebSocket');
myWebSocket.open({
    url:'ws://host:port',
    pingInterval:30,
    pingData:'ping'
},function(ret, err) {
    if (ret) {
        alert("打开成功");
    } else {
        alert('打开失败');
    }
});
```

<div id="a2"></div>

# **bindEvent**

事件监听

bindEvent(callback(ret,err))

当设置全局模式时，其他页面使用 bindEvent 可以多次绑定，不会覆盖；
当前页面bindEvent 只会生效最后一次

## callback(ret,err)

ret：

- 类型：JSON 对象
- 内部字段：

```js
{
     
    type:""      // opened 打开成功，连接上了服务器
                 // closed 连接已关闭
                 // receive 接收到了消息
                 //
    data: ""    //字符串; 
}
```

## 示例代码

```js
var myWebSocket = api.require('myWebSocket');
myWebSocket.bindEvent( function(ret,err) {
       var type = ret.type;
       var str =ret.data;
    
       switch (type){
           case 'opened':
                //登录...
                var data = {type: 'login', 'uid': 1, 'froms': 'app'};
                webSocket.send({msg:JSON.stringify(data)})
           
                break;
           case 'receive':
               var message = JSON.parse(str);
               //do something ...
                break;
           case 'closed':
               //do something ...
                alert("连接已断开");
                //打印关闭的log
                console.log(str)
                break;
       }
    
});
```

<div id="a3"></div>

# **send**

发送消息

send({params})

## params

msg：

- 类型：字符串
- 描述：发送内容

## 返回值
 -   success 发送成功
 -   fail 发送失败


## 示例代码

```js
var myWebSocket = api.require('myWebSocket');
var result = myWebSocket.send({msg:"hello"});

// result 值为 success 或 fail 

```
<div id="a4"></div>

# **close**

关闭连接

close(callback(ret, err))

## callback(ret, err)

ret：

- 类型：JSON 对象
- 内部字段：

```js
{
    status: true   //布尔型；true||false
    data:"" 
}
```

err：

- 类型：JSON 对象
- 内部字段：

```js
{
    status: false     
    data:""
}
```

<div id="a5"></div>

# **readyState**

获取状态值

readyState()


返回值

- 类型：整型
-  1 已连接 2 关闭中 3 已关闭 0 未连接 

```js
var readyState = myWebSocket.readyState()
switch (readyState) {
    case 1:
        break;
        //...
}
```


#可用性

iOS系统，Android系统