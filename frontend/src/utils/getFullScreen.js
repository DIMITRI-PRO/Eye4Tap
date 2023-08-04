export const enterFullscreen = () => {
  const element = document.documentElement;

  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else {
    switch (true) {
      case element.mozRequestFullScreen !== undefined:
        element.mozRequestFullScreen();
        break;
      case element.webkitRequestFullscreen !== undefined:
        element.webkitRequestFullscreen();
        break;
      case element.msRequestFullscreen !== undefined:
        element.msRequestFullscreen();
        break;
      default:
        console.error("Le mode plein écran n'est pas pris en charge.");
    }
  }
};

export const exitFullscreen = () => {
  if (document?.exitFullscreen) {
    document.exitFullscreen();
  } else {
    switch (true) {
      case document.mozCancelFullScreen !== undefined:
        document.mozCancelFullScreen();
        break;
      case document.webkitExitFullscreen !== undefined:
        document.webkitExitFullscreen();
        break;
      case document.msExitFullscreen !== undefined:
        document.msExitFullscreen();
        break;
      default:
        console.error("Impossible de quitter le mode plein écran.");
    }
  }
};
