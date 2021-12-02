import DataManager from './gameDataManager.js'
import RainingViewManager from './gameRainingViewManager.js'
import ModalViewManager from './gameModalViewManager.js'
import GameController from './gameController.js'

function loadEventHandle() {
  const dataManager = new DataManager();
  const rainingViewManager = new RainingViewManager(dataManager);
  const modalViewManager = new ModalViewManager(dataManager)
  const gameController = new GameController(dataManager, rainingViewManager, modalViewManager);

  gameController.init();
}

window.addEventListener('load', loadEventHandle);