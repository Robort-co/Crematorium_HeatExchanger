const path=require('path');
require('esbuild').buildSync({entryPoints:[path.join(__dirname,'viewer.js')],bundle:true,format:'iife',minify:true,outfile:path.join(__dirname,'../viewer.js'),legalComments:'eof'});
