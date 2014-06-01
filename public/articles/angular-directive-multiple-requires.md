AngularJS directive multiple controller requires
---

Sometimes you need to require an ancestor controller in a directive that also needs access to its own controller.

Here's how:

<a class="jsbin-embed" href="http://jsbin.com/doduhosi/3/embed?js">Angular Directive Multiple Controller Requires</a><script src="http://static.jsbin.com/js/embed.js"></script>
<div style="width: 100%; text-align: center;">As a <a href="https://gist.github.com/justindujardin/19767e8ea72ccd2f41d3">Github Gist</a></div>
It's a little unintuitive at first, but the trick is that when you need to require other controllers, you need to explicitly require your own controller by directive name, then pick each out of the array that is passed in to the linking function.

Is there a better way to do this that I'm not aware of? This seems pretty Angulary to me.