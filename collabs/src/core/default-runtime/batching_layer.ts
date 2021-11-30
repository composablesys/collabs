import { Crdt } from "../crdt";
import { ParentCrdt } from "../crdt_parent";

/**
 * Crdt that batches message sent by its descendants.
 */
export class BatchingLayer extends Crdt implements ParentCrdt {}
