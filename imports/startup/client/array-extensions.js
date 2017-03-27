Array.prototype.randomize = function(randomNumbers) {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(randomNumbers[i] * (i + 1));
    const temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }

  return this;
};