// window.onload = () => {
    let height = $(window).height()
    $('.main').height(height-60)
// }

// 登录成功之后的用户显示到index span 里
if (sessionStorage.username===''){
    $('#userdata').text('用户')
}else{
    $('#userdata').text(sessionStorage.username)
}

// console.log(localStorage.username)
// 点击退出账号发起的请求
function exit(){
    console.log('123');
    sessionStorage.removeItem('username')
    $('#userdata').text('用户')
    console.log('kkkkk')
     $.ajax({
        url: host+'/logout/',
        method:'get',
        xhrFields: {
            withCredentials: true
        },
        // suceess:function(data){
        // }
    })
    setTimeout(function(){
        window.location.reload()
      },500)

}
// <!-- 引入图片的webscoket 和数据源-->
// 获取后端对方的图片地址
    socket = new WebSocket(wshost+"/homepage");
    // 与后端建立webSocketj连接
    socket.onopen = function (event) {
    }
    // 创建webSocketj连接成功之后 接受图片源
    socket.onmessage = function (event) {
        // 创建标签
        let data = JSON.parse(event.data)
        $('#img1').empty()
        $('#img2').empty()
        $('#img3').empty()
        $('.alertmsg').remove()
        $(`<img src=${imgroot.concat(data[0].picture.slice(mediaroot.length))} alt="" width="100%" height="100%"/> class="alertimg" `).appendTo($('#img1'))
        $(`<div  class="alertmsg">
            <p>报警名称：${data[0].name}</p>
            <p>报警描述：${data[0].description}</p>
            <p>报警等级：${data[0].level}</p>
            <p>报警位置：${data[0].location}</p>
            <p>报警时间：${data[0].time}</p>
        </div>`).appendTo($('#msg1'))
        $(`<img src=${imgroot.concat(data[1].picture.slice(mediaroot.length))} alt="" width="100%" height="100%"/> class="alertimg"`).appendTo($('#img2'))
        $(`<div  class="alertmsg">
            <p>报警名称：${data[1].name}</p>
            <p>报警描述：${data[1].description}</p>
            <p>报警等级：${data[1].level}</p>
            <p>报警位置：${data[1].location}</p>
            <p>报警时间：${data[1].time}</p>
        </div>`).appendTo($('#msg2'))
        $(`<img src=${imgroot.concat(data[2].picture.slice(mediaroot.length))} alt="" width="100%" height="100%"/> class="alertimg"`).appendTo($('#img3'))
        $(`<div  class="alertmsg">
            <p>报警名称：${data[2].name}</p>
            <p>报警描述：${data[2].description}</p>
            <p>报警等级：${data[2].level}</p>
            <p>报警位置：${data[2].location}</p>
            <p>报警时间：${data[2].time}</p>
        </div>`).appendTo($('#msg3'))  
    }
// <!-- 引入视频流的js部分 -->

    var video1 = document.getElementById('video1');
    var url1 = webrtc+'test1';
    var player1 = new JSWebrtc.Player(url1, { video: video1, autoplay: true, });

    var video2 = document.getElementById('video2');
    var url2 = webrtc+'test2'
    var player2 = new JSWebrtc.Player(url2, { video: video2, autoplay: true, });

    var video3 = document.getElementById('video3');
    var url3 = webrtc+'test3'
    var player3 = new JSWebrtc.Player(url3, { video: video3, autoplay: true, });

    var video4 = document.getElementById('video4');
    var url4 = webrtc+'test4'
    var player4 = new JSWebrtc.Player(url4, { video: video4, autoplay: true, });

// <!-- 侧边栏拖拽 -->

// 思路设置一个可拖动元素和空的区域
//  获取到draggable， droppables两个元素
    const draggable = document.querySelector('draggable');
    const droppables = document.getElementsByClassName('.droppable');
    function dragStart() {
        this.className += ' dragging';
        setTimeout(() => {
            this.className = 'invisible';
        }, 0);
        draggable.addEventListener('dragstart');
    }
    function dragEnd() {
        this.className = 'draggable';
        draggable.addEventListener('dragend');
    }
    // 监听droppable的相关事件
    for (const droppable of droppables) {
        droppable.addEventListener('dragover', dragOver);
        droppable.addEventListener('dragleave', dragLeave);
        droppable.addEventListener('dragenter', dragEnter);
        droppable.addEventListener('drop', dragDrop);
    }
    function dragOver(e) {
        e.preventDefault();
    }
    function dragEnter(e) {
        e.preventDefault();
        this.className += ' drag-over';
    }
    function dragLeave(e) {
        this.className = 'droppable';
    }
    function dragDrop(e) {
        this.className = 'droppable';
        this.append(draggable);
    }



