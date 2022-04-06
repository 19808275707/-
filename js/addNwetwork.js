// 向后端发起Ajax请求
$('#post').click(function () {
    $.ajax({
        url: host+'/cameras/',
        type: 'post',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
        },
        data: JSON.stringify({
            "ip": $('#i1').val(),
            "mac1": $('#i2').val(),
            "mac2": $('#i3').val(),
            "location": $('#i4').val(),
        }),
        success: function (event) {
            console.log(event)
            if(event.code===100){
                alert('添加网络设备成功')
                window.location.href='../html/network.html'
            }
            else if(event.code===102){
                alert('网络设备不存在')
            }else{
                alert('添加网络设备失败')
            }
            }   
        })
    })