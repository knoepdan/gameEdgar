var v=Object.defineProperty;var S=(t,o,e)=>o in t?v(t,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[o]=e;var s=(t,o,e)=>S(t,typeof o!="symbol"?o+"":o,e);(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=e(n);fetch(n.href,r)}})();class g extends HTMLElement{htmlEncode(o){if(!o)return o;const e=document.createElement("p");return e.textContent=o,e.innerHTML}connectedCallback(){console.log("2 base connectCallback")}disconnectedCallback(){console.log("Z base disconnectCallback")}attributeChangedCallback(o,e,i){if(console.log("attributeChangedCallback "+o+" "+e+" "+i),e===i)return;const n=this;n[o]=i,this.build()}adoptedCallback(){console.log("xx base adoptedCallback")}}const l=t=>t,C=(t,o,e)=>{const i=t.getContext("2d"),n=new Image;n.onload=()=>{i&&(i.imageSmoothingQuality="high",console.log("1 anvas.width: "+t.width),x(t,n,e.maxWidth,e.maxHeight),console.log("2 canvas.width: "+t.width),i.drawImage(n,0,0,n.width,n.height,0,0,t.width,t.height))},n.src=o},_=t=>new Promise((o,e)=>{const i=new Image;i.onload=()=>{const n={width:i.width,height:i.height};o(n)},i.onerror=()=>{e(new Error("There was some problem with the image."))},i.src=t}),x=(t,o,e,i)=>{e&&i&&(o.width>e||o.height>i)?o.width>o.height?(t.width=e,t.height=e/o.width*o.height):(t.height=i,t.width=i/o.height*o.width):(t.width=o.width,t.height=o.height)},k=(t,o,e,i)=>{const n={width:t,height:o};return e&&i&&(t>e||o>i)?t>o?(n.width=e,n.height=e/t*o):(n.height=i,n.width=i/o*t):(n.width=t,n.height=o),n},M=(t,o)=>{const e=t.getBoundingClientRect();return{x:Math.floor((o.clientX-e.left)/(e.right-e.left)*t.width),y:Math.floor((o.clientY-e.top)/(e.bottom-e.top)*t.height)}};class m extends g{constructor(){super(...arguments);s(this,"myShadow",null);s(this,"_imagesrc","");s(this,"_fillColor","red");s(this,"_maxWidth",800);s(this,"_maxHeight",800);s(this,"_drawType","rect");s(this,"build",async()=>{this.myShadow&&(this.myShadow.innerHTML=this.render(),await this.postrender())});s(this,"render",()=>`
      <style>

        .img-container{
            position: relative;
            max-width: 100%;
            max-height: 100%;
            cursor: url('laser.cur'), auto;    
        }

        .layer-img-fill{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 0;
          margin: 0;
        }
        
      </style>

      <div id="cont" class="img-container">
        <canvas id="one" class="layer-img-fill" style="z-index: 40; "></canvas>

        <canvas id="two" class="layer-img-fill" style="z-index: 44 "></canvas>

      </div>`);s(this,"postrender",async()=>{if(!this.myShadow)return;const e=await _(this.imagesrc),i=k(e.width,e.height,this.maxWidth,this.maxHeight),n=this.myShadow.getElementById("cont");n.style.width=`${i.width}px`,n.style.height=`${i.height}px`;const r=this.myShadow.getElementById("one");C(r,this.imagesrc,{adjustCanvasToImage:!0,maxWidth:i.width,maxHeight:i.height});const a=this.myShadow.getElementById("two"),c=a.getContext("2d");c.fillStyle="red",c.fillRect(0,0,a.width,a.height),a.addEventListener("mousemove",this.handleMouseMove)});s(this,"handleMouseMove",e=>{e.preventDefault(),e.stopPropagation();const i=e.currentTarget,n=M(i,e),r=i.getContext("2d");r.save(),this.uncover(r,n),r.restore()})}get imagesrc(){return this._imagesrc}set imagesrc(e){this._imagesrc=e,console.log("game: imageSrc set to: "+e),this.build()}get fillColor(){return this._fillColor}set fillColor(e){this._fillColor=e,this.build()}get maxWidth(){return this._maxWidth}set maxWidth(e){this._maxWidth=e,this.build()}get maxHeight(){return this._maxHeight}set maxHeight(e){this._maxHeight=e,this.build()}get drawType(){return this._drawType}set drawType(e){this._drawType=e,this.build()}uncover(e,i){switch(e.globalCompositeOperation="destination-out",this.drawType){case"rect":e.fillRect(i.x-15,i.y-15,30,30);break;case"arc":e.beginPath(),e.arc(i.x,i.y,25,0,2*Math.PI),e.stroke();break;default:console.log("unknown drawType: "+this.drawType);break}}connectedCallback(){this.myShadow=this.attachShadow({mode:"open"}),this.build()}static get observedAttributes(){return[l("imagesrc"),l("fillColor"),l("maxWidth"),l("maxHeight"),l("drawType")]}static logMe(){console.log("layerImgComponent")}}customElements.define("a-layerimg",m);m.logMe();class p extends g{constructor(){super(...arguments);s(this,"myShadow",null);s(this,"_name","");s(this,"_imagesrc","");s(this,"build",()=>{if(!this.myShadow){console.log("game called without shadow "+this.imagesrc);return}this.myShadow.innerHTML=this.render(),this.postrender()});s(this,"render",()=>(console.log("game render "+this.name+" "+this.imagesrc),`
      <style>
        .game{
            position: relative;
            /*
            left: 62px;
            top:10px;
            */

        }
        .game-back{
           position: fixed;
            top: -5px;
            left: -5px;
            z-index: 999999;
            padding: 0;
        }

      </style>
        <div>

          <div class="game-back">
            <a-tile id="back-tile" name="zurück" round="true" height="130" width="130"></a-tile>
          </div>

          <div class="game">
            <h2> ${this.htmlEncode(this.name)}</h2>
            <a-layerimg style="min-width: 200px; min-height: 200px" imagesrc="${this.imagesrc}"></a-layerimg>
          </div>
        </div>
        `));s(this,"postrender",()=>{var i;const e=(i=this.myShadow)==null?void 0:i.getElementById("back-tile");e&&(e.activateFn=()=>{console.log("backtile clicked"),window.location.reload()})})}get name(){return this._name}set name(e){this._name=e,this.build()}get imagesrc(){return this._imagesrc}set imagesrc(e){this._imagesrc=e,console.log("game: imageSrc set to: "+e),this.build()}connectedCallback(){this.myShadow=this.attachShadow({mode:"open"}),this.build()}static get observedAttributes(){return[l("name"),l("imagesrc")]}static logMe(){console.log("gameComponent")}}customElements.define("a-game",p);m.logMe();class h extends g{constructor(e,i,n,r,a){super();s(this,"myShadow",null);s(this,"_name","");s(this,"_color","");s(this,"_hoverColor","");s(this,"_width",240);s(this,"_height",240);s(this,"_round",!1);s(this,"activateFn");s(this,"data");s(this,"_enterDate",null);s(this,"build",()=>{this.myShadow&&(this.myShadow.innerHTML=this.render(),this.postrender())});s(this,"render",()=>`
          <style>

        .tile-div{
            background-color: ${this.color};
            width: ${this.width}px;
            height:  ${this.height}px;
            box-shadow: 2px 2px lightgrey;
            cursor: pointer, auto;  
            display: flex;
           justify-content: center;
          align-items: center;

          border-radius: ${this.round?""+this.width/2:"5"}px;

        }
        .tile-div:hover{
            background-color: ${this.hoverColor};
        }

      </style>
        <div class="tile-div">
          <h3> ${this.htmlEncode(this.name)}</h3>
        </div>`);s(this,"postrender",()=>{var i,n,r,a,c,u;const e=this;(n=(i=e.myShadow)==null?void 0:i.querySelector(".tile-div"))==null||n.addEventListener("click",()=>{e.activate()}),(a=(r=e.myShadow)==null?void 0:r.querySelector(".tile-div"))==null||a.addEventListener("mouseenter",()=>{const b=new Date;e._enterDate||(e._enterDate=b),setTimeout(()=>{if(!e._enterDate)return;const w=new Date().getTime()-e._enterDate.getTime();console.log("dif: "+w+"         "+e._enterDate.getTime()),w>=2e3&&this.activate()},2050)}),(u=(c=e.myShadow)==null?void 0:c.querySelector(".tile-div"))==null||u.addEventListener("mouseleave",()=>{console.log("mouseleave  "+e._enterDate),e._enterDate=null})});s(this,"activate",()=>{this._enterDate=null,this.activateFn&&this.activateFn(this)});this.activateFn=i,this.name=e??"",this.color=n??"blue",this.hoverColor=r??"red",this.data=a}get name(){return this._name}set name(e){this._name=e,this.build()}get color(){return this._color}set color(e){this._color=e,this.build()}get hoverColor(){return this._hoverColor}set hoverColor(e){this._hoverColor=e,this.build()}get width(){return this._width}set width(e){this._width=e,this.build()}get height(){return this._height}set height(e){this._height=e,this.build()}get round(){return this._round}set round(e){this._round=e,this.build()}connectedCallback(){try{this.myShadow||(this.myShadow=this.attachShadow({mode:"open"}))}catch(e){console.log("error in connectedCallback: "+e)}this.build()}static get observedAttributes(){return[l("name"),l("color"),l("hoverColor"),l("height"),l("width"),l("round")]}static logMe(){console.log("tileComponent")}}customElements.define("a-tile",h);m.logMe();class y extends g{constructor(){super(...arguments);s(this,"myShadow",null);s(this,"build",()=>{if(!this.myShadow){console.log("stack called without shadow");return}this.myShadow.innerHTML=this.render(),this.postrender()});s(this,"render",()=>`
        <div style="display:flex; flex-direction: row; flex-wrap: wrap; gap: 50px;">
          <slot></slot>
        </div>`);s(this,"postrender",()=>{})}connectedCallback(){this.myShadow=this.attachShadow({mode:"open"}),this.build()}static get observedAttributes(){return[]}static logMe(){console.log("stack components")}}customElements.define("a-stack",y);const T=()=>{var e;const t=f();p.logMe(),y.logMe(),t.innerHTML='<a-stack id="tile-container"></a-stack>';const o=E();(e=document.getElementById("tile-container"))==null||e.append(...o);try{const i=document.getElementById("my-audio");i.playbackRate=2,i.muted=!1,i.play()}catch(i){console.log("error playing audio "+i.message)}},f=()=>document.getElementById("componentApp"),d=t=>{var e,i;console.log(`Starting game ${t==null?void 0:t.name}  with imageSrc: ${(e=t==null?void 0:t.data)==null?void 0:e.imageSrc}`);const o=f();(i=t==null?void 0:t.data)!=null&&i.imageSrc&&(o.innerHTML=`<a-game name="${t.name}" imageSrc="${t.data.imageSrc}"></a-game>`)},E=()=>{const t=new Array;return t.push(new h("Übercool",d,"yellow","goldenrod",{imageSrc:"img/coolMan.jpg"})),t.push(new h("Piiiiiep Piiiiiep",d,"maroon","red",{imageSrc:"img/birdSmaller.jpg"})),t.push(new h("Wow...",d,"indigo","deeppink",{imageSrc:"img/PepaReal.jpg"})),t.push(new h("Die kennen wir doch..",d,"coral","crimson",{imageSrc:"img/PawPatrol.png"})),t.push(new h("Die Familie",d,"green","lime",{imageSrc:"img/almostEverybody.jpg"})),t.push(new h("uiuiui gefährlich",d,"blue","deepskyblue",{imageSrc:"img/LionSmaller.jpg"})),t.push(new h("Viva la ???",d,"teal","aqua",{imageSrc:"img/mexico.jpg"})),t.push(new h("Grunz",d,"purple","fuchsia",{imageSrc:"img/Pepa.jpg"})),t};window.onload=function(){T()};"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("./serviceWorker.js").then(t=>console.log("service worker registered "+(t==null?void 0:t.scope))).catch(t=>console.log("service worker not registered",t))});
