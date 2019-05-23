function MQTTClient(options) {
    window.mqttClient = window.mqttClient || api.require("mqttClient");
    this.options = {
        port: 1883,
        clientId: "1" + new Date().getTime(),
        useTLS: false,
        username: '',
        password: ''
    };
    this.handle="";
    this.options = Object.assign({},this.options,options);
    this.listeners = [];

    this.onConnect = function (ret,err) {console.log(ret,err)};
    this.onListener = function (ret,err) {};
    this.connect = function() {
        var _this = this;
        mqttClient.connect(this.options,function (ret,err) {
            _this.onConnect && _this.onConnect(ret, err);
            if(ret) {
                _this.handle = ret.handle; //唯一标识
                mqttClient.addEventListener({handle: _this.handle},function (ret,err) {
                    _this.onListener && _this.onListener(ret,err);
                });
            }else{
                //this.onError && this.on
            }
        });
    };



    this.disconnect = function (callback) {
        mqttClient.disconnect({handle:this.handle},function (ret,err) {
            callback && callback(ret,err);
        });
    };

    this.subscribe = function (topic,qos,callback) {
        qos = qos || 0;
        var options = {topic: topic, qos: qos,handle:this.handle};
        mqttClient.subscribe(options,function (ret,err) {
            callback && callback(ret,err);
        });
    };
    this.unsubscribe = function (topic,callback) {
        var options = {topic: topic,handle:this.handle};
        mqttClient.unsubscribe(options,function (ret,err) {
            callback && callback(ret,err);
        });
    };

    this.publish = function(topic,message,qos,retain,callback){
        qos = qos || 0;
        retain = retain || false;
        mqttClient.publish({topic: topic, message: message, qos: qos,retain:retain,handle:this.handle}, function (ret, err) {
            callback && callback(ret,err);
        });
    }
}