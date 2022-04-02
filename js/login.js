

    window.onload=function () {
        var btn=document.getElementById("btn");
        btn.onclick=function () {
            var username=document.getElementById("User").value;         //获取用户名input的value
            var password=document.getElementById("Pwd").value;        //获取密码
            var stringData=JSON.stringify({
                'username': username,
                'password': password
            });
            $.ajax({
                type: "post",       //方法类型 
                url: host+"/login/",     //url
                contentType: "application/json;charset=utf-8",
                xhrFields: {
                    withCredentials: true
                },
                data: stringData,
                success: function (data) {
                    console.log(data);
                    if(data.code===100){
                        sessionStorage.username=data.user
                        console.log(sessionStorage.username);
                        window.location.href="../html/index.html"
                    }
                    else{
                        alert('用户名或密码输入错误,请重新输入')
                    }    
                },
            });
        };
    }