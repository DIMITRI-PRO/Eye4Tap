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
  if (!document?.fullscreenElement) {
    return null;
  }
  if (document?.exitFullscreen) {
    return document.exitFullscreen();
  }
  switch (true) {
    case document.mozCancelFullScreen !== undefined:
      return document.mozCancelFullScreen();
    case document.webkitExitFullscreen !== undefined:
      return document.webkitExitFullscreen();
    case document.msExitFullscreen !== undefined:
      return document.msExitFullscreen();
    default:
      return console.error("Impossible de quitter le mode plein écran.");
  }
};
