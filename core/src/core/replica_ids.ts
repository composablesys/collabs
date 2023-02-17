import * as crypto from "crypto";

export class ReplicaIDs {
  private constructor() {
    // Not instantiable.
  }

  /**
   * Characters used for replicaIDs in this class: the base64 chars.
   */
  static readonly CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  /**
   * The default length of a replicaID, in characters.
   *
   * Rationale for value 10:
   * Each character of the replicaID gives us 6 bits of entropy,
   * for a total of 60 bits.  This gives a < 1%
   * probability that two replicas in the same conversation
   * will ever choose the same replicaID's, even if we
   * consider the total probability across 100,000,000
   * conversations with 10,000 replicaIDs each
   * (= 10 users * 1,000 days * 1 replica/user/day).
   */
  static readonly DEFAULT_LENGTH = 10;

  /**
   * @return A random replicaID made of base64 characters.
   * Such replicaID's can be safely treated as either
   * byte arrays or UTF-8 strings, and they are printable.
   */
  static random(length: number = this.DEFAULT_LENGTH): string {
    const arr = new Array<string>(length);
    let randomValues = new Uint8Array(length);
    if (typeof window === "undefined") {
      // Use Node crypto library.
      // We use eval("require") to prevent Webpack from attempting
      // to bundle the crypto module and complaining.
      // In theory we should also be able to do this by
      // adding "browser": {"crypto": false} to package.json,
      // but that is not working, and besides, every user
      // of this package would have to remember to do so.
      // See https://github.com/webpack/webpack/issues/8826
      const cryptoReal = <typeof crypto>(
        (<typeof require>eval("require"))("crypto")
      );
      const randomBuffer = cryptoReal.randomBytes(length);
      randomValues = new Uint8Array(randomBuffer);
    } else {
      // Use browser crypto library.
      window.crypto.getRandomValues(randomValues);
    }
    for (let i = 0; i < length; i++) {
      // Here we exploit the fact that 64 divides 256.
      // This would be biased otherwise.
      arr[i] = this.CHARS[randomValues[i] % 64];
    }
    return arr.join("");
  }

  /**
   * For debugging/testing/benchmarking purposes.
   * Like [[ReplicaIDs.random]] but using pseudo-randomness
   * instead of cryptographic randomness.
   *
   * This can be passed to [[CRuntime]]'s `debugReplicaID` option.
   * It is recommended to do so for tests and benchmarks.
   *
   * @param rng The psuedo-random number generator, from
   * npm package "seedrandom".
   * @return A psueod-random replicaID made of base64 characters.
   * Such replicaID's can be safely treated as either
   * byte arrays or UTF-8 strings, and they are printable.
   */
  static pseudoRandom(
    rng: seedrandom.prng,
    length: number = this.DEFAULT_LENGTH
  ) {
    const arr = new Array<string>(length);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = this.CHARS[Math.floor(rng() * 64)];
    }
    return arr.join("");
  }
}
