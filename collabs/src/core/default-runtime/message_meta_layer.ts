import { Crdt } from "../crdt";
import { ParentCrdt } from "../crdt_parent";

/**
 * Crdt that provides optional MessageMeta fields to its
 * descendants.
 */
export class MessageMetaLayer extends Crdt implements ParentCrdt {}
