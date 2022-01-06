/**
 * Return a UID representing the pair (replicaId,
 * replicaUniqueNumber), in string form.
 *
 * These UIDs are similar to [Lamport timestamps](https://en.wikipedia.org/wiki/Lamport_timestamp),
 * except that the number is a per-replica counter instead
 * of a logical clock.
 */
export function makeUID(
  replicaID: string,
  replicaUniqueNumber: number
): string {
  // OPT: shorten (base128 instead of base36)
  return `${replicaUniqueNumber.toString(36)} ${replicaID}`;
}
