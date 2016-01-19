!function(e){function t(i){if(n[i])return n[i].exports;var s=n[i]={exports:{},id:i,loaded:!1};return e[i].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function i(){l.doneLoading()?(c.hideMenu(c.menus.loading),l.howls.DayAndNight.play(),c.showMenu(c.menus.main),c.game.startMenuLoop()):l.numLoadErrors>=1?(console.log("Error loading audio"),c.hideMenu(c.menus.loading),c.showMenu(c.menus.main),c.game.startMenuLoop(),c.showMenu(c.menus.audioerror)):setTimeout(i,0)}function s(){var e=document.querySelector(".js-app-space"),t=document.querySelector(".js-app-container"),n=document.querySelector(".js-app-canvas"),i=document.querySelector(".js-message"),s=o.maxChildSize(c.canvasAspectWidth,c.canvasAspectHeight,e.offsetWidth,e.offsetHeight-i.offsetHeight),a=e.offsetWidth-s.width,r=e.offsetHeight-s.height-i.offsetHeight,h=Math.floor(a/2),d=Math.ceil(a/2),u=Math.floor(r/2),m=Math.ceil(r/2);t.style.width=s.width+"px",t.style.height=s.height+i.offsetHeight+"px",t.style["margin-left"]=h+"px",t.style["margin-right"]=d+"px",t.style["margin-top"]=u+"px",t.style["margin-bottom"]=m+"px",n.style.width=s.width+"px",n.style.height=s.height+"px",n.width=s.width,n.height=s.height,c.game.vw=c.game.c.width/100,c.game.laneWidth=c.game.c.width/c.game.numLanes,c.game.laneWidthvw=c.game.laneWidth/c.game.vw,i.style.width=n.style.width,i.style["margin-top"]=n.style.height}console.log("main.js");var o=n(2),a=n(8),r=n(5),h=n(3),d=n(6),u=new a,c=new r,m=new h,l=new d,p=document.querySelector(".js-app-canvas"),y=p.getContext("2d");u.startListen(document),c.keyboard=u,m.keyboard=u,c.game=m,c.game.messageHolder=document.querySelector(".js-message"),c.game.canvasAspectWidth=c.canvasAspectWidth,c.game.canvasAspectHeight=c.canvasAspectHeight,c.game.c=p,c.game.ctx=y,c.game.vw=c.game.c.width/100,c.game.dieCallback=function(){c.showMenu(c.menus.end)},c.game.pauseCallback=function(){c.showMenu(c.menus.pause)},c.game.resumeCallback=function(){c.hideMenu(c.menus.pause)},c.game.restartCallback=function(){c.hideMenu(c.menus.end)},c.getMenuHooks(["loading","audioerror","main","htp","about","options","pause","end"]),l.add({name:"DayAndNight",paths:["audio/DayAndNight.ogg","audio/DayAndNight.opus","audio/DayAndNight.aac"],category:"music",onend:function(){this.howls.ATheme.play()}.bind(l)}),l.add({name:"ATheme",paths:["audio/10112013.ogg","audio/10112013.opus","audio/10112013.aac"],category:"music",onend:function(){this.howls.DayAndNight.play()}.bind(l)}),l.setupDone=!0,c.showMenu(c.menus.loading),i(),document.querySelector(".js-close-audioerror").addEventListener("click",function(){c.hideMenu(c.menus.audioerror)}),document.querySelector(".js-start").addEventListener("click",function(){c.hideMenu(c.menus.main),c.startGame()}),document.querySelector(".js-how-to-play").addEventListener("click",function(){c.showMenu(c.menus.htp)}),document.querySelector(".js-htp-close").addEventListener("click",function(){c.hideMenu(c.menus.htp)}),document.querySelector(".js-about").addEventListener("click",function(){c.showMenu(c.menus.about)}),document.querySelector(".js-about-close").addEventListener("click",function(){c.hideMenu(c.menus.about)}),Array.prototype.forEach.call(document.querySelectorAll(".js-options"),function(e){e.addEventListener("click",function(){c.showMenu(c.menus.options)})}),document.querySelector(".js-resume").addEventListener("click",function(){c.game.resume()}),document.querySelector(".js-pause-main").addEventListener("click",function(){c.game.unbindPauseControls(),c.game.endGameCleanUp(),c.hideMenu(c.menus.pause),c.showMenu(c.menus.main),c.game.startMenuLoop()}),document.querySelector(".js-end-again").addEventListener("click",function(){c.game.unbindEndControls(),c.hideMenu(c.menus.end),c.startGame()}),document.querySelector(".js-end-main").addEventListener("click",function(){c.game.unbindEndControls(),c.hideMenu(c.menus.end),c.showMenu(c.menus.main),c.game.startMenuLoop()}),document.querySelector(".js-langs").addEventListener("change",function(){var e=this.options[this.selectedIndex].value;c.game.lang=e}),document.querySelector(".js-close-options").addEventListener("click",function(){c.hideMenu(c.menus.options)});var g=document.querySelector(".js-volume");g.addEventListener("change",function(){Howler.volume(this.value)}),Howler.volume(.3),g.value=.3,document.querySelector(".js-no-wrap-on-repeat").addEventListener("change",function(){(this.checked===!0||this.checked===!1)&&(c.game.noWrapOnRepeat=this.checked)}),document.querySelector(".js-score-font").addEventListener("change",function(){c.game.messageHolder.style["font-family"]=this.value+", monospace"}),c.fontSize=24,c.padding=4,Array.prototype.forEach.call(document.querySelectorAll(".js-score-size"),function(e){e.addEventListener("change",function(){var e=document.querySelector(".js-score-font-size"),t=document.querySelector(".js-score-padding"),n=parseFloat(e.value),i=parseFloat(t.value);isNaN(n)||isNaN(i)||0>n||0>i?(e.value=c.fontSize,t.value=c.padding):(c.fontSize=n,c.padding=i,c.game.messageHolder.style.padding=c.padding+"px 0 "+c.padding+"px 0",c.game.messageHolder.style["font-size"]=c.fontSize+"px",c.game.messageHolder.style.height=c.fontSize+2*c.padding+"px",s())})}),window.addEventListener("resize",s),s()},function(e,t,n){"use strict";function i(e,t,n,i){this.r=e,this.g=t,this.b=n,this.a=i}var s=n(2);i.random=function(e){var t,n=s.randomInt(0,255),o=s.randomInt(0,255),a=s.randomInt(0,255);return t="number"==typeof e?e:1,new i(n,o,a,t)},i.prototype.toString=function(e){return e?"rgb("+this.r+", "+this.g+", "+this.b+")":"rgba("+this.r+", "+this.g+", "+this.b+", "+this.a+")"},i.prototype.inverse=function(e){return e?new i(255-this.r,255-this.g,255-this.b,1-this.a):new i(255-this.r,255-this.g,255-this.b,this.a)},i.prototype.clamp=function(){var e=this.clone();return["r","g","b"].forEach(function(t){e[t]=Math.max(Math.min(e[t],255),0)}),this.a=Math.max(Math.min(this.a,1),0),e},i.prototype.operate=function(e,t){var n=this.clone();return["r","g","b"].forEach(function(t){n[t]=e(n[t])}),t&&(n.a=e(n.a)),n},i.prototype.clone=function(){return new i(this.r,this.g,this.b,this.a)},e.exports=i},function(e,t){"use strict";var n={};n.randomInt=function(e,t){return Math.floor(Math.random()*(t-e+1)+e)},n.randomInInterval=function(e,t){return Math.random()*(t-e)+e},n.maxChildSize=function(e,t,n,i){if(0>e||0>t||0===e&&0===t)return{width:0,height:0};if(0===e)return{width:0,height:i};if(0===t)return{width:n,height:0};if(0>=n||0>=i)return{width:0,height:0};var s,o,a=e/t,r=n/i;if(a===r)s=n,o=i;else if(r>a){var h=Math.floor(i/t);s=h*e,o=h*t}else if(a>r){var h=Math.floor(n/e);s=h*e,o=h*t}return{width:s,height:o}},e.exports=n},function(e,t,n){"use strict";function i(){this.numLanes=17,this.lanes=[],this.newTime=0,this.oldTime=0,this.gameTime=0,this.gameLooping=!1,this.paused=!1,this.menuLooping=!1,this.keyboard=void 0,this.lang="en",this.noWrapOnRepeat=!0,this.score=0,this.highScore=0,this.messageInterval=5e3,this.messageTime=0,this.enemyMinRadius=.2,this.enemyMaxRadius=.45,this.enemyMinSpeed=.015,this.enemyInitialMaxSpeed=.02,this.enemyMaxSpeed=this.enemyInitialMaxSpeed,this.enemyTopSpeed=.06,this.newEnemyInitialInterval=400,this.newEnemyInterval=this.newEnemyInitialInterval,this.newEnemyMinInterval=90,this.newEnemyTime=0,this.menuEnemyInterval=300,this.menuEnemyTime=0,this.enemies=[],this.canvasAspectWidth=void 0,this.canvasAspectHeight=void 0,this.c=void 0,this.ctx=void 0,this.vw=void 0,this.laneWidth=void 0,this.laneWidthvw=void 0,this.messageHolder=void 0}var s=n(2),o=n(9),a=n(1),r=n(4),h=n(10),d=n(7);i.prototype.maxHeight=function(){return this.c.height/this.vw},i.prototype.updateScoreMessage=function(){this.messageHolder.innerHTML=writtenNumber(this.score,{lang:this.lang})},i.prototype.updateScore=function(){Array.prototype.forEach.call(document.querySelectorAll(".js-score"),function(e){e.innerHTML=this.score}.bind(this))},i.prototype.updateHighScore=function(){Array.prototype.forEach.call(document.querySelectorAll(".js-high-score"),function(e){e.innerHTML=this.highScore}.bind(this))},i.prototype.newHighScore=function(e){return e>this.highScore?(this.highScore=e,!0):!1},i.prototype.pause=function(){this.gameLooping=!1,this.unbindGameControls(),this.bindPauseControls(),this.updateScore(),this.pauseCallback()},i.prototype.resume=function(){this.unbindPauseControls(),this.gameLooping=!0,this.bindGameControls(),this.resumeCallback(),this.oldTime=(new Date).getTime(),this.gameLoopBound()},i.prototype.keydownHandler=function(e){var t=this.keyboard.getKey(e),n=0;if("A"===t||"ArrowLeft"===t?n=-1:"D"===t||"ArrowRight"===t?n=1:("W"===t||"ArrowUp"===t||"Escape"===t)&&this.pause(),0!==n){var i=this.player.targetLane+n;i>=0&&i<=this.lanes.length-1?this.lanes[i].open&&(this.player.targetLane=i,this.player.updateTargetPos(this.laneWidthvw)):i===this.lanes.length&&(!this.noWrapOnRepeat||this.noWrapOnRepeat&&!e.repeat)&&(this.player.targetLane=i,this.player.updateTargetPos(this.laneWidthvw))}},i.prototype.bindGameControls=function(){this.keydownHandlerBound=this.keydownHandler.bind(this),document.addEventListener("keydown",this.keydownHandlerBound)},i.prototype.unbindGameControls=function(){document.removeEventListener("keydown",this.keydownHandlerBound)},i.prototype.pauseKeydownHandler=function(e){var t=this.keyboard.getKey(e);("W"===t||"ArrowUp"===t||"Escape"===t)&&this.resume()},i.prototype.bindPauseControls=function(){this.pauseKeydownHandlerBound=this.pauseKeydownHandler.bind(this),document.addEventListener("keydown",this.pauseKeydownHandlerBound)},i.prototype.unbindPauseControls=function(){document.removeEventListener("keydown",this.pauseKeydownHandlerBound)},i.prototype.endKeydownHandler=function(e){var t=this.keyboard.getKey(e);("D"===t||"ArrowRight"===t)&&(this.restartCallback(),this.unbindEndControls(),this.start())},i.prototype.bindEndControls=function(){this.endKeydownHandlerBound=this.endKeydownHandler.bind(this),document.addEventListener("keydown",this.endKeydownHandlerBound)},i.prototype.unbindEndControls=function(){document.removeEventListener("keydown",this.endKeydownHandlerBound)},i.prototype.addRandomEnemy=function(){var e=s.randomInt(1,this.lanes.length-2),t=s.randomInInterval(this.enemyMinRadius,this.enemyMaxRadius)*this.laneWidthvw,n=s.randomInInterval(this.enemyMinSpeed,this.enemyMaxSpeed),i=this.laneWidthvw/2+e*this.laneWidthvw,o=0-t,a=new d({x:i,y:o},t,n,e);this.enemies.push(a)},i.prototype.randomLaneColor=function(){var e=s.randomInt(30,255),t=s.randomInt(30,255),n=s.randomInt(30,255);return new a(e,t,n,1)},i.prototype.renderLanes=function(e,t){var n=e.width/this.lanes.length,i=e.height;t.save();for(var s=0;s<this.lanes.length;s++)this.lanes[s].render(t,n,i),t.translate(n,0);t.restore()},i.prototype.endGameCleanUp=function(){this.unbindGameControls()},i.prototype.dieCallback=function(){console.log("dieCallback")},i.prototype.pauseCallback=function(){console.log("pauseCallback")},i.prototype.resumeCallback=function(){console.log("resumeCallback")},i.prototype.restartCallback=function(){console.log("restartCallback")},i.prototype.draw=function(){this.ctx.clearRect(0,0,this.c.width,this.c.height),this.renderLanes(this.c,this.ctx),this.player.draw(this.ctx,this.vw),this.player._draw(this.ctx,this.vw,{x:this.player.pos.x-100,y:this.player.pos.y}),this.enemies.forEach(function(e){e.draw(this.ctx,this.vw)}.bind(this))},i.prototype.start=function(){this.paused=!1,this.gameLooping=!0,this.menuLooping=!1;var e=(new Date).getTime();this.oldTime=e,this.newTime=e,this.gameTime=0,this.messageTime=this.gameTime-this.messageInterval,this.newEnemyTime=this.gameTime-this.newEnemyInterval,this.enemies=[],this.enemyMaxSpeed=this.enemyInitialMaxSpeed,this.newEnemyInterval=this.newEnemyInitialInterval,this.lanes=[],this.lanes.push(new o(new a(255,255,255,1)));for(var t=0;t<this.numLanes-2;t++)this.lanes.push(new o(this.randomLaneColor()));this.lanes.push(new o(new a(255,255,255,1))),this.messageHolder.innerHTML="";var n=this.laneWidth/2/this.vw,i=.35*this.laneWidth/this.vw,s=this.maxHeight()-i-(this.laneWidthvw-2*i)/2;this.player=new h({x:n,y:s},i),this.score=0,this.updateScoreMessage(),this.bindGameControls(),this.gameLoopBound=this.gameLoop.bind(this),this.gameLoopBound()},i.prototype.gameLoop=function(){if(this.newTime=(new Date).getTime(),this.dt=this.newTime-this.oldTime,this.gameTime+=this.dt,this.enemies.forEach(function(e){e.pos.y>this.maxHeight()+e.radius&&this.enemies.splice(this.enemies.indexOf(e),1)}.bind(this)),this.player.targetLane>=1&&this.player.targetLane<=this.lanes.length-2?(this.lanes[0].open=!1,this.lanes[0].targetCoverUnit=1):(this.lanes[0].open=!0,this.lanes[0].targetCoverUnit=0),this.lanes[0].coverUnit!==this.lanes[0].targetCoverUnit){var e=this.lanes[0].targetCoverUnit-this.lanes[0].coverUnit,t=this.dt*this.lanes[0].coverUnitSpeed;t>=Math.abs(e)?this.lanes[0].coverUnit=this.lanes[0].targetCoverUnit:this.lanes[0].targetCoverUnit>this.lanes[0].coverUnit?this.lanes[0].coverUnit+=t:this.lanes[0].coverUnit-=t}if(this.enemies.forEach(function(e){e.move(this.dt)}.bind(this)),this.player.move(this.dt),this.player.pos.x>=100+this.player.radius){this.player.pos.x-=100,this.player.targetLane=0,this.player.updateTargetPos(this.laneWidthvw);for(var n=1;n<=this.lanes.length-2;n++)this.lanes[n].color=this.randomLaneColor();this.score+=1,this.updateScoreMessage(),this.enemyMaxSpeed+=.002,this.enemyMaxSpeed=Math.min(this.enemyMaxSpeed,this.enemyTopSpeed),this.newEnemyInterval-=20,this.newEnemyInterval=Math.max(this.newEnemyInterval,this.newEnemyMinInterval)}var i,s=this.enemies.some(function(e){var t=r.distance(e.pos,this.player.pos);return t<=e.radius+this.player.radius?(i=e,!0):!1}.bind(this));if(this.gameTime-this.newEnemyInterval>=this.newEnemyTime&&(this.addRandomEnemy(),this.newEnemyTime=this.gameTime),s){this.gameLooping=!1,this.endGameCleanUp(),this.updateScore();var o=document.querySelector(".js-new");this.newHighScore(this.score)?(this.updateHighScore(),o.innerHTML="New "):o.innerHTML="",this.enemies.forEach(function(e){e.speed*=.1}),i.speed=0,this.endTime=this.newTime+2e3,this.endLoop=function(){this.newTime=(new Date).getTime(),this.newTime<this.endTime?(this.dt=this.newTime-this.oldTime,this.gameTime+=this.dt,this.enemies.forEach(function(e){e.move(this.dt)}.bind(this)),this.draw(),setTimeout(this.endLoop,0)):(this.bindEndControls(),this.dieCallback()),this.oldTime=this.newTime}.bind(this),this.endLoop()}this.draw(),this.oldTime=this.newTime,this.gameLooping&&window.requestAnimationFrame(this.gameLoopBound)},i.prototype.startMenuLoop=function(){var e=(new Date).getTime();this.oldTime=e,this.newTime=e,this.gameTime=0,this.paused=!1,this.gameLooping=!1,this.menuLooping=!0,this.menuEnemyTime=this.gameTime-this.menuEnemyInterval,this.messageHolder.innerHTML="",this.enemies=[],this.enemyMaxSpeed=this.enemyInitialMaxSpeed,this.lanes=[];for(var t=0;t<this.numLanes;t++){var n=s.randomInt(50,255),i=s.randomInt(50,255),r=s.randomInt(50,255),h=1,d=new a(n,i,r,h),u=new o(d);this.lanes.push(u)}this.menuLoopBound=this.menuLoop.bind(this),this.menuLoopBound()},i.prototype.menuLoop=function(){this.newTime=(new Date).getTime(),this.dt=this.newTime-this.oldTime,this.gameTime+=this.dt,this.gameTime-this.menuEnemyInterval>=this.menuEnemyTime&&(this.addRandomEnemy(),this.menuEnemyTime=this.gameTime),this.enemies.forEach(function(e){e.move(this.dt)}.bind(this)),this.enemies.forEach(function(e){e.pos.y>this.maxHeight()+e.radius&&this.enemies.splice(this.enemies.indexOf(e),1)}.bind(this)),this.ctx.clearRect(0,0,this.c.width,this.c.height),this.renderLanes(this.c,this.ctx),this.enemies.forEach(function(e){e.draw(this.ctx,this.vw)}.bind(this)),this.oldTime=this.newTime,this.menuLooping&&window.requestAnimationFrame(this.menuLoopBound)},e.exports=i},function(e,t){"use strict";function n(){}n.clone=function(e){return{x:e.x,y:e.y}},n.distance=function(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))},e.exports=n},function(e,t,n){"use strict";function i(){this.canvasAspectWidth=3,this.canvasAspectHeight=1,this.menus={},this.menuList=[],this.keyboard=void 0,this.game=void 0}n(3);i.prototype.getMenuHooks=function(e){this.menuList=e,this.menuList.forEach(function(e){this.menus[e]=document.querySelector(".js-"+e+"-menu")}.bind(this))},i.prototype.hideMenu=function(e){e.style.height="0"},i.prototype.showMenu=function(e){e.style.height="100%"},i.prototype.startGame=function(){this.game.start()},e.exports=i},function(e,t){"use strict";function n(){this.howls={},this.categories={},this.setupDone=!1,this.totalNumSounds=0,this.numSoundsLoaded=0,this.numLoadErrors=0}n.prototype.add=function(e){this.totalNumSounds+=1;var t=new Howl({urls:e.paths,buffer:!0,onload:function(){console.log("Sound loaded"),this.numSoundsLoaded+=1}.bind(this),onloaderror:function(){console.log("Sound load error"),this.numLoadErrors+=1}.bind(this),onend:e.onend});"string"==typeof e.category&&(void 0===this.categories[e.category]&&(this.categories[e.category]=[]),this.categories[e.category].push(t)),this.howls[e.name]=t},n.prototype.setCategoryVolume=function(e,t){for(var n=this.categories[e],i=0;i<n.length;i++)n[i].volume(t)},n.prototype.doneLoading=function(){return this.setupDone&&this.numSoundsLoaded===this.totalNumSounds?!0:!1},e.exports=n},function(e,t,n){"use strict";function i(e,t,n,i){this.pos=e,this.radius=t,this.speed=n,this.laneNumber=i,this.color=new s(0,0,0,1)}var s=n(1);i.prototype.move=function(e){var t=e*this.speed;this.pos.y+=t},i.prototype.render=function(e,t){e.save(),e.beginPath(),e.arc(0,0,this.radius*t,0,2*Math.PI,!1),e.fillStyle=this.color.toString(),e.fill(),e.closePath(),e.restore()},i.prototype._draw=function(e,t,n){e.save(),e.translate(n.x*t,n.y*t),this.render(e,t),e.restore()},i.prototype.draw=function(e,t){this._draw(e,t,this.pos)},e.exports=i},function(e,t){"use strict";function n(){this.target=void 0,this.isKeyDown={},this.keydownEvent=void 0,this.keyupEvent=void 0}n.keyIdentifier={},n.keyIdentifier[87]="W",n.keyIdentifier[65]="A",n.keyIdentifier[83]="S",n.keyIdentifier[68]="D",n.keyIdentifier[38]="ArrowUp",n.keyIdentifier[37]="ArrowLeft",n.keyIdentifier[40]="ArrowDown",n.keyIdentifier[39]="ArrowRight",n.keyIdentifier[16]="Shift",n.keyIdentifier[90]="Z",n.keyIdentifier[88]="X",n.keyIdentifier[67]="C",n.keyIdentifier[27]="Escape",n.keyIdentifier[32]="Space",n.prototype.getKeyIdentifier=function(e){return e.keyCode},n.prototype.getKeyFromIdentifier=function(e){return n.keyIdentifier[e]},n.prototype.getKey=function(e){return this.getKeyFromIdentifier(this.getKeyIdentifier(e))},n.prototype.keydown=function(e){var t=this.getKey(e);this.isKeyDown[t]=!0},n.prototype.keyup=function(e){var t=this.getKey(e);this.isKeyDown[t]=!1},n.prototype.startListen=function(e){this.target=e,this.keydownEvent=this.keydown.bind(this),this.keyupEvent=this.keyup.bind(this),this.target.addEventListener("keydown",this.keydownEvent),this.target.addEventListener("keyup",this.keyupEvent)},n.prototype.stopListen=function(){this.target.removeEventListener("keydown",this.keydownEvent),this.target.removeEventListener("keyup",this.keyupEvent)},e.exports=n},function(e,t,n){"use strict";function i(e){this.color=e,this.open=!0,this.coverColor=new s(0,0,0,1),this.coverUnit=0,this.targetCoverUnit=0,this.coverUnitSpeed=.005}var s=n(1);i.prototype.render=function(e,t,n){var i=this.coverUnit*n;e.save(),e.fillStyle=this.color.toString(),e.fillRect(0,0,t,n),e.fillStyle=this.coverColor.toString(),e.fillRect(0,0,t,i),e.restore()},e.exports=i},function(e,t,n){"use strict";function i(e,t){this.pos=e,this.radius=t,this.speed={x:.2,y:.2},this.targetLane=0,this.targetPos=s.clone(e)}var s=n(4);i.prototype.move=function(e){["x","y"].forEach(function(t){var n=this.targetPos[t]-this.pos[t],i=e*this.speed[t];i>=Math.abs(n)?this.pos[t]=this.targetPos[t]:n>0?this.pos[t]+=i:this.pos[t]-=i}.bind(this))},i.prototype.updateTargetPos=function(e){var t=this.pos.y,n=e/2+this.targetLane*e;this.targetPos={x:n,y:t}},i.prototype.render=function(e,t){e.save(),e.beginPath(),e.arc(0,0,this.radius*t,0,2*Math.PI,!1),e.globalCompositeOperation="difference",e.fillStyle="#fff",e.fill(),e.closePath(),e.restore()},i.prototype._draw=function(e,t,n){e.save(),e.translate(n.x*t,n.y*t),this.render(e,t),e.restore()},i.prototype.draw=function(e,t){this._draw(e,t,this.pos)},e.exports=i}]);