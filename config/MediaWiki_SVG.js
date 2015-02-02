MathJax.Hub.Config({
  extensions: 'wiki2jax.js',
  showMathMenu: false,
  showMathMenuMSIE: false,
  jax: ["input/TeX","output/SVG"],
  SVG: {
    font: "STIX-Web",
    addMMLclasses: true
  },
  TeX: {extensions: ["noErrors.js",
                     "noUndefined.js",
                     "AMSmath.js",
                     "AMSsymbols.js",
                     "texvc.js",
                     "color.js",
                     "cancel.js"]}
});

MathJax.Hub.processSectionDelay = 0;

var $$mathjaxOnLoadTime;

MathJax.Hub.Register.StartupHook("onLoad",function () {
  $$mathjaxOnLoadTime = new Date().getTime();
  console.log("[MATHJAX] onLoad");
});

MathJax.Hub.Queue(function () {
  console.log("[MATHJAX] SVG: done in " + (new Date().getTime() - $$mathjaxOnLoadTime));
});

MathJax.Ajax.loadComplete("[MathJax]/config/MediaWiki_SVG.js");
