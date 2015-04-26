///<reference path="../../../bower_components/pow-core/lib/pow-core.d.ts"/>

module jd {

  // Freeze any running examples on scroll
  // Freeze any running examples when a new example is clicked on.

  interface VelocityBox {
    box:pow2.Rect;
    element:HTMLDivElement;
    velocity:pow2.Point;
  }

  /**
   * Which github tag of pow-core files are we using?
   */
  export var TAG:string = 'v0.1.9';

  /**
   * Basic example.  It is initialized, may be started and paused.
   */
  export class PowCoreExample {
    protected _time:pow2.Time = new pow2.Time();

    constructor(public container:HTMLElement) {
      this.container.addEventListener('click', ()=> {
        this._time.running ? this.stop() : this.start();
      }, false);
    }

    init() {
    }

    stop() {
      this._time.stop();
      this.onStop();
    }

    start() {
      this._time.start();
      this.onStart();
    }

    onStop() {
      // stop processing on the page
    }

    onStart() {
      // clicked on example, start time and anything that processes
    }

    /**
     * Get the path to a CORS capable CDN version of a github project file.
     * @param repoRelativeFile The path in the pow-core repo, e.g. test/fixtures/vezu.png
     * @param tag The git repo tag to get the file from
     * @returns {string} a url of a file that can be retrieved cross-origin from a CDN.
     */
    getCDNFile(repoRelativeFile:string, tag:string = TAG) {
      return 'https://cdn.rawgit.com/justindujardin/pow-core/' + tag + '/' + repoRelativeFile;
    }
  }
  export class PowCoreResourceExample extends PowCoreExample {

    /**
     *
     */
    init() {
      // Load Audio Resource.
      var loader = new pow2.ResourceLoader();
      var container = document.getElementById('resource-objects');

      function loadResource(url:string, then:(data:any)=>any) {
        var resource = loader.load(url);
        resource.once(pow2.Resource.READY, function () {
          then(resource.data);
        });
      }

      // Load Audio Resource.
      loadResource(this.getCDNFile('test/fixtures/tele'), function (data) {
        data.controls = true;
        container.appendChild(data);
      });

      // Load Image Resource.
      loadResource(this.getCDNFile('test/fixtures/vezu.png'), function (data) {
        container.appendChild(data);
      });

    }
  }
  export class PowCoreTimeExample extends PowCoreExample {

    /**
     * HIGH FREQUENCY TIMER.  Click to start/stop.
     */
    init() {
      var timer = document.getElementById('time-timer');
      var counter = {
        count: 0,
        tick: function (elapsedMs:number) {
          counter.count += elapsedMs;
          timer.innerHTML = "Elapsed: " + counter.count;
        }
      };
      timer.innerHTML = "Click to Start";
      this._time.addObject(counter);
    }

  }
  export class PowCoreSpatialExample extends PowCoreExample {

    /**
     * Rectangles moving in a container, displaying overlaps with css class changes.
     */
    init() {
      var extent = new pow2.Point(400, 200);
      var boxSize:number = 42;
      var boxes = 256;

      var objects:VelocityBox[] = [];
      for (var i = 0; i < boxes; i++) {
        var randomX = Math.floor(Math.random() * extent.x);
        var randomY = Math.floor(Math.random() * extent.y);
        var velocityX = (Math.random()) + 1;
        var velocityY = (Math.random()) + 1;
        if (Math.random() >= 0.5) {
          velocityX *= -1;
        }
        if (Math.random() >= 0.5) {
          velocityY *= -1;
        }
        var box:VelocityBox = {
          box: new pow2.Rect(randomX, randomY, boxSize, boxSize),
          velocity: new pow2.Point(velocityX, velocityY),
          element: document.createElement('div')
        };
        this.container.appendChild(box.element);
        objects.push(box);
      }

      // Animate with time updates
      var counter = {
        count: 0,
        animateInterval: 250,
        tick: function (elapsedMs:number) {
          counter.count += elapsedMs;
          var updatePosition:boolean = false;
          if (counter.count >= counter.animateInterval) {
            counter.count = counter.count % counter.animateInterval;
            updatePosition = true;
          }

          var l:number = objects.length;
          for (var i = 0; i < l; i++) {
            var object:VelocityBox = objects[i];

            // Reflect the velocity if we reach the bounds of the rectangle.
            if (object.box.point.x < 0) {
              object.box.point.x = 0;
              object.velocity.x *= -1;
            }
            else if (object.box.point.y < 0) {
              object.box.point.y = 0;
              object.velocity.y *= -1;
            }
            else if (object.box.getBottom() >= extent.y) {
              object.box.point.y = extent.y - object.box.extent.y;
              object.velocity.y *= -1;
            }
            else if (object.box.getRight() >= extent.x) {
              object.box.point.x = extent.x - object.box.extent.x;
              object.velocity.x *= -1;
            }

            // Add the current velocity to the box position.
            object.box.point.add(object.velocity);

            if (updatePosition) {
              var xform = 'translate(' + object.box.point.x + 'px,' + object.box.point.y + 'px)';
              object.element.style['-moz-transform'] = xform;
              object.element.style['-webkit-transform'] = xform;
              object.element.style['transform'] = xform;
            }

          }
        }
      };
      this._time.addObject(counter);


    }
  }

  /**
   * The demo id->class mapping.
   */
  export var DEMOS:{[id:string]:Function} = {
    'resource-objects': PowCoreResourceExample,
    'time-timer': PowCoreTimeExample,
    'spatial-objects': PowCoreSpatialExample
  };


  export class PowCoreDemos {
    instances:PowCoreExample[];

    constructor() {
      this.instances = [];
      var examples:NodeList = document.querySelectorAll('.pow-demo');
      _.each(examples, (exampleContainer:HTMLElement) => {
        var example:any = DEMOS[exampleContainer.id];
        if (example) {
          var instance = <PowCoreExample>new example(exampleContainer);
          instance.init();
          this.instances.push(instance);
        }
      });

      document.addEventListener('scroll', ()=> {
        _.each(this.instances, (i:PowCoreExample)=> i.stop());
      }, false);

    }
  }

}

