AngularJS directive multiple controller requires
---

Sometimes you need to require an ancestor controller in a directive that also needs access to its own controller.

---

<small>Here's how:</small>

```javascript
var app = angular.module('yourApp',[]);
app.directive("parentDirective", function(){
  return {
    restrict: "A",
    controller:function(){
      this.test = function(){
        return "parentController - okay";
      };
    }
  };
});
app.directive("complexDirective", function(){
  return {
    restrict: "A",
    require:["complexDirective","^parentDirective"],
    controller:function(){
      this.test = function(){
        return "complexController - okay";
      };
    },
    link: function(scope,element,attributes,controllers) {
      var thisController = controllers[0];
      var parentController = controllers[1];
      scope.thisValue = thisController.test();
      scope.parentValue = parentController.test();
    }
  };
});
```

 <small>as [jsbin](http://jsbin.com/doduhosi/3/edit?html,js,output) or [gist](https://gist.github.com/justindujardin/19767e8ea72ccd2f41d3), if you prefer</small>

---

It's a little unintuitive at first, but the trick is that when you need to require other controllers, you need to explicitly require your own controller by directive name, then pick each out of the array that is passed in to the linking function.
