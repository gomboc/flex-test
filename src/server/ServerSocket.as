
package server 
{
	
	import flash.events.DataEvent;
	import flash.net.XMLSocket;
	import spark.components.TextArea;

	
	public class ServerSocket
	{
		
		public var appliction:Object;
		
		public var domain:String = "localhost";
	
		public var port:Number = 8080;
	
		public var socket:XMLSocket;
			
	
		public function ServerSocket( app:Object )
		{
			appliction = app;
			
			socket = new XMLSocket();
		}
		
		
		public function closeSocket():void {
        	
        	socket.close();
        }
        
        public function connectSocket():void {
        	
			socket.connect( domain, port );
		
            socket.addEventListener( DataEvent.DATA, dataHandler );
        }
        
        public function dataHandler( event:DataEvent ):void {
        
        	if( event.data.indexOf( "cross-domain-policy" ) == -1 ) {
        
        		appliction.textarea2.appendText( event.data + "\n" );
        	}
        }
        
        public function sendData():void {
        
        	socket.send( appliction.textarea1.text );
        	
        	appliction.textarea1.insertText( "" );
        }
	}
}