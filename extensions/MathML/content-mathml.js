/*
 *  /MathJax/extensions/MathML/content-mathml.js
 *
 *  Copyright (c) 2009-2013 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

MathJax.Extension["MathML/content-mathml"]=(function(e){var d=e.Browser.isMSIE;if(d){try{document.namespaces.add("m","http://www.w3.org/1998/Math/MathML")}catch(f){}}var c=e.CombineConfig("MathML.content-mathml",{collapsePlusMinus:true,cistyles:{vector:"bold-italic",matrix:"bold-upright"},symbols:{gamma:"\u03B3"}});var a={version:"2.4",settings:c,transformElements:function(k){for(var h=0,g=k.length;h<g;h++){var n=a.transformElement(k[h]);k[h].parentNode.replaceChild(n,k[h])}},transformElement:function(k){var n=a.cloneNode(k);for(var h=0,g=k.childNodes.length;h<g;h++){a.applyTransform(n,k.childNodes[h],0)}return n},getTextContent:function(g){return g.text!==undefined?g.text:g.innerText!==undefined?g.innerText:g.textContent},setTextContent:function(k,n){for(var h=0,g=k.childNodes.length;h<g;h++){if(k.childNodes[h].nodeType===3){k.removeChild(k.childNodes[h]);h--;g--}}k.appendChild(document.createTextNode(n))},cloneNode:function(n,h){var p;if(n.nodeType===1){var p=a.createElement(n.nodeName);for(var k=0,g=n.attributes.length;k<g;k++){p.setAttribute(n.attributes[k].nodeName,n.attributes[k].nodeValue)}if(h){for(var k=0,g=n.childNodes.length;k<g;k++){var o=a.cloneNode(n.childNodes[k],true);p.appendChild(o)}}}else{if(n.nodeType===3){p=document.createTextNode(n.nodeValue)}}return p},createElement:function(g){var h=(d?document.createElement("m:"+g):document.createElementNS("http://www.w3.org/1998/Math/MathML",g));h.isMathJax=true;return h},getChildren:function(n){var k=[];for(var h=0,g=n.childNodes.length;h<g;h++){if(n.childNodes[h].nodeType===1){k.push(n.childNodes[h])}}return k},classifyChildren:function(p){var o=[],h=[],r=[];for(var n=0,g=p.childNodes.length;n<g;n++){if(p.childNodes[n].nodeType===1){var q=p.childNodes[n],k=q.nodeName;if(k==="bvar"){h.push(q)}else{if(k==="condition"||k==="degree"||k==="momentabout"||k==="logbase"||k==="lowlimit"||k==="uplimit"||(k==="interval"&&o.length<2)||k==="domainofapplication"){r.push(q)}else{o.push(q)}}}}return{args:o,bvars:h,qualifiers:r}},appendToken:function(g,h,n){var k=a.createElement(h);k.appendChild(document.createTextNode(n));g.appendChild(k);return k},applyTransform:function(h,o,g){if(!o){var p=a.createElement("merror");a.appendToken(p,"mtext","Missing child node");h.appendChild(p);return}if(o.nodeType===1){if(a.tokens[o.nodeName]){a.tokens[o.nodeName](h,o,g)}else{if(o.childNodes.length===0){a.appendToken(h,"mi",o.nodeName)}else{var q=a.cloneNode(o);h.appendChild(q);for(var n=0,k=o.childNodes.length;n<k;n++){a.applyTransform(q,o.childNodes[n],g)}}}}else{if(o.nodeType===3){h.appendChild(a.cloneNode(o))}}},createmfenced:function(n,k,p){var o=a.createElement("mfenced");o.setAttribute("open",k);o.setAttribute("close",p);for(var h=0,g=n.length;h<g;h++){a.applyTransform(o,n[h],0)}return o},transforms:{identifier:function(g){return function(k,n,h){a.appendToken(k,"mi",g)}},set:function(h,k){var g=a.transforms.bind("",",","|");return function(o,s){var t=a.classifyChildren(s);var r=t.args,q=t.bvars,u=t.qualifiers;if(q.length){var n=t.args[0];r=r.slice(1);var p=a.createElement("mfenced");p.setAttribute("open",h);p.setAttribute("close",k);g(p,s,n,r,q,u,0);o.appendChild(p)}else{o.appendChild(a.createmfenced(r,h,k))}}},token:function(g){return function(h,p){if(p.childNodes.length===1&&p.childNodes[0].nodeType===3){a.appendToken(h,g,a.getTextContent(p))}else{var n=a.createElement("mrow");for(var o=0,k=p.childNodes.length;o<k;o++){if(p.childNodes[o].nodeType===3){a.appendToken(h,g,a.getTextContent(p.childNodes[o]))}else{a.applyTransform(n,p.childNodes[o],0)}}if(n.childNodes.length){h.appendChild(n)}}}},binary:function(g,h){return function(s,o,q,u,n,r,k){var t=a.createElement("mrow");var p=h<k||(h==k&&g==="-");if(p){a.appendToken(t,"mo","(")}if(u.length>1){a.applyTransform(t,u[0],h)}a.appendToken(t,"mo",g);if(u.length>0){var v=u[(u.length===1)?0:1];a.applyTransform(t,v,h)}if(p){a.appendToken(t,"mo",")")}s.appendChild(t)}},infix:function(g,h){return function(u,o,r,w,n,s,k){var v=a.createElement("mrow");var q=k>h;if(q){a.appendToken(v,"mo","(")}for(var t=0,p=w.length;t<p;t++){if(t>0){a.appendToken(v,"mo",g)}a.applyTransform(v,w[t],h)}if(q){a.appendToken(v,"mo",")")}u.appendChild(v)}},iteration:function(g,h){return function(t,B,G,o,k,x,p){var w=a.createElement("mrow");var A=a.createElement("mo");a.setTextContent(A,g);var r=a.createElement("munderover");r.appendChild(A);var n=a.createElement("mrow");for(var D=0,y=x.length;D<y;D++){if(x[D].nodeName==="lowlimit"||x[D].nodeName==="condition"||x[D].nodeName==="domainofapplication"){if(x[D].nodeName==="lowlimit"){for(var z=0,F=k.length;z<E;z++){var v=k[z];var q=a.getChildren(v);if(q.length){a.applyTransform(n,q[0],0)}}if(k.length){a.appendToken(n,"mo",h)}}var q=a.getChildren(x[D]);for(z=0;z<q.length;z++){a.applyTransform(n,q[z],0)}}else{var q=a.getChildren(x[D]);if(x[D].nodeName==="interval"&&q.length===2){for(var z=0,E=k.length;z<E;z++){var v=b[z];var q=a.getChildren(v);if(q.length){a.applyTransform(n,q[0],0)}}if(k.length){a.appendToken(n,"mo","=")}a.applyTransform(n,a.getChildren(x[D])[0],0)}}}r.appendChild(n);var s=a.createElement("mrow");for(var D=0,y=x.length;D<y;D++){if(x[D].nodeName==="uplimit"||x[D].nodeName==="interval"){var q=a.getChildren(x[D]);for(var z=0,C=q.length;z<C;z++){a.applyTransform(s,q[z],0)}}}r.appendChild(s);w.appendChild(r);for(var D=0,u=o.length;D<u;D++){a.applyTransform(w,o[D],p)}t.appendChild(w)}},bind:function(h,g,k){return function(y,q,t,B,o,u,n){var A=a.createElement("mrow");if(h){a.appendToken(A,"mo",h)}for(var w=0,s=o.length;w<s;w++){var v=o[w];if(w>0){a.appendToken(A,"mo",",")}var p=a.getChildren(v);if(p.length){a.applyTransform(A,p[0],0)}}var z=a.createElement("mrow");var C=false,p;for(var x=0,r=u.length;x<r;x++){if(u[x].nodeName==="condition"){C=true;p=a.getChildren(u[x]);for(var w=0,D=p.length;w<D;w++){a.applyTransform(z,p[w],0)}}}if(C){a.appendToken(A,"mo",k)}A.appendChild(z);for(var x=0,r=u.length;x<r;x++){if(u[x].nodeName!="condition"){a.appendToken(A,"mo","\u2208");p=a.getChildren(u[x]);for(var w=0,D=p.length;w<D;w++){a.applyTransform(A,p[w],0)}}}if(B.length&&(o.length||p.length)){a.appendToken(A,"mo",g)}for(var x=0,s=B.length;x<s;x++){a.applyTransform(A,B[x],0)}y.appendChild(A)}},fn:function(g){return function(n,r,k,q,p,s,h){var o=a.createElement("mrow");if(k.childNodes.length){a.applyTransform(o,k,1)}else{a.appendToken(o,"mi",g)}a.appendToken(o,"mo","\u2061");o.appendChild(a.createmfenced(q,"(",")"));n.appendChild(o)}},minmax:function(g){return function(t,n,p,v,k,r,h){var u=a.createElement("mrow");a.appendToken(u,"mi",g);var q=a.createElement("mrow");a.appendToken(q,"mo","{");for(var s=0,o=v.length;s<o;s++){if(s>0){a.appendToken(q,"mo",",")}a.applyTransform(q,v[s],0)}if(r.length){a.appendToken(q,"mo","|");for(var s=0,o=r.length;s<o;s++){a.applyTransform(q,r[s],0)}}a.appendToken(q,"mo","}");u.appendChild(q);t.appendChild(u)}}}};a.tokens={ci:function(h,n,g){if(n.childNodes.length===1&&n.childNodes[0].nodeType===3){var k=a.appendToken(h,"mi",a.getTextContent(n));var o=n.getAttribute("type");if(o in a.settings.cistyles){k.setAttribute("mathvariant",a.settings.cistyles[o])}}else{a.transforms.token("mi")(h,n,g)}},cs:a.transforms.token("ms"),csymbol:function(h,k,g){var n=k.getAttribute("cd");if(n&&a.contentDictionaries[n]){a.contentDictionaries[n](h,k,g)}else{if(a.settings.symbols[name]){a.appendToken(h,"mi",a.settings.symbols[name])}else{a.tokens.ci(h,k)}}},fn:function(h,k,g){a.applyTransform(h,a.getChildren(k)[0],g)},naturalnumbers:a.transforms.identifier("\u2115"),integers:a.transforms.identifier("\u2124"),reals:a.transforms.identifier("\u211D"),rationals:a.transforms.identifier("\u211A"),complexes:a.transforms.identifier("\u2102"),primes:a.transforms.identifier("\u2119"),exponentiale:a.transforms.identifier("e"),imaginaryi:a.transforms.identifier("i"),notanumber:a.transforms.identifier("NaN"),eulergamma:a.transforms.identifier("\u03B3"),gamma:a.transforms.identifier("\u0263"),pi:a.transforms.identifier("\u03C0"),infinity:a.transforms.identifier("\u221E"),emptyset:a.transforms.identifier("\u2205"),"true":a.transforms.identifier("true"),"false":a.transforms.identifier("false"),set:a.transforms.set("{","}"),list:a.transforms.set("(",")"),interval:function(h,n,g){var p=n.getAttribute("closure");var k,o;switch(p){case"open":k="(";o=")";break;case"open-closed":k="(";o="]";break;case"closed-open":k="[";o=")";break;case"closed":default:k="[";o="]"}h.appendChild(a.createmfenced(a.getChildren(n),k,o))},apply:function(r,o,g){var n=a.classifyChildren(o);var p=n.args[0];var s=n.args.slice(1),k=n.bvars,q=n.qualifiers;if(p){var h=p.nodeName;h=(h==="csymbol")?a.getTextContent(p).toLowerCase():h;if(a.applyTokens[h]){a.applyTokens[h](r,o,p,s,k,q,g)}else{a.transforms.fn(h)(r,o,p,s,k,q,g)}}else{r.appendChild(a.createElement("mrow"))}},cn:function(p,k,g){var s=k.getAttribute("type");var h=k.getAttribute("base");if(s||h){if(h){s="based-integer"}switch(s){case"integer":case"real":case"double":case"constant":a.transforms.token("mn")(p,k);break;case"hexdouble":a.appendToken(p,"mn","0x"+a.getTextContent(k));break;default:var t=a.createElement("apply");var q=a.createElement("mrow");var r=a.createElement(s);t.appendChild(r);if(h){a.appendToken(t,"mn",h)}for(var o=0,n=k.childNodes.length;o<n;o++){if(k.childNodes[o].nodeType===3){a.appendToken(q,"cn",a.getTextContent(k.childNodes[o]))}else{if(k.childNodes[o].nodeName==="sep"){t.appendChild(q);q=a.createElement("mrow")}else{q.appendChild(a.cloneNode(k.childNodes[o],true))}}}t.appendChild(q);a.applyTransform(p,t,0)}}else{a.transforms.token("mn")(p,k)}},vector:function(r,k,g){var s=a.createElement("mrow");a.appendToken(s,"mo","(");var p=a.createElement("mtable");var h=a.getChildren(k);for(var q=0,n=h.length;q<n;q++){var o=a.createElement("mtr");var t=a.createElement("mtd");a.applyTransform(t,h[q],0);o.appendChild(t);p.appendChild(o)}s.appendChild(p);a.appendToken(s,"mo",")");r.appendChild(s)},piecewise:function(h,o,g){var n=a.createElement("mrow");a.appendToken(n,"mo","{");var r=a.createElement("mtable");n.appendChild(r);var q=a.getChildren(o);for(var p=0,k=q.length;p<k;p++){a.applyTransform(r,q[p],0)}h.appendChild(n)},piece:function(k,o,h){var g=a.createElement("mtr");var p=a.getChildren(o);for(i=0,l=p.length;i<l;i++){var n=a.createElement("mtd");g.appendChild(n);a.applyTransform(n,p[i],0);if(i===0){var n=a.createElement("mtd");a.appendToken(n,"mtext","\u00A0if\u00A0");g.appendChild(n)}}k.appendChild(g)},otherwise:function(k,o,h){var g=a.createElement("mtr");var p=a.getChildren(o);if(p.length){var n=a.createElement("mtd");g.appendChild(n);a.applyTransform(n,p[0],0);var n=a.createElement("mtd");n.setAttribute("columnspan","2");a.appendToken(n,"mtext","\u00A0otherwise");g.appendChild(n)}k.appendChild(g)},matrix:function(t,n,g){var k=a.classifyChildren(n);var w=k.args,h=k.bvars,q=k.qualifiers;if(h.length||q.length){var u=a.createElement("mrow");a.appendToken(u,"mo","[");var v=a.createElement("msub");a.appendToken(v,"mi","m");var p=a.createElement("mrow");for(var s=0,o=h.length;s<o;s++){if(s!=0){a.appendToken(p,"mo",",")}a.applyTransform(p,h[s].childNodes[0],0)}v.appendChild(p);u.appendChild(v);var x=a.cloneNode(v,true);a.appendToken(u,"mo","|");u.appendChild(x);a.appendToken(u,"mo","=");for(var s=0,o=w.length;s<o;s++){if(s!=0){a.appendToken(u,"mo",",")}a.applyTransform(u,w[s],0)}a.appendToken(u,"mo",";");for(var s=0,o=q.length;s<o;s++){if(s!=0){a.appendToken(u,"mo",",")}a.applyTransform(u,q[s],0)}a.appendToken(u,"mo","]");t.appendChild(u)}else{var y=a.createElement("mfenced");var r=a.createElement("mtable");for(var s=0,o=w.length;s<o;s++){a.applyTransform(r,w[s],0)}y.appendChild(r);t.appendChild(y)}},matrixrow:function(k,p,h){var g=a.createElement("mtr");var r=a.getChildren(p);for(var q=0,n=r.length;q<n;q++){var o=a.createElement("mtd");a.applyTransform(o,r[q],0);g.appendChild(o)}k.appendChild(g)},condition:function(h,o,g){var n=a.createElement("mrow");var q=a.getChildren(o);for(var p=0,k=q.length;p<k;p++){a.applyTransform(n,q[p],0)}h.appendChild(n)},lambda:function(v,n,g){var q=a.createElement("lambda");var k=a.classifyChildren(n);var y=k.args,h=k.bvars,s=k.qualifiers;if(h.length){a.applyTokens.lambda(v,n,q,y,h,s,g)}else{var w=a.createElement("mrow");for(var u=0,p=y.length;u<p;u++){a.applyTransform(w,y[u],0)}if(s.length){var x=a.createElement("msub");a.appendToken(x,"mo","|");var r=a.createElement("mrow");for(var u=0,o=s.length;u<o;u++){var k=a.getChildren(s[u]);for(var t=0,z=k.length;t<z;t++){a.applyTransform(r,k[t],0)}}x.appendChild(r);w.appendChild(x)}v.appendChild(w)}},ident:function(h,k,g){a.appendToken(h,"mi","id")},domainofapplication:function(h,k,g){var n=a.createElement("merror");a.appendToken(n,"mtext","unexpected domainofapplication");h.appendChild(n)},share:function(h,n,g){var k=a.createElement("mi");k.setAttribute("href",n.getAttribute("href"));a.setTextContent(k,"Share "+n.getAttribute("href"));h.appendChild(k)},cerror:function(h,n,g){var q=a.createElement("merror");var p=a.getChildren(n);for(var o=0,k=p.length;o<k;o++){a.applyTransform(q,p[o],0)}h.appendChild(q)},semantics:function(h,o,g){var n=a.createElement("mrow");var q=a.getChildren(o);if(q.length){var r=q[0];for(var p=0,k=q.length;p<k;p++){if(q[p].nodeName==="annotation-xml"&&q[p].getAttribute("encoding")==="MathML-Presentation"){r=q[p];break}}a.applyTransform(n,r,0)}h.appendChild(n)},"annotation-xml":function(h,o,g){var n=a.createElement("mrow");var q=a.getChildren(o);for(var p=0,k=q.length;p<k;p++){a.applyTransform(n,q[p],0)}h.appendChild(n)}};a.tokens.reln=a.tokens.bind=a.tokens.apply;a.contentDictionaries={setname1:function(h,n,g){var o={C:"\u2102",N:"\u2115",P:"\u2119",Q:"\u211A",R:"\u211D",Z:"\u2124"};var k=a.getTextContent(n);a.appendToken(h,"mi",o[k])},aritherror:function(h,n,g){var k=a.getTextContent(n);a.appendToken(h,"mi",k+":")}};a.applyTokens={rem:a.transforms.binary("mod",3),divide:a.transforms.binary("/",3),remainder:a.transforms.binary("mod",3),implies:a.transforms.binary("\u21D2",3),factorof:a.transforms.binary("|",3),"in":a.transforms.binary("\u2208",3),notin:a.transforms.binary("\u2209",3),notsubset:a.transforms.binary("\u2288",2),notprsubset:a.transforms.binary("\u2284",2),setdiff:a.transforms.binary("\u2216",2),eq:a.transforms.infix("=",1),compose:a.transforms.infix("\u2218",0),left_compose:a.transforms.infix("\u2218",1),xor:a.transforms.infix("xor",3),neq:a.transforms.infix("\u2260",1),gt:a.transforms.infix(">",1),lt:a.transforms.infix("<",1),geq:a.transforms.infix("\u2265",1),leq:a.transforms.infix("\u2264",1),equivalent:a.transforms.infix("\u2261",1),approx:a.transforms.infix("\u2248",1),subset:a.transforms.infix("\u2286",2),prsubset:a.transforms.infix("\u2282",2),cartesianproduct:a.transforms.infix("\u00D7",2),cartesian_product:a.transforms.infix("\u00D7",2),vectorproduct:a.transforms.infix("\u00D7",2),scalarproduct:a.transforms.infix(".",2),outerproduct:a.transforms.infix("\u2297",2),sum:a.transforms.iteration("\u2211","="),product:a.transforms.iteration("\u220F","="),forall:a.transforms.bind("\u2200",".",","),exists:a.transforms.bind("\u2203",".",","),lambda:a.transforms.bind("\u03BB",".",","),limit:a.transforms.iteration("lim","\u2192"),sdev:a.transforms.fn("\u03c3"),determinant:a.transforms.fn("det"),max:a.transforms.minmax("max"),min:a.transforms.minmax("min"),real:a.transforms.fn("\u211b"),imaginary:a.transforms.fn("\u2111"),set:a.transforms.set("{","}"),list:a.transforms.set("(",")"),exp:function(k,p,h,o,n,r,g){var q=a.createElement("msup");a.appendToken(q,"mi","e");a.applyTransform(q,o[0],0);k.appendChild(q)},union:function(k,p,h,o,n,q,g){if(n.length){a.transforms.iteration("\u22C3","=")(k,p,h,o,n,q,g)}else{a.transforms.infix("\u222A",2)(k,p,h,o,n,q,g)}},intersect:function(t,n,q,v,h,r,g){if(h.length){a.transforms.iteration("\u22C2","=")(t,n,q,v,h,r,g)}else{var u=a.createElement("mrow");var p=g>2;if(p){a.appendToken(u,"mo","(")}for(var s=0,o=v.length;s<o;s++){var w=false;if(s>0){a.appendToken(u,"mo","\u2229");if(v[s].nodeName==="apply"){var k=a.getChildren(v[s])[0];w=k.nodeName==="union"}}if(w){a.appendToken(u,"mo","(")}a.applyTransform(u,v[s],2);if(w){a.appendToken(u,"mo",")")}}if(p){a.appendToken(u,"mo",")")}t.appendChild(u)}},floor:function(k,q,h,p,o,r,g){var n=a.createElement("mrow");a.appendToken(n,"mo","\u230a");a.applyTransform(n,p[0],0);a.appendToken(n,"mo","\u230b");k.appendChild(n)},conjugate:function(k,q,h,p,o,r,g){var n=a.createElement("mover");a.applyTransform(n,p[0],0);a.appendToken(n,"mo","\u00af");k.appendChild(n)},abs:function(k,q,h,p,o,r,g){var n=a.createElement("mrow");a.appendToken(n,"mo","|");a.applyTransform(n,p[0],0);a.appendToken(n,"mo","|");k.appendChild(n)},and:function(k,p,h,o,n,q,g){if(n.length||q.length){a.transforms.iteration("\u22c0","=")(k,p,h,o,n,q,4)}else{a.transforms.infix("\u2227",2)(k,p,h,o,n,q,g)}},or:function(k,p,h,o,n,q,g){if(n.length||q.length){a.transforms.iteration("\u22c1","=")(k,p,h,o,n,q,4)}else{a.transforms.infix("\u2228",2)(k,p,h,o,n,q,g)}},xor:function(k,p,h,o,n,q,g){if(n.length||q.length){a.transforms.iteration("xor","=")(k,p,h,o,n,q,4)}else{a.transforms.infix("xor",2)(k,p,h,o,n,q,g)}},card:function(k,q,h,p,o,r,g){var n=a.createElement("mrow");a.appendToken(n,"mo","|");a.applyTransform(n,p[0],0);a.appendToken(n,"mo","|");k.appendChild(n)},mean:function(k,q,h,p,o,r,g){if(p.length===1){var n=a.createElement("mover");a.applyTransform(n,p[0],0);a.appendToken(n,"mo","\u00af");k.appendChild(n)}else{k.appendChild(a.createmfenced(p,"\u27e8","\u27e9"))}},moment:function(u,n,q,y,h,r,g){var p,x;for(var t=0,o=r.length;t<o;t++){if(r[t].nodeName==="degree"){p=r[t]}else{if(r[t].nodeName==="momentabout"){x=r[t]}}}var v=a.createElement("mrow");a.appendToken(v,"mo","\u27e8");var A=a.createElement("mrow");if(y.length>1){A.appendChild(a.createmfenced(y,"(",")"))}else{a.applyTransform(A,y[0],0)}if(p){var z=a.createElement("msup");z.appendChild(A);var k=a.getChildren(p);for(var s=0,o=k.length;s<o;s++){a.applyTransform(z,k[s],0)}v.appendChild(z)}else{v.appendChild(A)}a.appendToken(v,"mo","\u27e9");if(x){var w=a.createElement("msub");w.appendChild(v);var k=a.getChildren(x);for(var s=0,o=k.length;s<o;s++){a.applyTransform(w,k[s],0)}u.appendChild(w)}else{u.appendChild(v)}},variance:function(p,k,n,r,h,o,g){var q=a.createElement("mrow");var s=a.createElement("msup");a.appendToken(s,"mo","\u03c3");a.appendToken(s,"mn","2");q.appendChild(s);a.appendToken(q,"mo","\u2061");q.appendChild(a.createmfenced(r,"(",")"));p.appendChild(q)},grad:function(k,q,h,p,o,r,g){var n=a.createElement("mrow");a.appendToken(n,"mo","\u2207");a.appendToken(n,"mo","\u2061");n.appendChild(a.createmfenced(p,"(",")"));k.appendChild(n)},laplacian:function(p,k,n,r,h,o,g){var q=a.createElement("mrow");var s=a.createElement("msup");a.appendToken(s,"mo","\u2207");a.appendToken(s,"mn","2");q.appendChild(s);a.appendToken(q,"mo","\u2061");q.appendChild(a.createmfenced(r,"(",")"));p.appendChild(q)},curl:function(q,k,o,s,h,p,g){var r=a.createElement("mrow");a.appendToken(r,"mo","\u2207");a.appendToken(r,"mo","\u00d7");var n=s[0].nodeName==="apply";if(n){r.appendChild(a.createmfenced(s,"(",")"))}else{a.applyTransform(r,s[0],g)}q.appendChild(r)},divergence:function(q,k,o,s,h,p,g){var r=a.createElement("mrow");a.appendToken(r,"mo","\u2207");a.appendToken(r,"mo","\u22c5");var n=s[0].nodeName==="apply";if(n){r.appendChild(a.createmfenced(s,"(",")"))}else{a.applyTransform(r,s[0],g)}q.appendChild(r)},not:function(q,k,o,s,h,p,g){var r=a.createElement("mrow");a.appendToken(r,"mo","\u00ac");var n=s[0].nodeName==="apply"||s[0].nodeName==="bind";if(n){a.appendToken(r,"mo","(")}a.applyTransform(r,s[0],g);if(n){a.appendToken(r,"mo",")")}q.appendChild(r)},divide:function(k,p,h,o,n,q,g){var r=a.createElement("mfrac");a.applyTransform(r,o[0],0);a.applyTransform(r,o[1],0);k.appendChild(r)},tendsto:function(q,n,o,r,k,p,g){var s;if(o.nodeName==="tendsto"){s=o.getAttribute("type")}else{s=a.getTextContent(r[0]);r=r.slice(1)}var h=(s==="above")?"\u2198":(s==="below")?"\u2197":"\u2192";a.transforms.binary(h,2)(q,n,o,r,k,p,g)},minus:function(r,n,p,t,h,q,g){var k=t.length===1?5:2;var s=a.createElement("mrow");var o=k<g;if(o){a.appendToken(s,"mo","(")}if(t.length===1){a.appendToken(s,"mo","-");a.applyTransform(s,t[0],k)}else{a.applyTransform(s,t[0],k);a.appendToken(s,"mo","-");var u;if(t[1].nodeName==="apply"){var v=a.getChildren(t[1])[0];u=v.nodeName==="plus"||v.nodeName==="minus"}if(u){a.appendToken(s,"mo","(")}a.applyTransform(s,t[1],k);if(u){a.appendToken(s,"mo",")")}}if(o){a.appendToken(s,"mo",")")}r.appendChild(s)},"complex-cartesian":function(k,q,h,p,o,r,g){var n=a.createElement("mrow");a.applyTransform(n,p[0],0);a.appendToken(n,"mo","+");a.applyTransform(n,p[1],0);a.appendToken(n,"mo","\u2062");a.appendToken(n,"mi","i");k.appendChild(n)},"complex-polar":function(p,k,n,r,h,o,g){var q=a.createElement("mrow");a.applyTransform(q,r[0],0);a.appendToken(q,"mo","\u2062");var t=a.createElement("msup");a.appendToken(t,"mi","e");var s=a.createElement("mrow");a.applyTransform(s,r[1],0);a.appendToken(s,"mo","\u2062");a.appendToken(s,"mi","i");t.appendChild(s);q.appendChild(t);p.appendChild(q)},integer:function(k,p,h,o,n,q,g){a.applyTransform(k,o[0],0)},"based-integer":function(k,p,h,o,n,q,g){var r=a.createElement("msub");a.applyTransform(r,o[1],0);a.applyTransform(r,o[0],0);k.appendChild(r)},rational:function(k,p,h,o,n,q,g){var r=a.createElement("mfrac");a.applyTransform(r,o[0],0);a.applyTransform(r,o[1],0);k.appendChild(r)},times:function(s,k,p,u,h,q,g){var t=a.createElement("mrow");var o=g>3;if(o){a.appendToken(t,"mo","(")}for(var r=0,n=u.length;r<n;r++){if(r>0){a.appendToken(t,"mo",(u[r].nodeName==="cn")?"\u00D7":"\u2062")}a.applyTransform(t,u[r],3)}if(o){a.appendToken(t,"mo",")")}s.appendChild(t)},plus:function(v,p,s,x,h,t,g){var w=a.createElement("mrow");var r=g>2;if(r){a.appendToken(w,"mo","(")}for(var u=0,q=x.length;u<q;u++){var y=x[u];var k=a.getChildren(y);if(u>0){var o;if(a.settings.collapsePlusMinus){if(y.nodeName==="cn"&&!(k.length)&&(o=Number(a.getTextContent(y)))<0){a.appendToken(w,"mo","\u2212");a.appendToken(w,"mn",-o)}else{if(y.nodeName==="apply"&&k.length===2&&k[0].nodeName==="minus"){a.appendToken(w,"mo","\u2212");a.applyTransform(w,k[1],2)}else{if(y.nodeName==="apply"&&k.length>2&&k[0].nodeName==="times"&&k[1].nodeName==="cn"&&(o=Number(a.getTextContent(k[1]))<0)){a.appendToken(w,"mo","\u2212");a.getTextContent(k[1])=-o;a.applyTransform(w,y,2)}else{a.appendToken(w,"mo","+");a.applyTransform(w,y,2)}}}}else{a.appendToken(w,"mo","+");a.applyTransform(w,y,2)}}else{a.applyTransform(w,y,2)}}if(r){a.appendToken(w,"mo",")")}v.appendChild(w)},transpose:function(k,p,h,o,n,r,g){var q=a.createElement("msup");a.applyTransform(q,o[0],g);a.appendToken(q,"mi","T");k.appendChild(q)},power:function(k,p,h,o,n,r,g){var q=a.createElement("msup");a.applyTransform(q,o[0],3);a.applyTransform(q,o[1],g);k.appendChild(q)},selector:function(s,k,o,v,h,q,g){var u=a.createElement("msub");var t=v?v[0]:a.createElement("mrow");a.applyTransform(u,t,0);var p=a.createElement("mrow");for(var r=1,n=v.length;r<n;r++){if(r!=1){a.appendToken(p,"mo",",")}a.applyTransform(p,v[r],0)}u.appendChild(p);s.appendChild(u)},log:function(p,k,n,t,h,o,g){var r=a.createElement("mrow");var q=a.createElement("mi");a.setTextContent(q,"log");if(o.length&&o[0].nodeName==="logbase"){var s=a.createElement("msub");s.appendChild(q);a.applyTransform(s,a.getChildren(o[0])[0],0);r.appendChild(s)}else{r.appendChild(q)}a.applyTransform(r,t[0],7);p.appendChild(r)},"int":function(r,A,D,o,h,v,p){var u=a.createElement("mrow");var z=a.createElement("mo");a.setTextContent(z,"\u222B");var s=a.createElement("msubsup");s.appendChild(z);var n=a.createElement("mrow");for(var C=0,w=v.length;C<w;C++){if(v[C].nodeName==="lowlimit"||v[C].nodeName==="condition"||v[C].nodeName==="domainofapplication"){var q=a.getChildren(v[C]);for(var y=0,B=q.length;y<B;y++){a.applyTransform(n,q[y],0)}}else{var q=a.getChildren(v[C]);if(v[C].nodeName==="interval"&&q.length===2){a.applyTransform(n,q[0],0)}}}s.appendChild(n);var k=a.createElement("mrow");for(var C=0,w=v.length;C<w;C++){if(v[C].nodeName==="uplimit"){var q=a.getChildren(v[C]);for(y=0,B=q.length;y<B;y++){a.applyTransform(k,q[y],0)}break}else{if(v[C].nodeName==="interval"){var q=a.getChildren(v[C]);a.applyTransform(k,q[q.length-1],0);break}}}s.appendChild(k);u.appendChild(s);for(var C=0,x=o.length;C<x;C++){a.applyTransform(u,o[C],0)}for(var C=0,x=h.length;C<x;C++){var t=h[C];var q=a.getChildren(t);if(q.length){var g=a.createElement("mrow");a.appendToken(g,"mi","d");a.applyTransform(g,q[0],0);u.appendChild(g)}}r.appendChild(u)},inverse:function(p,k,n,q,h,o,g){var t=a.createElement("msup");var r=(q.length)?q[0]:a.createElement("mrow");a.applyTransform(t,r,g);var s=a.createElement("mfenced");a.appendToken(s,"mn","-1");t.appendChild(s);p.appendChild(t)},quotient:function(k,q,h,p,o,r,g){var n=a.createElement("mrow");a.appendToken(n,"mo","\u230A");if(p.length){a.applyTransform(n,p[0],0);a.appendToken(n,"mo","/");if(p.length>1){a.applyTransform(n,p[1],0)}}a.appendToken(n,"mo","\u230B");k.appendChild(n)},factorial:function(k,q,h,p,o,r,g){var n=a.createElement("mrow");a.applyTransform(n,p[0],4);a.appendToken(n,"mo","!");k.appendChild(n)},root:function(s,n,p,t,k,q,g){var h;if(p.nodeName==="root"&&(q.length===0||(q[0].nodeName==="degree"&&a.getTextContent(q[0])==="2"))){h=a.createElement("msqrt");for(var r=0,o=t.length;r<o;r++){a.applyTransform(h,t[r],0)}}else{h=a.createElement("mroot");a.applyTransform(h,t[0],0);var u=(p.nodeName==="root")?q[0].childNodes[0]:t[1];a.applyTransform(h,u,0)}s.appendChild(h)},diff:function(s,B,E,h,g,w,p){if(g.length){var x;var t=a.createElement("mfrac");var z=a.createElement("mrow");var C=a.createElement("mrow");t.appendChild(z);t.appendChild(C);var u;var o;var D=a.createElement("mi");a.setTextContent(D,"d");var q=a.getChildren(g[0]);for(var A=0,y=q.length;A<y;A++){if(q[A].nodeName==="degree"){var k=a.getChildren(q[A])[0];if(a.getTextContent(k)!="1"){o=k;var r=a.createElement("msup");r.appendChild(D);D=r;a.applyTransform(D,o,0)}}else{u=q[A]}}z.appendChild(D);if(h.length){switch(h[0].nodeName){case"apply":case"bind":case"reln":var v=a.createElement("mrow");v.appendChild(t);a.applyTransform(v,h[0],3);x=v;break;default:a.applyTransform(z,h[0],0);x=t}}a.appendToken(C,"mi","d");if(o){var n=a.createElement("msup");a.applyTransform(n,u,0);a.applyTransform(n,o,0);C.appendChild(n)}else{a.applyTransform(C,u,0)}s.appendChild(x)}else{var r=a.createElement("msup");var v=a.createElement("mrow");r.appendChild(v);a.applyTransform(v,h[0],0);a.appendToken(m,"mo","\u2032");s.appendChild(r)}},partialdiff:function(w,O,U,k,g,I,r){var J,T,t,F,N,x;var A=a.createElement("mfrac");var M=a.createElement("mrow");var S=a.createElement("mrow");A.appendChild(M);A.appendChild(S);var q,R;if(g.length===0&&k.length===2&&k[0].nodeName==="list"){if(k[1].nodeName==="lambda"){var p=a.getChildren(k[0]).length;if(p!=1){t=a.createElement("msup");a.appendToken(t,"mo","\u2202");a.appendToken(t,"mn",p);M.appendChild(t)}else{a.appendToken(M,"mo","\u2202")}var s=a.getChildren(k[1]);R=s[s.length-1];var h=[];var u=a.getChildren(k[1]);var E=a.getChildren(k[0]);for(var Q=0,L=u.length;Q<L;Q++){if(u[Q].nodeName==="bvar"){h.push(a.getChildren(u[Q])[0])}}var D=null,p=0;function y(X,W){a.appendToken(S,"mo","\u2202");var V=h[X];if(W>1){var z=a.createElement("msup");a.applyTransform(z,V,0);a.appendToken(z,"mn",W);S.appendChild(z)}else{a.applyTransform(S,V,0)}}for(var Q=0,L=E.length;Q<L;Q++){var H=Number(a.getTextContent(E[Q]))-1;if(D!==null&&H!=D){y(D,p);p=0}D=H;p+=1}if(D){y(D,p)}}else{var F=a.createElement("mrow");var G=a.createElement("msub");a.appendToken(G,"mi","D");var B=a.getChildren(k[0]);G.appendChild(a.createmfenced(B,"",""));F.appendChild(G);a.applyTransform(F,k[1],0);w.appendChild(F);return}}else{var t=a.createElement("msup");M.appendChild(t);a.appendToken(t,"mo","\u2202");var v=a.createElement("mrow");t.appendChild(v);var P;if(I.length&&I[0].nodeName==="degree"&&a.getChildren(I[0]).length){P=a.getChildren(I[0])[0];a.applyTransform(v,P,0)}else{var p=0;var C=false;for(var Q=0,L=g.length;Q<L;Q++){var s=a.getChildren(g[Q]);if(s.length===2){for(j=0;j<2;j++){if(s[j].nodeName==="degree"){if(/^\s*\d+\s*$/.test(a.getTextContent(s[j]))){p+=Number(a.getTextContent(s[j]))}else{if(C){a.appendToken(v,"mo","+")}C=true;a.applyTransform(v,a.getChildren(s[j])[0],0)}}}}else{p++}}if(p>0){if(C){a.appendToken(v,"mo","+")}a.appendToken(v,"mn",p)}}if(k.length){R=k[0]}for(var Q=0,L=g.length;Q<L;Q++){a.appendToken(S,"mo","\u2202");var s=a.getChildren(g[Q]);if(s.length===2){for(j=0;j<2;j++){if(s[j].nodeName==="degree"){var o=a.createElement("msup");a.applyTransform(o,s[1-j],0);var K=a.getChildren(s[j])[0];a.applyTransform(o,K,0);S.appendChild(o)}}}else{if(s.length===1){a.applyTransform(S,s[0],0)}}}}if(R){switch(R.nodeName){case"apply":case"bind":case"reln":var F=a.createElement("mrow");F.appendChild(A);a.applyTransform(F,R,3);outNode=F;break;default:a.applyTransform(M,R,0);outNode=A}}else{outNode=A}w.appendChild(outNode)}};a.applyTokens.size=a.applyTokens.card;return a})(MathJax.Hub);MathJax.Hub.Register.StartupHook("MathML Jax Ready",function(){var c=MathJax.InputJax.MathML;var a=MathJax.Extension["MathML/content-mathml"];c.DOMfilterHooks.Add(function(d){d.math=a.transformElement(d.math)});MathJax.Hub.Startup.signal.Post("MathML/content-mathml Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/MathML/content-mathml.js");
