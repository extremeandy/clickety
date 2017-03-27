const soundFileNames = [
  "punch.mp3",
  "punch1.mp3",
  "punch2.mp3",
  "slap.mp3"
];

export const SoundFx = {
  playFileName: (soundFileName) => {
    (new Audio(`/sfx/${soundFileName}`)).play();
  },
  playRandom: () => {
    const randomIndex = Math.floor(Math.random() * (1 + soundFileNames.length - 1));
    const soundFileName = soundFileNames[randomIndex];

    SoundFx.playFileName(soundFileName);
  }
};

