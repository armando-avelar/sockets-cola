var socket = io();
var label = $('small');
var searchParams = new URLSearchParams(window.location.search);

console.log(searchParams.has('escritorio'));

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function(){
    socket.emit('atenderTicket', {escritorio: escritorio}, function(resp){
        if(resp === 'No hay tickets'){
            alert(resp);
            label.text(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });
});

socket.on('connect', function(){
    console.log('conectado al servidor')
});

socket.on('disconnect', function(){
    console.log('desconectado del servidor');
});
