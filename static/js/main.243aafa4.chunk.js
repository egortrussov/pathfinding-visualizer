(this.webpackJsonpvisualizer=this.webpackJsonpvisualizer||[]).push([[0],[,,,,,,,,,function(e,t,n){e.exports=n(18)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(8),i=n.n(o),s=(n(14),n(6)),l=n(1),c=n(2),u=n(4),d=n(3),f=n(5),v=(n(15),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={},n}return Object(f.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=e.col,n=e.isFinish,r=e.isStart,o=e.isWall,i=e.onMouseDown,s=e.onMouseEnter,l=e.onMouseUp,c=e.isVisited,u=e.row,d=n?"node-finish":r?"node-start":o?"node-wall":c?"node-visited":"";return a.a.createElement("div",{id:"node-".concat(u,"-").concat(t),className:"node ".concat(d),onMouseDown:function(){return i(u,t)},onMouseEnter:function(){return s(u,t)},onMouseUp:function(){return l()}})}}]),t}(r.Component));function m(e){e.sort((function(e,t){return e.distance-t.distance}))}function h(e){e.sort((function(e,t){return e.distance==t.distance&&e.distance!==1/0?e.hN-t.hN:e.distance-t.distance}))}function g(e,t){return console.log(t,e),Math.abs(t.col-e.col)+Math.abs(t.row-e.row)}function p(e,t,n){var r=y(e,t),a=!0,o=!1,i=void 0;try{for(var s,l=r[Symbol.iterator]();!(a=(s=l.next()).done);a=!0){var c=s.value;c.gN=e.gN+1,c.hN=g(c,n),c.distance=c.gN+c.hN,c.previousNode=e}}catch(u){o=!0,i=u}finally{try{a||null==l.return||l.return()}finally{if(o)throw i}}}function b(e,t,n){var r=y(e,t),a=!0,o=!1,i=void 0;try{for(var s,l=r[Symbol.iterator]();!(a=(s=l.next()).done);a=!0){var c=s.value;c.distance=e.distance+1,c.previousNode=e,t[c.row][c.col]=c}}catch(u){o=!0,i=u}finally{try{a||null==l.return||l.return()}finally{if(o)throw i}}}function y(e,t){var n=[],r=e.col,a=e.row;return a>0&&n.push(t[a-1][r]),a<t.length-1&&n.push(t[a+1][r]),r>0&&n.push(t[a][r-1]),r<t[0].length-1&&n.push(t[a][r+1]),n.filter((function(e){return!e.isVisited&&!e.isWall}))}function E(e){var t=[],n=!0,r=!1,a=void 0;try{for(var o,i=e[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var s=o.value,l=!0,c=!1,u=void 0;try{for(var d,f=s[Symbol.iterator]();!(l=(d=f.next()).done);l=!0){var v=d.value;t.push(v)}}catch(m){c=!0,u=m}finally{try{l||null==f.return||f.return()}finally{if(c)throw u}}}}catch(m){r=!0,a=m}finally{try{n||null==i.return||i.return()}finally{if(r)throw a}}return t}function w(e,t,n){for(var r=[],a=0;a<=n;a++){var o=e[a][0],i=e[a][t];o.isWall=!0,i.isWall=!0,e[a][0]=o,e[a][t]=i,r.push(e[a][0]),r.push(e[a][t])}for(var s=0;s<=t;s++){var l=e[0][s],c=e[n][s];l.isWall=!0,c.isWall=!0,e[0][s]=l,e[n][s]=c,r.push(e[0][s]),r.push(e[n][s])}for(var u=2;u<=n;u+=2)for(var d=1;d<=t;d++){var f=e[u][d];f.isWall=!0,e[u][d]=f}for(var v=2;v<=t;v+=2)for(var m=1;m<=n;m++){var h=e[m][v];h.isWall=!0,e[m][v]=h}return{newGrid:e,walls:r}}n(16),n(17);function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var S=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={selectedAlgorithm:"",btnErrorMessage:"",selectedSpeed:"fast"},n}return Object(f.a)(t,e),Object(c.a)(t,[{key:"handlePopout",value:function(e){switch(document.getElementById("".concat(e,"-popout")).classList.toggle("active"),document.getElementById("".concat(e,"-btn")).classList.toggle("active"),e){case"algo":document.getElementById("grid-popout").classList.remove("active"),document.getElementById("grid-btn").classList.remove("active"),document.getElementById("speed-btn").classList.remove("active"),document.getElementById("speed-popout").classList.remove("active");break;case"grid":document.getElementById("algo-popout").classList.remove("active"),document.getElementById("algo-btn").classList.remove("active"),document.getElementById("speed-btn").classList.remove("active"),document.getElementById("speed-popout").classList.remove("active");break;case"speed":document.getElementById("algo-popout").classList.remove("active"),document.getElementById("algo-btn").classList.remove("active"),document.getElementById("grid-popout").classList.remove("active"),document.getElementById("grid-btn").classList.remove("active")}}},{key:"setSpeed",value:function(e){this.setState(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(n,!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},this.state,{selectedSpeed:e})),this.props.setAlgoSpeed(e)}},{key:"runVisualizer",value:function(){this.state.selectedAlgorithm?this.props.visualizeAlgorithm(this.state.selectedAlgorithm):this.setState({btnErrorMessage:"Pick an algorithm!"})}},{key:"render",value:function(){var e=this,t=this.props,n=t.generateGrid,r=t.generateSidewinderGrid,o=t.clearGrid,i=t.clearPath;return a.a.createElement("nav",null,a.a.createElement("div",{className:"wrapper"},a.a.createElement("div",{className:"nav-logo"},"Pathfinding visualizer"),a.a.createElement("div",{className:"nav-btns"},a.a.createElement("div",{className:"btns-left"},a.a.createElement("button",{onClick:function(){return e.handlePopout("algo")},id:"algo-btn"},"Pick an algorithm",a.a.createElement("div",{className:"popout algo-popout",id:"algo-popout"},a.a.createElement("button",{onClick:function(){return e.setState({selectedAlgorithm:"dijkstra",btnErrorMessage:""})}},"Dijkstra"),a.a.createElement("button",{onClick:function(){return e.setState({selectedAlgorithm:"astar",btnErrorMessage:""})}},"A*"),a.a.createElement("button",{onClick:function(){return e.setState({selectedAlgorithm:"dfs",btnErrorMessage:""})}},"DFS"),a.a.createElement("button",{onClick:function(){return e.setState({selectedAlgorithm:"bfs",btnErrorMessage:""})}},"BFS"),a.a.createElement("button",null,"Dijkstra"),a.a.createElement("button",null,"Dijkstra"))),a.a.createElement("button",{onClick:function(){return e.handlePopout("grid")},id:"grid-btn"},"Mazes & Patterns",a.a.createElement("div",{className:"popout grid-popout",id:"grid-popout"},a.a.createElement("button",{onClick:function(){return n()}},"Simple grid"),a.a.createElement("a",{onClick:function(){return r()}},"Sidewinder Grid"))),a.a.createElement("button",null,"Add bomb")),a.a.createElement("div",{className:"btns-middle"},a.a.createElement("button",{onClick:function(){return e.runVisualizer()},className:"cta"},this.state.btnErrorMessage?this.state.btnErrorMessage:"Visualize".concat(this.state.selectedAlgorithm?" ":"").concat(this.state.selectedAlgorithm,"!"))),a.a.createElement("div",{className:"btns-right"},a.a.createElement("button",{onClick:function(){return o()}},"Clear grid"),a.a.createElement("button",{onClick:function(){return i()}},"Clear path"),a.a.createElement("button",{onClick:function(){return e.handlePopout("speed")},id:"speed-btn"},"Speed: ",this.state.selectedSpeed,a.a.createElement("div",{className:"popout speed-popout",id:"speed-popout"},a.a.createElement("button",{onClick:function(){return e.setSpeed("fast")}},"Fast"),a.a.createElement("button",{onClick:function(){return e.setSpeed("medium")}},"Medium"),a.a.createElement("button",{onClick:function(){return e.setSpeed("slow")}},"Slow")))))),a.a.createElement("div",{className:"nav-right"},"Check me on github!"))}}]),t}(r.Component);var j,O=[],N=!1;function P(e,t,n){return j=e,N=!1,O=[],function e(t,n,r){if(!N&&!r.isWall)if(r!==n){r!==t&&O.push(r);var a=y(r,j),o=!0,i=!1,s=void 0;try{for(var l,c=a[Symbol.iterator]();!(o=(l=c.next()).done);o=!0){var u=l.value;u.isWall&&console.log("HHHHHHHHHHHHHHHHHHHHHH"),u.isWall||u.isVisited||(u.isVisited=!0,u.previousNode=r,j[u.row][u.col].isVisited=!0,j[u.row][u.col].previousNode=r,e(t,n,u))}}catch(d){i=!0,s=d}finally{try{o||null==c.return||c.return()}finally{if(i)throw s}}}else N=!0}(t,n,t),O}function M(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function W(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?M(n,!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):M(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var I=[],B=!1,A=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={grid:[],mouseIsPressed:!1,walls:[],visitedNodes:[],speed:10},n}return Object(f.a)(t,e),Object(c.a)(t,[{key:"animateAlgorithm",value:function(e,t){var n=this,r=this.state.speed;console.log(r);for(var a=function(a){if(a===e.length)return setTimeout((function(){n.animateShortestPath(t)}),r*a),{v:void 0};setTimeout((function(){var t=e[a];9===t.col&&15===t.row||29===t.col&&15===t.row||(document.getElementById("node-".concat(t.row,"-").concat(t.col)).className="node node-visited is-animated"),setTimeout((function(){document.getElementById("node-".concat(t.row,"-").concat(t.col)).classList.remove("is-animated")}),1500)}),r*a)},o=0;o<=e.length;o++){var i=a(o);if("object"===typeof i)return i.v}}},{key:"animateShortestPath",value:function(e){for(var t=this,n=function(n){setTimeout((function(){var t=e[n];9===t.col&&15===t.row||29===t.col&&15===t.row||(document.getElementById("node-".concat(t.row,"-").concat(t.col)).className="node node-is-path")}),n*t.state.speed)},r=0;r<e.length;r++)n(r)}},{key:"visualizeAlgorithm",value:function(e){D(),this.clearPath();var t=L();console.log(t===L(),"4454545");var n,r=t[15][9],a=t[15][29];switch(e){case"dijkstra":n=function(e,t,n){if(!t||!n||t===n)return!1;var r=[];t.distance=0;for(var a=E(e);a.length;){m(a);var o=a.shift();if(!o.isWall){if(o.distance===1/0)return r;if(o.isVisited=!0,r.push(o),o===n)return r;b(o,e)}}}(t,r,a);break;case"astar":n=function(e,t,n){if(!t||!n||t===n)return!1;console.log("ASTAR!");var r=[];t.distance=0,t.gN=0;for(var a=E(e);a.length;){h(a);var o=a.shift();if(!o.isWall){if(o.distance===1/0)return r;if(o.isVisited=!0,r.push(o),o===n)return r;p(o,e,n)}}}(t,r,a);break;case"dfs":n=P(L(),r,a);break;case"bfs":n=function(e,t,n){if(!t||!n||t===n)return!1;var r=[];t.distance=0;for(var a=[t],o=0;a.length&&o<=1500;){o++;var i=a.shift();if(!i.isWall){if(i.distance===1/0)return r;var s=y(i,e),l=!0,c=!1,u=void 0;try{for(var d,f=s[Symbol.iterator]();!(l=(d=f.next()).done);l=!0){var v=d.value;a.push(v)}}catch(m){c=!0,u=m}finally{try{l||null==f.return||f.return()}finally{if(c)throw u}}if(a=a.filter((function(e){return!e.isVisited})),i.isStart||(i.isVisited=!0),r.push(i),i===n)return r;b(i,e)}}return r}(L(),r,a)}var o=function(e){for(var t=[],n=e,r=0;null!==n&&r<=2e3&&!n.isStart;)t.unshift(n),n=n.previousNode,r++;return t}(a);console.log(o),this.animateAlgorithm(n,o)}},{key:"componentWillMount",value:function(){var e=H();this.setState({grid:e})}},{key:"handleMouseDown",value:function(e,t){T(!0);C(this.state.grid,e,t);this.setState({mouseIsPressed:!0})}},{key:"handleMouseEnter",value:function(e,t){if(!this.state.mouseIsPressed)return!1;if(15===e&&9===t||15===e&&29===t)return!1;C(this.state.grid,e,t)}},{key:"clearGrid",value:function(){var e=H();this.setState({grid:e});for(var t=0;t<31;t++)for(var n=0;n<41;n++)15===t&&9===n||15===t&&29===n||(document.getElementById("node-".concat(t,"-").concat(n)).className="node");V()}},{key:"animateWalls",value:function(e){for(var t=function(t){var n=e[t];setTimeout((function(){document.getElementById("node-".concat(n.row,"-").concat(n.col)).className="node node-wall is-animated",setTimeout((function(){document.getElementById("node-".concat(n.row,"-").concat(n.col)).className="node node-wall"}),1500)}),15*t)},n=0;n<e.length;n++)t(n)}},{key:"clearPath",value:function(){D();for(var e=0;e<31;e++)for(var t=0;t<41;t++)document.getElementById("node-".concat(e,"-").concat(t)).classList.remove("node-visited"),document.getElementById("node-".concat(e,"-").concat(t)).classList.remove("node-is-path")}},{key:"generateGrid",value:function(e){var t=this;D(),this.clearGrid(),this.clearPath();var n=function(e,t,n){var r=w(e,t,n),a=r.newGrid,o=r.walls;e=a;for(var i=1;i<n;i+=2)for(var s=1;s<t;s+=2){var l=Math.ceil(10*Math.random())%2;if(1!==i||s!==t-1)if(1===i||l&&s!==t-1){var c=e[i][s+1];c.isWall=!1,e[i][s+1]=c}else{var u=e[i-1][s];u.isWall=!1,e[i-1][s]=u}}for(var d=1;d<n;d++)for(var f=1;f<t;f++)e[d][f].isWall&&o.push(e[d][f]);return{newGrid:e,walls:o}}(H(),40,30),r=n.newGrid,a=n.walls;this.animateWalls(a),z(r),setTimeout((function(){t.setState({grid:r})}),15*a.length)}},{key:"generateSidewinderGrid",value:function(){var e=this;this.clearGrid(),this.clearPath();var t=function(e,t,n){var r=w(e,t,n),a=r.newGrid,o=r.walls;e=a;for(var i=1,s=1;s<n;s+=2)for(var l=1;l<t;l+=2){if(1!==s)if(Math.ceil(10*Math.random())%2||l===t-1){var c=Math.ceil(Math.random()*(l-i+1))+i-1;c+=c%2===0,console.log(c),e[s-1][c].isWall=!1,i=l!==t-1?l+1:1}else e[s][l+1].isWall=!1;else l!==t-1&&(e[s][l+1].isWall=!1)}for(var u=1;u<n;u++)for(var d=1;d<t;d++)e[u][d].isWall&&o.push(e[u][d]);return{newGrid:e,walls:o}}(H(),40,30),n=t.newGrid,r=t.walls;this.animateWalls(r),z(n),setTimeout((function(){e.setState({grid:n})}),15*r.length)}},{key:"handleMouseUp",value:function(){var e=this;T(!1),console.log("The mouse is up!"),this.setState({mouseIsPressed:!1});var t=L();console.log(t[0][0],"jjjjjjjjjjjj"),this.setState({grid:t},(function(){console.log("UPDATED!!!"),console.log(e.state.grid[0][0].isWall,L()[0][0].isWall,t[0][0].isWall)}))}},{key:"setAlgoSpeed",value:function(e){var t;t="fast"===e?10:"medium"===e?15:20,console.log(t),this.setState(W({},this.state,{speed:t}))}},{key:"render",value:function(){var e=this,t=this.state,n=t.grid,r=t.mouseIsPressed;return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{onMouseOver:function(){console.log("Hello!"),r&&e.handleMouseUp()},className:"background"}),a.a.createElement(S,{visualizeAlgorithm:function(t){return e.visualizeAlgorithm(t)},generateGrid:function(){return e.generateGrid()},generateSidewinderGrid:function(){return e.generateSidewinderGrid()},clearGrid:function(){return e.clearGrid()},clearPath:function(){return e.clearPath()},setAlgoSpeed:function(t){return e.setAlgoSpeed(t)}}),a.a.createElement("div",{className:"grid"},n.map((function(t,n){return a.a.createElement("div",{key:Math.random(),className:"row"},t.map((function(t,n){var o=t.isStart,i=t.isFinish,s=t.row,l=t.col,c=t.isWall,u=t.isVisited;return a.a.createElement(v,{key:Math.random(),isStart:o,isWall:c,isFinish:i,isVisited:u,mouseIsPressed:r,onMouseDown:function(t,n){return e.handleMouseDown(t,n)},onMouseEnter:function(t,n){return e.handleMouseEnter(t,n)},onMouseUp:function(){return e.handleMouseUp()},row:s,col:l})})))}))))}}]),t}(r.Component),H=function(){for(var e=[],t=0;t<31;t++){for(var n=[],r=0;r<41;r++)n.push(G(r,t));e.push(n)}return I=e,console.log(I),e},G=function(e,t){return{col:e,row:t,isStart:15===t&&9===e,isFinish:15===t&&29===e,distance:1/0,isWeighted:!1,isVisited:!1,isWall:!1,previousNode:null,gN:1/0,hN:0}},C=function(e,t,n){var r=(I=e.slice())[t][n];if(B){r.isWall?document.getElementById("node-".concat(t,"-").concat(n)).className="node":document.getElementById("node-".concat(t,"-").concat(n)).className="node node-wall";var a=W({},r,{isWall:!r.isWall});return I[t][n]=a,I}},D=function(){for(var e=0;e<31;e++)for(var t=0;t<41;t++)I[e][t]=W({},I[e][t],{isStart:15===e&&9===t,isFinish:15===e&&29===t,distance:1/0,isWeighted:!1,isVisited:!1,previousNode:null,gN:1/0,hN:0})},L=function(){return I},V=function(){I=H()},z=function(e){I=e},T=function(e){B=e};var F=function(){return a.a.createElement("div",{className:"App"},a.a.createElement(A,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[9,1,2]]]);
//# sourceMappingURL=main.243aafa4.chunk.js.map