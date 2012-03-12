var net = require("net");

function policy() {
	  var xml = '<?xml version="1.0"?>\n<!DOCTYPE cross-domain-policy SYSTEM'
	          + ' "http://www.macromedia.com/xml/dtds/cross-domain-policy.dtd">\n<cross-domain-policy>';

	  xml += '<allow-access-from domain="*" to-ports="*"/>';
	  xml += '</cross-domain-policy>';
	  
	  return xml;
}
  
var server = net.createServer(	function ( socket ) {
	
  socket.setEncoding("utf8");
  
  socket.addListener( "connect", function () {
    
//	  socket.write( policy() + '\0' );
	  
	  console.log( "connect" );
  } );
  

  socket.addListener( "data", function ( data ) {
	  
	  if ( data == '<policy-file-request/>\0' ) {
		  
	      socket.write( policy() );
	  } else {
		  
		  socket.write( data + "\0" );
	  }
	  	    
	  console.log( data );
  });
  
  
  socket.addListener( "end", function () {
	  
	  socket.write("end\0"); 
	  
	  socket.end();
    
	  console.log( "end" );
  });
  
});

server.listen( 8080, "localhost" );

var policyServer = net.createServer( function( socket ) {
	
	socket.addListener( "connect", function () {
	    
		socket.write( policy() + '\0' );
	  
		console.log( "policy connect" );
	} );
});

policyServer.listen( 843, "localhost" );
