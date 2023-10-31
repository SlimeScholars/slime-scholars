export const playSound = (name, delay) => {
  if (delay > 0) {
    setTimeout(() => {
      const sound = new Audio("/assets/audio/sfx/" + name + ".mp3");
      sound.play();
    }, delay);
  } else {
    const sound = new Audio("/assets/audio/sfx/" + name + ".mp3");
    sound.play();
  }
};
