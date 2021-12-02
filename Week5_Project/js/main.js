import DataManager from './gameDataManager.js'
import SoundManager from './gameSoundManager.js'
import RainingViewManager from './gameRainingViewManager.js'
import ModalViewManager from './gameModalViewManager.js'
import GameController from './gameController.js'

function loadEventHandle() {
  const dataManager = new DataManager();
  const soundManager = new SoundManager();
  const rainingViewManager = new RainingViewManager(dataManager, soundManager);
  const modalViewManager = new ModalViewManager(dataManager)
  const gameController = new GameController(dataManager, rainingViewManager, modalViewManager, soundManager);

  gameController.init();
}

window.addEventListener('load', loadEventHandle);