  // 一 向后端发起ajax请求 拿到后端表格数据
  function pyTable(){
    let urlb = '/alerts/';
    $.ajax({
      url: host + urlb,
      method:'get',
      xhrFields: {
        withCredentials: true
      },
      success:function(data){     
  // 三渲染页码
        let pydata = data.data
        var laypage = layui.laypage;
        laypage.render({
          elem: 'fenye',
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
            $('#img').empty()
          Ttable(curr,limit,pydata)
          }
        }); 
      }
    })
  }
  // 二拿到后端数据 进行前端渲染表格
  function Ttable(page,limit,data){
    let str=''
    let pages =(page-1)*limit
    let newData = data.slice(pages,pages+limit)
    for(let i=0;i<newData.length;i++){
      str+=`
          <tr class="trori" onclick="alertps(${i})">
            <td >${i+1}</td/>
            <td >${newData[i].name}</td/>
            <td >${newData[i].time}</td/>
            <td >${newData[i].level}</td/>
            <td >${newData[i].description}</td/>
            <td >${newData[i].location}</td/>
          </tr>
      `
      $(`<img src=${imgroot.concat(newData[i].picture.slice(mediaroot.length))} alt="" width="100%" height="100%"id="img${i}" class="sideimg"/>
        <div style="color:white" class="sideimg" id="desc${i}">
          <p>报警名称：${newData[i].name}</p>
          <p>报警描述：${newData[i].description}</p>
          <p>报警等级：${newData[i].level}</p>
          <p>报警位置：${newData[i].location}</p>
          <p>报警时间：${newData[i].time}</p>
        </div>
          `).appendTo($('#img'))
      $(`.sideimg`).hide();
      $(`#img0`).show();
      $(`#desc0`).show();
    };
      $('#pyData').html(str);
  }
    pyTable();

  // 图片
  function alertps(i){
    $('.sideimg').hide();
    $(`#img${i}`).show();
    $(`#desc${i}`).show();
  }
  // 查询
  $('#search').click(function(){
    let date_from = $('#starttime').val()
    let date_to = $('#endtime').val()
    let level = $('#level').val()
    if(date_from==='' || date_to===''){
      alert('请输入查询条件')
    }
    else{
      $.ajax({
        url:host + "/alertse/",
        method:"get",
        xhrFields: {
          withCredentials: true
        },
        data:{
          'date_from':date_from,
          'date_to':date_to,
          'level':level,
        },
        success:function(data){
          console.log(data);
          if(data.code===102){
            alert('查询失败 请重新')
          }
          if(data.code===100){
            $('.trori').remove()
            let pydata = data.data
            var laypage = layui.laypage;
            laypage.render({
              elem: 'fenye',
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
                Ttable(curr,limit,pydata)
              }
            })
          }  
        } 
      }) 
    }
  })
  $('#img0').show()
  // 开始日期选择
  layui.use('laydate', function(){
    var laydate = layui.laydate;
    laydate.render({
      elem: '#starttime'
      ,type: 'datetime',
      });
    });
    // 结束日期选择
    layui.use('laydate', function(){
      var laydate = layui.laydate;
      laydate.render({
        elem: '#endtime'
        ,type: 'datetime',
      });
    });


