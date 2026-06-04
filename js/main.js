$(function(){
  var url = window.location;
// Will only work if string in href matches with location
$('.list-service .navbar-nav li a[href="'+ url +'"]').parent().removeClass('active');
// Will also work for relative and absolute hrefs
$('.list-service .navbar-nav li a').filter(function() {
    return this.href == url;
}).parent().addClass('active');
 // $(this).addClass('active');

})