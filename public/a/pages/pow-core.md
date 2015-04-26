# pow-core [![Build Status](https://travis-ci.org/justindujardin/pow-core.svg?branch=master)](https://travis-ci.org/justindujardin/pow-core) [![Coverage Status](https://img.shields.io/coveralls/justindujardin/pow-core.svg)](https://coveralls.io/r/justindujardin/pow-core?branch=master)
--- 

<link rel="stylesheet" href="./pow-core.css"/>

A set of Typescript classes for use in the larger projects.  Depends on JQuery for resource loading classes, and Underscore.js.

### Resource Manager
Supports loading Audio, Image, JSON, Javascript, XML, Tiled TMX, and Tiled TSX files.

<div id="resource-objects" class="pow-demo"></div>

### Events
Event emitters are a great way to notify interested third parties about changes to the internal state of a class.


They can be used to update multiple page elements about changes to a data model.


### Spatial Objects
Point and Rect classes for representing spatial objects.

<div id="spatial-objects" class="pow-demo"></div>

### High Frequency Time Updates 
Time manager that can efficiently notify many objects of time and frame updates.

<div id="time-timer" class="pow-demo"></div>

### Application Singletons
World class for grouping app specific data so that there may be many distinct apps on a given page.

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
<script type="text/javascript" src="https://cdn.rawgit.com/justindujardin/pow-core/v0.1.9/lib/pow-core.js"></script>
<script type="text/javascript" src="./pow-core.js"></script>
<script type="text/javascript">
  /*new jd.PowCoreDemos();*/
</script>