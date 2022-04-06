function goTo(){
  window.location.href='../html/addNetwork.html';
}
// 向后端发起ajax请求
function PyTable(){
  let urlb = '/cameras/';
  $.ajax({
    url: host+urlb,
    method:"get",
    success:function(event){
      let data = event.data
      console.log(data);
      let str=''
      for(let i=0;i<data.length;i++){
        str += `
        <tr>
            <td> ${data[i].id}</td>
            <td> ${data[i].ip}</td>
            <td> ${data[i].maco}</td>
            <td> ${data[i].maca}</td>
            <td> ${data[i].location}</td>
            <td>
            <button type="button" class="layui-btn layui-btn-danger"  onclick="deluser(${data[i].id})">删除</button>
            </td> 
        </tr>
        `
      }
      $('#TablDate').html(str);
    }
  })
}
PyTable();
// 删除请求
layui.use('layer',function(){});
function deluser(id){
  //  console.log('点击成功');
  layer=layui.layer;
  layer.confirm('确定要删除网络设备吗？', {
     btn: ['确定','取消'] //按钮
  },
    function(){
      // console.log('确认删除');
     // 在这里发起一个ajax请求
    $.ajax({
      url:host + `/cameras/${id}/`,
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

