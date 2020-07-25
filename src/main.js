
            this.channel = new MessageChannel();
            this.producer = new Worker("../src/producer.js");
            this.consumer = new Worker("../src/consumer.js");

            var evtHandler = function(e) {
                if( e.data.action == 'end' ) {
                    end()
                } else {
                    if(e.data.arr)
                        // this.model.set(e.data.arr);
                        console.log('work is done');
                }
            }

            this.producer.addEventListener('message', evtHandler, false);
            this.consumer.addEventListener('message', evtHandler, false );
            
        
            if( this.channel ) {
                this.producer.postMessage({ action : 'start'}, [this.channel.port1]);
                this.consumer.postMessage({ action : 'start'}, [this.channel.port2]);
            }

            var end = function() {
                this.producer.terminate();
            }
      
       