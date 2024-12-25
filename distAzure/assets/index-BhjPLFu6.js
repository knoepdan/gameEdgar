var S=Object.defineProperty;var C=(t,i,e)=>i in t?S(t,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[i]=e;var s=(t,i,e)=>C(t,typeof i!="symbol"?i+"":i,e);(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function e(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=e(n);fetch(n.href,a)}})();class m extends HTMLElement{htmlEncode(i){if(!i)return i;const e=document.createElement("p");return e.textContent=i,e.innerHTML}connectedCallback(){console.log("2 base connectCallback")}disconnectedCallback(){console.log("Z base disconnectCallback")}attributeChangedCallback(i,e,o){if(console.log("attributeChangedCallback "+i+" "+e+" "+o),e===o)return;const n=this;n[i]=o,this.build()}adoptedCallback(){console.log("xx base adoptedCallback")}}const l=t=>t,v=(t,i,e)=>{const o=t.getContext("2d"),n=new Image;n.onload=()=>{o&&(o.imageSmoothingQuality="high",console.log("1 anvas.width: "+t.width),x(t,n,e.maxWidth,e.maxHeight),console.log("2 canvas.width: "+t.width),o.drawImage(n,0,0,n.width,n.height,0,0,t.width,t.height))},n.src=i},_=t=>new Promise((i,e)=>{const o=new Image;o.onload=()=>{const n={width:o.width,height:o.height};i(n)},o.onerror=()=>{e(new Error("There was some problem with the image."))},o.src=t}),x=(t,i,e,o)=>{e&&o&&(i.width>e||i.height>o)?i.width>i.height?(t.width=e,t.height=e/i.width*i.height):(t.height=o,t.width=o/i.height*i.width):(t.width=i.width,t.height=i.height)},k=(t,i,e,o)=>{const n={width:t,height:i};return e&&o&&(t>e||i>o)?t>i?(n.width=e,n.height=e/t*i):(n.height=o,n.width=o/i*t):(n.width=t,n.height=i),n},M=(t,i)=>{const e=t.getBoundingClientRect();return{x:Math.floor((i.clientX-e.left)/(e.right-e.left)*t.width),y:Math.floor((i.clientY-e.top)/(e.bottom-e.top)*t.height)}};class g extends m{constructor(){super(...arguments);s(this,"myShadow",null);s(this,"_imagesrc","");s(this,"_fillColor","red");s(this,"_maxWidth",800);s(this,"_maxHeight",800);s(this,"_drawType","rect");s(this,"build",async()=>{this.myShadow&&(this.myShadow.innerHTML=this.render(),await this.postrender())});s(this,"render",()=>`
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

      </div>`);s(this,"postrender",async()=>{if(!this.myShadow)return;const e=await _(this.imagesrc),o=k(e.width,e.height,this.maxWidth,this.maxHeight),n=this.myShadow.getElementById("cont");n.style.width=`${o.width}px`,n.style.height=`${o.height}px`;const a=this.myShadow.getElementById("one");v(a,this.imagesrc,{adjustCanvasToImage:!0,maxWidth:o.width,maxHeight:o.height});const r=this.myShadow.getElementById("two"),c=r.getContext("2d");c.fillStyle="red",c.fillRect(0,0,r.width,r.height),r.addEventListener("mousemove",this.handleMouseMove)});s(this,"handleMouseMove",e=>{e.preventDefault(),e.stopPropagation();const o=e.currentTarget,n=M(o,e),a=o.getContext("2d");a.save(),this.uncover(a,n),a.restore()})}get imagesrc(){return this._imagesrc}set imagesrc(e){this._imagesrc=e,console.log("game: imageSrc set to: "+e),this.build()}get fillColor(){return this._fillColor}set fillColor(e){this._fillColor=e,this.build()}get maxWidth(){return this._maxWidth}set maxWidth(e){this._maxWidth=e,this.build()}get maxHeight(){return this._maxHeight}set maxHeight(e){this._maxHeight=e,this.build()}get drawType(){return this._drawType}set drawType(e){this._drawType=e,this.build()}uncover(e,o){switch(e.globalCompositeOperation="destination-out",this.drawType){case"rect":e.fillRect(o.x-15,o.y-15,30,30);break;case"arc":e.beginPath(),e.arc(o.x,o.y,25,0,2*Math.PI),e.stroke();break;default:console.log("unknown drawType: "+this.drawType);break}}connectedCallback(){this.myShadow=this.attachShadow({mode:"open"}),this.build()}static get observedAttributes(){return[l("imagesrc"),l("fillColor"),l("maxWidth"),l("maxHeight"),l("drawType")]}static logMe(){console.log("layerImgComponent")}}customElements.define("a-layerimg",g);g.logMe();class p extends m{constructor(){super(...arguments);s(this,"myShadow",null);s(this,"_name","");s(this,"_imagesrc","");s(this,"build",()=>{if(!this.myShadow){console.log("game called without shadow "+this.imagesrc);return}this.myShadow.innerHTML=this.render(),this.postrender()});s(this,"render",()=>(console.log("game render "+this.name+" "+this.imagesrc),`
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
        `));s(this,"postrender",()=>{var o;const e=(o=this.myShadow)==null?void 0:o.getElementById("back-tile");e&&(e.activateFn=()=>{console.log("backtile clicked"),window.location.reload()})})}get name(){return this._name}set name(e){this._name=e,this.build()}get imagesrc(){return this._imagesrc}set imagesrc(e){this._imagesrc=e,console.log("game: imageSrc set to: "+e),this.build()}connectedCallback(){this.myShadow=this.attachShadow({mode:"open"}),this.build()}static get observedAttributes(){return[l("name"),l("imagesrc")]}static logMe(){console.log("gameComponent")}}customElements.define("a-game",p);g.logMe();class h extends m{constructor(e,o,n,a,r){super();s(this,"myShadow",null);s(this,"_name","");s(this,"_color","");s(this,"_hoverColor","");s(this,"_width",240);s(this,"_height",240);s(this,"_round",!1);s(this,"activateFn");s(this,"data");s(this,"_enterDate",null);s(this,"build",()=>{this.myShadow&&(this.myShadow.innerHTML=this.render(),this.postrender())});s(this,"render",()=>`
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
        </div>`);s(this,"postrender",()=>{var o,n,a,r,c,u;const e=this;(n=(o=e.myShadow)==null?void 0:o.querySelector(".tile-div"))==null||n.addEventListener("click",()=>{e.activate()}),(r=(a=e.myShadow)==null?void 0:a.querySelector(".tile-div"))==null||r.addEventListener("mouseenter",()=>{const b=new Date;e._enterDate||(e._enterDate=b),setTimeout(()=>{if(!e._enterDate)return;const w=new Date().getTime()-e._enterDate.getTime();console.log("dif: "+w+"         "+e._enterDate.getTime()),w>=2e3&&this.activate()},2050)}),(u=(c=e.myShadow)==null?void 0:c.querySelector(".tile-div"))==null||u.addEventListener("mouseleave",()=>{console.log("mouseleave  "+e._enterDate),e._enterDate=null})});s(this,"activate",()=>{this._enterDate=null,this.activateFn&&this.activateFn(this)});this.activateFn=o,this.name=e??"",this.color=n??"blue",this.hoverColor=a??"red",this.data=r}get name(){return this._name}set name(e){this._name=e,this.build()}get color(){return this._color}set color(e){this._color=e,this.build()}get hoverColor(){return this._hoverColor}set hoverColor(e){this._hoverColor=e,this.build()}get width(){return this._width}set width(e){this._width=e,this.build()}get height(){return this._height}set height(e){this._height=e,this.build()}get round(){return this._round}set round(e){this._round=e,this.build()}connectedCallback(){try{this.myShadow||(this.myShadow=this.attachShadow({mode:"open"}))}catch(e){console.log("error in connectedCallback: "+e)}this.build()}static get observedAttributes(){return[l("name"),l("color"),l("hoverColor"),l("height"),l("width"),l("round")]}static logMe(){console.log("tileComponent")}}customElements.define("a-tile",h);g.logMe();class y extends m{constructor(){super(...arguments);s(this,"myShadow",null);s(this,"build",()=>{if(!this.myShadow){console.log("stack called without shadow");return}this.myShadow.innerHTML=this.render(),this.postrender()});s(this,"render",()=>`
        <div style="display:flex; flex-direction: roe; flex-wrap: wrap; gap: 50px;">
          <slot></slot>
        </div>`);s(this,"postrender",()=>{})}connectedCallback(){this.myShadow=this.attachShadow({mode:"open"}),this.build()}static get observedAttributes(){return[]}static logMe(){console.log("stack components")}}customElements.define("a-stack",y);const T=()=>{var o;const t=f();p.logMe(),y.logMe(),t.innerHTML='<a-stack id="tile-container"></a-stack>';const i=E();(o=document.getElementById("tile-container"))==null||o.append(...i);const e=document.getElementById("my-audio");e.playbackRate=2,e.muted=!1,e.play()},f=()=>document.getElementById("componentApp"),d=t=>{var e,o;console.log(`Starting game ${t==null?void 0:t.name}  with imageSrc: ${(e=t==null?void 0:t.data)==null?void 0:e.imageSrc}`);const i=f();(o=t==null?void 0:t.data)!=null&&o.imageSrc&&(i.innerHTML=`<a-game name="${t.name}" imageSrc="${t.data.imageSrc}"></a-game>`)},E=()=>{const t=new Array;return t.push(new h("Übercool",d,"yellow","goldenrod",{imageSrc:"img/coolMan.jpg"})),t.push(new h("Piiiiiep Piiiiiep",d,"maroon","red",{imageSrc:"img/birdSmaller.jpg"})),t.push(new h("Wow...",d,"indigo","deeppink",{imageSrc:"img/PepaReal.jpg"})),t.push(new h("Die kennen wir doch..",d,"coral","crimson",{imageSrc:"img/PawPatrol.png"})),t.push(new h("Die Familie",d,"green","lime",{imageSrc:"img/almostEverybody.jpg"})),t.push(new h("uiuiui gefährlich",d,"blue","deepskyblue",{imageSrc:"img/LionSmaller.jpg"})),t.push(new h("Viva la ???",d,"teal","aqua",{imageSrc:"img/mexico.jpg"})),t.push(new h("Grunz",d,"purple","fuchsia",{imageSrc:"img/Pepa.jpg"})),t};window.onload=function(){T()};
