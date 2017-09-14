/**
 * canvas绘图工具
 * 1.获取操作的div元素位置
 * 2.获取触摸touchmove的坐标
 * 3.为touchmove的位置创建像素涂块
 * 4.连接触摸的各个坐标点
 * 5.设置同功能的橡皮擦
 * 6.设置保存功能
 * 7.设置重置功能
 */
/*底部工具栏*/
$(function() {
  $('.footbarul').on('click', 'a', function(e) {
    let $a = $(e.currentTarget)
    e.preventDefault()
    $a.addClass('active').siblings('.active').removeClass('active')
    if ($('a').hasClass('active')) {
      $('path').attr('fill', 'black')
      $(this).find('path').attr('fill', 'white')
    }
  });
})


/**/
let canvas = document.querySelector('.canvas')
let context = canvas.getContext('2d')
let reset = document.querySelector('.reset')
let save = document.querySelector('.save')
let clientWidth = document.documentElement.clientWidth
let clientHeight = document.documentElement.clientHeight
let footbarwarper = document.querySelector('.footbarwarper')
let previsousPoint
//let footbar = document.querySelector('.footbar')
//let footbarheight = window.getComputedStyle(footbar,null).getPropertyValue("height") //获取footbar中height属性值
//var xxd = footbar.getBoundingClientRect().top //获得相对于视口的top坐标
canvas.width = clientWidth
canvas.height = footbarwarper.offsetTop //offsetTop获取的数值没有px
//canvas.height = clientHeight-parseInt(footbarheight) //将footbarheight高度100px转化成100 因为html>style属性没有px

canvas.addEventListener('touchmove', function(e) {
  let $index = $('.footbarul>a').filter('.active').index()
  e.preventDefault
  let {
    pageX,
    pageY
  } = e.touches[0] //ES6语法
  //pageX = e.touches[0].pageX
  //pageY = e.touches[0].pageY
  if ($index === 0) {
    if (previsousPoint) {
      context.strokeStyle = '#0271BC'
      context.lineWidth = 3
      context.beginPath() //画线
      context.moveTo(previsousPoint.x, previsousPoint.y) //上一个点
      context.lineTo(pageX, pageY) //当前画点
      context.stroke()
    }
    previsousPoint = {
      'x': pageX,
      'y': pageY
    }
  } else if ($index === 1) {
    context.clearRect(pageX - 10, pageY - 10, 20, 20)
  }
})
canvas.addEventListener('touchend', function(e) {
  previsousPoint = null
})
reset.onclick = function() {
  context.clearRect(0, 0, canvas.width, canvas.height)
}
save.onclick = function() {
  var date = canvas.toDataURL("image/png")
  var newWindow = window.open('about:blank', 'image form canvas')
  newWindow.document.write("<img src = '" + date + "' alt='form canvas'/>")
}
