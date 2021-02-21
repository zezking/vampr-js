class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let currentVampire = this;
    let numberOfVampiresFromOriginal = 0;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampiresFromOriginal++;
    }
    return numberOfVampiresFromOriginal;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (
      this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal
    ) {
      return true;
    } else {
      return false;
    }
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }

    for (let childNode of this.offspring) {
      let vampire = childNode.vampireWithName(name);
      if (vampire) {
        return vampire;
      }
    }

    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0;
    for (let childNode of this.offspring) {
      count += childNode.totalDescendents + 1;
    }
    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let vampires = [];
    if (this.yearConverted > 1980) {
      vampires.push(this);
    }

    for (let childNode of this.offspring) {
      vampires = vampires.concat(childNode.allMillennialVampires);
    }

    return vampires;
  }

  /** Stretch **/
  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (this === vampire) {
      return vampire;
    } else if (this.isMoreSeniorThan(vampire)) {
      return this;
    } else if (this.numberOfOffspring === 2) {
      return this;
    } else {
      return vampire;
    }
  }
}

module.exports = Vampire;
