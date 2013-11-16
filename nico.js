var path = require('path');


// {{ settings for nico
exports.theme = __dirname
exports.source = process.cwd()
exports.output = path.join(process.cwd(), '_site')
exports.permalink = '{{directory}}/{{filename}}.html'
if (pkg.family === 'arale') {
  exports.google = 'UA-36247332-1'
} else if (pkg.family === 'alice') {
  exports.google = 'UA-39169474-1'
}
exports.ignorefilter = function(filepath, subdir) {
  if (/^(_site|_theme|node_modules|\.idea)/.test(subdir)) {
    return false;
  }
  return true;
}
exports.writers = [
  'nico.PageWriter',
  'nico.StaticWriter',
  'nico.FileWriter',
  'nico.MochaWriter'
]
// end settings }}

// extends for theme usage, that can be accessable by {{config.xxx}}
exports.assets_host = 'http://assets.spmjs.org';

var pkg = require(path.join(process.cwd(), 'package.json'))
exports.package = pkg;

exports.filters = {
  fixlink: function(html) {
    // format permalink, ends without .html
    html = html.replace(/(href="[^"]+)\.md(">)/ig, "$1.html$2");
    return html;
  },
  fixIssues: function(html) {
    // format permalink, ends without .html
    html = html.replace(/\s#([0-9]+)/ig, '<a href="'+pkg.bugs.url+'/$1">#$1</a>');
    return html;
  },
  getNickName: function(html) {
    var reg = /^(.*) (.*)$/;
    var m = html.match(reg);
    return m ? m[1] : '';
  }
}

exports.isCssModule = (function() {
 // 名称若恰好为 stylib
  if (pkg.family === 'alice' || pkg.name === 'stylib') {
    return true
  }
  // output 中全是样式才用 alice
  var output = pkg.spm.output
  if (output) {
    for (var i in output) {
      var f = output[i]
      if (!/\.(css|stylus|less)$/.test(f)) return false
    }
  } else {
    return true
  }
  return true
})()
