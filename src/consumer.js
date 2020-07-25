importScripts('common.js');

self.consumer = (function() {
    return {
        consume : function(arr,maxElements) {
            while( arr.length > 0 ) {
                if( arr.length == maxElements )
                    break;
                arr.pop();
            }
            console.log('consumed data',arr)
        }
    }
})();

self.onmessage = function(e) {
    var port = e.ports[0];

    //register event handler on the received port to use the MessageChannel for the further communication
    if( !port.onmessage ) {
        port.onmessage = function(e) {
            var action = e.data.action;
            var arr = e.data.arr;
            var iter = e.data.iter;

            //send it to main.js to notify work is done
            self.postMessage(e.data); 
            switch(action) {
                case 'consume':
                    self.consumer.consume(arr, arr.length);
                    port.postMessage( {'action' : 'produce', 'arr' : arr, 'iter' : iter } );
                    break;
            }
        }
    }

    var action = e.data.action;
    switch(action) {
        case 'start':
            //do nothing
            break;
    }
}