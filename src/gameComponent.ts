import BaseComponent from "./utils/baseComponent";
import LayerImageComponent from "./layerImgComponent";
import { nameof } from "./utils/nameOf";
import TileComponent from "./tileComponent";

LayerImageComponent.logMe();

export default class GameComponent extends BaseComponent {
  private myShadow: ShadowRoot | null = null;

  private _name = "";
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
    this.build();
  }

  private _imagesrc = "";
  get imagesrc(): string {
    return this._imagesrc;
  }
  set imagesrc(value: string) {
    this._imagesrc = value;
    console.log("game: imageSrc set to: " + value);
    this.build();
  }

  private _soundsrc = "";
  get soundsrc(): string {
    return this._soundsrc;
  }
  set soundsrc(value: string) {
    this._soundsrc = value;
    console.log("game: soundsrc set to: " + value);
    this.build();
  }

  private _soundSpeed = 1.0;
  get soundSpeed(): number {
    return this._soundSpeed;
  }
  set soundSpeed(value: number) {
    this._soundSpeed = value;
    console.log("game: soundSpped set to: " + value);
    this.build();
  }

  build = () => {
    if (!this.myShadow) {
      console.log("game called without shadow " + this.imagesrc);
      return;
    }

    this.myShadow.innerHTML = this.render();
    this.postrender();
  };

  render = () => {
    console.log("game render " + this.name + " " + this.imagesrc);

    return `
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
            <a-layerimg style="min-width: 200px; min-height: 200px" imagesrc="${
              this.imagesrc
            }"></a-layerimg>
          </div>
        </div>
        `;
  };

  postrender = () => {
    const backTile = this.myShadow?.getElementById(
      "back-tile"
    ) as TileComponent<any>;
    if (!backTile) {
      return;
    }

    backTile.activateFn = () => {
      console.log("backtile clicked");
      window.location.reload(); // for now enough
    };

    this.playSound();
  };
  connectedCallback() {
    this.myShadow = this.attachShadow({ mode: "open" }); // closed means it cannot be accessed from the outside
    this.build();
  }


  playSound = () => {
    try {
      const audio = document.getElementById("my-audio") as HTMLAudioElement;
      if(!audio){
        return;
      }

      audio.pause();
      audio.muted = true;
      audio.playbackRate = 1.0;

      if(!this.soundsrc){
        return;
      }

      audio.src = this.soundsrc;
      if(this.soundSpeed){
        audio.playbackRate = this.soundSpeed;
      }
      audio.muted = false;
      audio.play();
    } catch (e: any) {
      console.log("error playing audio " + e.message); // will happen when user has not interacted with document (to be improved)
    }
  };
  
  //#region static webcomponent methods

  static get observedAttributes() {
    return [nameof<GameComponent>("name"), nameof<GameComponent>("imagesrc"), nameof<GameComponent>("soundsrc")];
  }

  //#endregion

  //#region static methods
  public static logMe() {
    // dummy static method to ensure imports exist
    console.log("gameComponent");
  }

  //#endregion
}
// register component
customElements.define("a-game", GameComponent);
