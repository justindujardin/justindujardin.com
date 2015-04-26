///<reference path="../vendor/pow-core/lib/pow-core.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var jd;
(function (jd) {
    /**
     * Which github tag of pow-core files are we using?
     */
    jd.TAG = 'v0.1.9';
    /**
     * Basic example.  It is initialized, may be started and paused.
     */
    var PowCoreExample = (function () {
        function PowCoreExample(container) {
            var _this = this;
            this.container = container;
            this._time = new pow2.Time();
            this.container.addEventListener('click', function () {
                _this._time.running ? _this.stop() : _this.start();
            }, false);
        }
        PowCoreExample.prototype.init = function () {
        };
        PowCoreExample.prototype.stop = function () {
            this._time.stop();
            this.onStop();
        };
        PowCoreExample.prototype.start = function () {
            this._time.start();
            this.onStart();
        };
        PowCoreExample.prototype.onStop = function () {
            // stop processing on the page
        };
        PowCoreExample.prototype.onStart = function () {
            // clicked on example, start time and anything that processes
        };
        /**
         * Get the path to a CORS capable CDN version of a github project file.
         * @param repoRelativeFile The path in the pow-core repo, e.g. test/fixtures/vezu.png
         * @param tag The git repo tag to get the file from
         * @returns {string} a url of a file that can be retrieved cross-origin from a CDN.
         */
        PowCoreExample.prototype.getCDNFile = function (repoRelativeFile, tag) {
            if (tag === void 0) { tag = jd.TAG; }
            return 'https://cdn.rawgit.com/justindujardin/pow-core/' + tag + '/' + repoRelativeFile;
        };
        return PowCoreExample;
    })();
    jd.PowCoreExample = PowCoreExample;
    var PowCoreResourceExample = (function (_super) {
        __extends(PowCoreResourceExample, _super);
        function PowCoreResourceExample() {
            _super.apply(this, arguments);
        }
        /**
         *
         */
        PowCoreResourceExample.prototype.init = function () {
            // Load Audio Resource.
            var loader = new pow2.ResourceLoader();
            var container = document.getElementById('resource-objects');
            function loadResource(url, then) {
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
        };
        return PowCoreResourceExample;
    })(PowCoreExample);
    jd.PowCoreResourceExample = PowCoreResourceExample;
    var PowCoreTimeExample = (function (_super) {
        __extends(PowCoreTimeExample, _super);
        function PowCoreTimeExample() {
            _super.apply(this, arguments);
        }
        /**
         * HIGH FREQUENCY TIMER.  Click to start/stop.
         */
        PowCoreTimeExample.prototype.init = function () {
            var timer = document.getElementById('time-timer');
            var counter = {
                count: 0,
                tick: function (elapsedMs) {
                    counter.count += elapsedMs;
                    timer.innerHTML = "Elapsed: " + counter.count;
                }
            };
            timer.innerHTML = "Click to Start";
            this._time.addObject(counter);
        };
        return PowCoreTimeExample;
    })(PowCoreExample);
    jd.PowCoreTimeExample = PowCoreTimeExample;
    var PowCoreSpatialExample = (function (_super) {
        __extends(PowCoreSpatialExample, _super);
        function PowCoreSpatialExample() {
            _super.apply(this, arguments);
        }
        /**
         * Rectangles moving in a container, displaying overlaps with css class changes.
         */
        PowCoreSpatialExample.prototype.init = function () {
            var extent = new pow2.Point(400, 200);
            var boxSize = 42;
            var boxes = 256;
            var objects = [];
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
                var box = {
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
                tick: function (elapsedMs) {
                    counter.count += elapsedMs;
                    var updatePosition = false;
                    if (counter.count >= counter.animateInterval) {
                        counter.count = counter.count % counter.animateInterval;
                        updatePosition = true;
                    }
                    var l = objects.length;
                    for (var i = 0; i < l; i++) {
                        var object = objects[i];
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
        };
        return PowCoreSpatialExample;
    })(PowCoreExample);
    jd.PowCoreSpatialExample = PowCoreSpatialExample;
    /**
     * The demo id->class mapping.
     */
    jd.DEMOS = {
        'resource-objects': PowCoreResourceExample,
        'time-timer': PowCoreTimeExample,
        'spatial-objects': PowCoreSpatialExample
    };
    var PowCoreDemos = (function () {
        function PowCoreDemos() {
            var _this = this;
            this.instances = [];
            var examples = document.querySelectorAll('.pow-demo');
            _.each(examples, function (exampleContainer) {
                var example = jd.DEMOS[exampleContainer.id];
                if (example) {
                    var instance = new example(exampleContainer);
                    instance.init();
                    _this.instances.push(instance);
                }
            });
            document.addEventListener('scroll', function () {
                _.each(_this.instances, function (i) { return i.stop(); });
            }, false);
        }
        return PowCoreDemos;
    })();
    jd.PowCoreDemos = PowCoreDemos;
})(jd || (jd = {}));
//# sourceMappingURL=pow-core.js.map