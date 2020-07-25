importScripts('common.js');

self.producer = (function() {
    return {
        anyNumber : function(arr,max) {
            var arr = [];
            for( var i = 1; i <= max; i++ ) {
                if( i > max )
                    break;

                arr.push(i)
            }
            return arr;
        },
    }
})();


self.onmessage = function(e) {
    var port = e.ports[0];
    if( !port.onmessage ) {
        port.onmessage = function(e) {
            var action = e.data.action;
            var arr = e.data.arr;
            var iter = e.data.iter;

            console.log('iteration no ::', iter)

            // self.postMessage(e.data); 

            switch(action) {
                case 'produce':
                    if( iter == MAX_ITERATIONS ) {
                        self.postMessage( { 'action' : 'end' } );
                        self.close();
                    } else {
                        var arr = self.producer.anyNumber( arr , MAX_ELEMENTS);
                        console.log('produced data',arr)
                        port.postMessage( { 'action' : 'consume', 'arr' : arr, 'iter' : ++iter } );
                    }
                    break;
            }
        }
    }

    var action = e.data.action;
    switch(action) {
        case 'start':
            var arr = self.producer.anyNumber( [], MAX_ELEMENTS);
            console.log('produced data',arr)
            port.postMessage( { 'action' : 'consume', 'arr' : arr, 'iter' : 1 } );
            break;
        default:
    }
}