/* -------------------------------------------------------------------------- */
/*                                   Sounds                                   */
/* -------------------------------------------------------------------------- */
export const backgroundMusic = new Audio("assets/sounds/background-music.mp3");

export const deahtSound = new Audio("assets/sounds/death-sound.wav");
export const alienDeath = new Audio("assets/sounds/alien-death.wav");
export const shootSound = new Audio("assets/sounds/shoot.wav");
export const moveAlienSound = new Audio("assets/sounds/move-alien.wav");
export const winSound = new Audio("assets/sounds/siuu.mp3");

/* -------------------------------------------------------------------------- */
/*                                   Program                                  */
/* -------------------------------------------------------------------------- */
export function stopSound(sound) {
    sound.pause();
    sound.currentTime = 0;
}
