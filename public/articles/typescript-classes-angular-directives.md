Typescript Classes with AngularJS Directives
---

_So it turns out, there is an elegant way of making use of TypeScript classes and AngularJS directives._

Here's what I came up with that feels pretty good:

<a class="jsbin-embed" href="http://jsbin.com/vozakunu/3/embed?js">Using Typescript Classes with Angular Directives</a><script src="http://static.jsbin.com/js/embed.js"></script>
<div style="width:100%;text-align:center;">As a <a href="https://gist.github.com/justindujardin/f9cbd011498a78fdcfbd">Github Gist</a></div>

This gives me a few things:

 - Dependency Injection without a bunch of boilerplate.  Just use a custom constructor and annotate the class with a static variable to identify the required injections.
 - Strongly typed injectables.  There's a difficult problem with Angular and Typescript in that with TS you want to declare interfaces and classes, and then reference them by type.  In Angular you want to have access to dependency injected utilities, but they're usually injected into a factory function or directive closure.   You can't export a Typescript class from here, and maintain access to the injected dependencies, so you have to somehow get them injected outside of the closure in order to properly expose a class so that you can reference its type data.

What have your experiences been with Typescript and AngularJS?  Are there other useful ways of structuring angular code with Typescript that I haven't stumbled upon?