var sbUtils = {
    request : function(method, url, parameters = {}, successFunc = function(param){}, errorFunc = function(param){},contenttype="urlencoded"){
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            if(method == "POST"){
                if(contenttype == "json"){
                    xhr.setRequestHeader("Content-Type", "application/json");
                    parameters = JSON.stringify(parameters);
                }else
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            xhr.onload = function(){
                if (this.readyState == 4){
                    if(this.status == 200 || this.status == 201){
                        successFunc(this.responseText);
                        resolve(this.responseText);
                    }else{
                        errorFunc(this.responseText);
                        resolve(this.responseText);
                    } 
                }
            };
            xhr.onerror = function(){
                errorFunc(["false", "Sistemsel Hata"]);
                resolve(["false", "Sistemsel Hata"]);
            }
            xhr.send(parameters);
        });
    },
}