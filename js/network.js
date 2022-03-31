layui.use(['laypage', 'layer'], function(){
    var laypage = layui.laypage
    ,layer = layui.layer;
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
