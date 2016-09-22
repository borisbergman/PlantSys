

(function() {


})();


$(document).ready(function (){
    var socket = io();
    dictoo = {true : 'on', false : 'off'};
    currenState = {        };

    var disableEvent = false;


    $("#buttons input").each(function(i, el){
       $('#' + el.id + ':input').change(function(e, s) {
          if(disableEvent) return;
          socket.emit('message', {
          id : el.id ,
          checked : el.checked});
      });
    })

    socket.on('switched', function(msg){
        //alert(msg);
        if($('#' + msg.id).is(':checked') === msg.checked) {
            return;
        }
        //alert(msg);
        disableEvent = true;
        $('#' + msg.id).bootstrapToggle(dictoo[msg.checked]);
        disableEvent = false;
    });
});
