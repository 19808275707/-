layui.use(['laypage', 'layer'], function(){
    var laypage = layui.laypage
        //完整功能
    laypage.render({
      elem: 'fenye',
      count: 10,
      layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
      jump: function(obj){
        console.log(obj)
      }
    });
})

// 像后端发起ajax请求
function PyTable(){
  let urlb = '/cameras/';
  $.ajax({
    url: host+urlb,
    method:"get",
    success:function(data){
      console.log(data);
    }

  })

  

}
PyTable();

