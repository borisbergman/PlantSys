

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
          id : el.id.split('-')[1],
          status :
            {
              checked : el.checked,
              time : 10
            }
          });
      });
    })

    socket.on('switched', function(msg){
        $('#time-' + msg.id).text(msg.status.time);
        if($('#input-' + msg.id).is(':checked') === msg.status.checked) {
            return;
        }
        disableEvent = true;
        $('#input-' + msg.id).bootstrapToggle(dictoo[msg.status.checked]);
        disableEvent = false;
    });

});
