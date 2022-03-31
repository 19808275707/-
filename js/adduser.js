// 向后端发起Ajax请求
        $('#post').click(function () {
            $.ajax({
                url: host+'/signup/',
                type: 'post',
                contentType: 'application/json',
                xhrFields: {
                    withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
                },
                data: JSON.stringify({
                    "username": $('#i1').val(),
                    "password": $('#i2').val(),
                    "fullname": $('#i3').val(),
                    "phone": $('#i4').val(),
                    "is_staff": $('[name="is_staff"]:checked').val(),
                }),
                success: function (event) {
                    console.log(event)
                    if(event.code===100){
                        alert('添加用户成功')
                        window.location.href='../html/admin.html'
                    }
                    else if(event.code===102){
                        alert('用户名不可用')
                    }else{
                        alert('添加用户失败')
                    }
                    }   
                })
             })