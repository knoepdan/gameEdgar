import GameComponent from "./gameComponent.js";
import TileComponent from "./tileComponent.js";
import StackComponent from "./stackComponent.js";

const init = () => {
  const componentContainer = getComponentContainer();
  GameComponent.logMe();
  StackComponent.logMe();

  componentContainer.innerHTML = `<a-stack id="tile-container"></a-stack>`;

  const tiles = getGameTiles();
  document.getElementById("tile-container")?.append(...tiles);

  // start audio (will only work if user interacts with the page.. so initially no music)
  const audio = document.getElementById("my-audio") as HTMLAudioElement;
  audio.playbackRate = 2.0;
  audio.muted = false;
  audio.play();
};

const getComponentContainer = () => {
  const componentContainer = document.getElementById(
    "componentApp"
  ) as HTMLElement;
  return componentContainer;
};

const startGame = (tile?: TileComponent<IGameInfo>) => {
  console.log(
    `Starting game ${tile?.name}  with imageSrc: ${tile?.data?.imageSrc}`
  );
  const componentContainer = getComponentContainer();
  if (tile?.data?.imageSrc) {
    componentContainer.innerHTML = `<a-game name="${tile.name}" imageSrc="${tile.data.imageSrc}"></a-game>`;
  }
};

const getGameTiles = () => {
  const tiles = new Array<TileComponent<IGameInfo>>();

  tiles.push(
    new TileComponent<IGameInfo>("Übercool", startGame, "yellow", "goldenrod", {
      imageSrc: "img/coolMan.jpg",
    })
  );

  tiles.push(
    new TileComponent<IGameInfo>(
      "Piiiiiep Piiiiiep",
      startGame,
      "maroon",
      "red",
      {
        imageSrc: "img/birdSmaller.jpg",
      }
    )
  );
  tiles.push(
    new TileComponent<IGameInfo>("Wow...", startGame, "indigo", "deeppink", {
      imageSrc: "img/PepaReal.jpg",
    })
  );

  tiles.push(
    new TileComponent<IGameInfo>(
      "Die kennen wir doch..",
      startGame,
      "coral",
      "crimson",
      {
        imageSrc: "img/PawPatrol.png",
      }
    )
  );

  tiles.push(
    new TileComponent<IGameInfo>("Die Familie", startGame, "green", "lime", {
      imageSrc: "img/almostEverybody.jpg",
    })
  );
  tiles.push(
    new TileComponent<IGameInfo>(
      "uiuiui gefährlich",
      startGame,
      "blue",
      "deepskyblue",
      {
        imageSrc: "img/LionSmaller.jpg",
      }
    )
  );

  tiles.push(
    new TileComponent<IGameInfo>("Viva la ???", startGame, "teal", "aqua", {
      imageSrc: "img/mexico.jpg",
    })
  );

  tiles.push(
    new TileComponent<IGameInfo>("Grunz", startGame, "purple", "fuchsia", {
      imageSrc: "img/Pepa.jpg",
    })
  );

  return tiles;
};

window.onload = function () {
  init();
};

interface IGameInfo {
  type?: string;
  imageSrc?: string;
}
