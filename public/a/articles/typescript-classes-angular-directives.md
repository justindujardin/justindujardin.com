Typescript Classes with AngularJS Directives
---

Marrying typescript classes and Angular directives in a sane manner.

---

Here's what I came up with that feels pretty good:

```typescript
module MyApp {
  declare var angular;
  var app = angular.module('yourApp',[]);
  class CustomDirectiveController {
     static $inject:string[] = ['$rootScope'];
     constructor(public $rootScope:any){}
     clear(){
       this.$rootScope.text = '';
     }
  }
  app.directive("customDirective", [ () => {
     return {
        restrict: "E",
        controller:CustomDirectiveController,
        controllerAs:'ctrl',
        link:(scope,element,attributes,ctrl:CustomDirectiveController) => {
           ctrl.$rootScope.text = "Injected $rootScope properly into controller class";
        }
     };
  }]);
}
```

<small>as [jsbin](http://jsbin.com/vozakunu/3/edit?html,js,output) or [gist](https://gist.github.com/justindujardin/f9cbd011498a78fdcfbd), if you prefer</small>

---

This gives me a few things that are highly desirable:

 1. Dependency Injection without a bunch of boilerplate.  Just use a custom constructor and annotate the class with a static variable to identify the required injections.
 2. Strongly typed injectables.  There's a difficult problem with Angular and Typescript in that with TS you want to declare interfaces and classes, and then reference them by type.  In Angular you want to have access to dependency injected utilities, but they're usually injected into a factory function or directive closure.   You can't export a Typescript class from here, and maintain access to the injected dependencies, so you have to somehow get them injected outside of the closure in order to properly expose a class so that you can reference its type data.

What have your experiences been with Typescript and AngularJS?  Are there other useful ways of structuring angular code with Typescript that I haven't stumbled upon?