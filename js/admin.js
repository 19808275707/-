
// 点击添加用户实现跳转
function goTo(){
    window.location.href='../html/adduser.html';
}
layui.use('laypage', function(){});
// 一.利用ajax请求拿到后端的表的数据 函数用到了一定要调用
function getTable(){
  $.ajax({
    url: host + '/userlist/',
    method:'get',
    xhrFields: {
      withCredentials: true
    },
    success:function(data){
      //三. 前端做分页 后端返回所有数据
      let pydata = data.data
      var laypage = layui.laypage
      laypage.render({
        elem: 'page',
        count: pydata.length,
        pageSize:pydata.length,
        prev:'上一页',
        next:'下一页',
        limit:10,
        limits:[10, 20, 30, 40, 50],
        layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip', 'pageSize'],
        // 点击上一页跟下一页时触发这个函数 
        jump: function(obj){
          let curr = obj.curr
          let limit= obj.limit
          RenderTable(curr,limit,pydata)
        }
      });   
    }
  });
}

//二. 拿到后端数据且进行表中内容渲染
function RenderTable(page,limit,data){
  let str='';
  let pages =(page-1)*limit;
  let newpyData = data.slice(pages,pages+limit);
  for (let i=0;i <newpyData.length;i++){
  str+=`
        <tr>
            <td>${newpyData[i].id}</td>
            <td>${newpyData[i].username}</td>
            <td>${newpyData[i].name}</td>
            <td>${newpyData[i].phone_number}</td>
            <td>${newpyData[i].is_staff==true ?'管理员':'用户'}</td>
            <td>
              <button type="button" class="layui-btn layui-btn-danger" onclick="deluser(${newpyData[i].id})">删除</button>
              <button type="button" class="layui-btn layui-btn-warm"  id="bianji${i}" onclick="edituser(${newpyData[i].id})">编辑</button>
              </td> 
          </tr>
  `
  }
  $('#TableData').html(str);
}
// 调用函数
getTable(); 

// 编辑信息
layui.use('layer',function(){
  layer=layui.layer;
})
function edituser(id){
  layer.open({
      type:1,
      title:'编辑用户信息',
      content:$("#edit"),
      area: ['400px', '300px'],
      btn: ['确认', '取消'],
      success:  function(layero, index){
        console.log('dakail');
          $.ajax({
            url: host + `/user/${id}`,
            type: 'get',
            xhrFields: {
              withCredentials: true
            },
            success: function(data){
              console.log(data.data)
              $('#i1').val(data.data.username);
              $('#i2').val(data.data.name);
              $('#i3').val(data.data.phone_number);
              // $('#i4').val(data.data.is_staff);
            }
          })
      },
      yes: function(index, layero){
        $.ajax({
          url: host + `/user/${id}/`,
          type: 'put',
          contentType:'application/json',
          xhrFields: {
            withCredentials: true
          },
          data:JSON.stringify({
            'username':$('#i1').val(),
            'name':$('#i2').val(),
            'phone_number':$('#i3').val(),
            'is_staff':$('[name="is_staff"]:checked').val()
          }),
          success:function(){
            // console.log('chenggong')
            window.location.reload()
          }
        })
        // console.log('queren')
        layer.close(index); //如果设定了yes回调，需进行手工关闭
      },
      btn2: function(index, layero){
        // console.log('quxiao') 
        layer.close(index)
      },      
      cancel: function(index, layero){ 
          layer.close(index)
      }      
  })
}
  // 删除信息
  layui.use('layer',function(){});
function deluser(id){
  //  console.log('点击成功');
  layer=layui.layer;
  layer.confirm('确定要删除用户信息吗？', {
     btn: ['确定','取消'] //按钮
  },
    function(){
      // console.log('确认删除');
     // 在这里发起一个ajax请求
    $.ajax({
      url:host + `/user/${id}/`,
      method:'delete',
      xhrFields: {
        withCredentials: true
      },
      success:function(data){
        if(data.code===100){
        layer.msg('删除成功', {
          time: 1000, //1秒后自动关闭
        });
        setTimeout(function(){
          window.location.reload()
        },1500)
      }}
    })
  },
    function(){
      // console.log('取消');
      layer.msg('取消', {
         time: 1000, //1秒后自动关闭
      });
  });
}



