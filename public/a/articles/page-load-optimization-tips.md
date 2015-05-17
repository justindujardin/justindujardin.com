Tips For Optimizing Page Load Times 
---

Over the past few weeks I've been working to get my page load times down to under [1 second](https://blog.kissmetrics.com/loading-time/). After 
quite a bit of tweaking (*and no small amount of hacking*) I have mostly achieved this goal. If you are similarly obsessed with the idea of 
lightning fast page load times, here are a few things that might be useful:

 - **Your server must respond in ~200ms**, so avoid database queries and prefer static content wherever possible.  Any
   hosting provider can probably serve up an html file in around this time, but when you start adding server
   logic, you'll probably need a beefy system to keep your response times down.  It's a good thing static content
   is hot right now, I suppose.
 - **Be prepared to inline content such as CSS and Javascript**--extra requests can add considerable time 
   to mobile users on cell networks.  Ideally you'll not have any remote css/javascript files to load 
   before the above-the-fold content has rendered.
 - **Be prepared to produce two sets of CSS styles for your site**, one that is for the above-the-fold content
   and another that is for everything else.  This can be tricky but is worth it if you're using a large 
   CSS framework, particularly if that framework references font files that will also need to be loaded.
 - **Be prepared to asynchronously load large libraries**. If you are using any large javascript libraries, 
   asynchronously load them after the page rendered.  Combine this with a loading indicator if there is no 
   meaningful content after the initial page render.

Paul Irish gave a pretty cool [talk about this](https://www.youtube.com/watch?v=E5lZ12Z889k) and 
[published his slides](https://docs.google.com/presentation/d/1MtDBNTH1g7CZzhwlJ1raEJagA8qM3uoV7ta6i66bO2M/present).