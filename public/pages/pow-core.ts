///<reference path="../vendor/pow-core/lib/pow-core.d.ts"/>
module jd {
  export class PowCoreExamples {
    /**
     * Which github tag of pow-core files are we using?
     */
    static TAG:string = 'v0.1.8';

    constructor() {
    }

    /**
     * Get the path to a CORS capable CDN version of a github project file.
     * @param repoRelativeFile The path in the pow-core repo, e.g. test/fixtures/vezu.png
     * @param tag The git repo tag to get the file from
     * @returns {string} a url of a file that can be retrieved cross-origin from a CDN.
     */
    getCDNFile(repoRelativeFile:string,tag:string = PowCoreExamples.TAG) {
      return 'https://cdn.rawgit.com/justindujardin/pow-core/' + tag + '/' + repoRelativeFile;
    }

    /**
     *
     */
    resourceExamples() {
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

    /**
     * HIGH FREQUENCY TIMER.  Click to start/stop.
     */
    timerExample() {
      var timer = document.getElementById('time-timer');
      timer.onclick = function () {
        time.running ? time.stop() : time.start();
        return false;
      };

      var time = new pow2.Time();
      var counter = {
        count: 0,
        tick: function (elapsedMs:number) {
          counter.count += elapsedMs;
          timer.innerHTML = "Elapsed: " + counter.count;
        }
      };
      time.addObject(counter);

    }

  }
}

