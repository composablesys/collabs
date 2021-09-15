import * as crdts from "compoventuals";
import { GroupComponentMessage } from "../generated/proto_compiled";

export interface GroupTranslateEvent extends crdts.CrdtEvent {
  readonly newX: number;
  readonly newY: number;
}

export interface GroupRotateEvent extends crdts.CrdtEvent {
  readonly rotated: number;
}

export interface GroupReflectXEvent extends crdts.CrdtEvent {}

export interface GroupReflectYEvent extends crdts.CrdtEvent {}

export interface GroupEventsRecord extends crdts.CrdtEventsRecord {
  Translate: GroupTranslateEvent;
  Rotate: GroupRotateEvent;
  ReflectX: GroupReflectXEvent;
  ReflectY: GroupReflectYEvent;
}

export class GroupState {
  X: number;
  Y: number;
  rotate: number;
  reflectX: number;
  reflectY: number;

  constructor() {
    this.X = 0;
    this.Y = 0;
    this.reflectX = 1;
    this.reflectY = 1;
    this.rotate = 0;
  }

  resetLocalState(): void {
    this.X = 0;
    this.Y = 0;
    this.reflectX = 1;
    this.reflectY = 1;
    this.rotate = 0;
  }
}

export class TranslateComponent extends crdts.CPrimitive<GroupEventsRecord> {
  readonly state: GroupState;

  constructor(initToken: crdts.CrdtInitToken, initialState: GroupState) {
    super(initToken);
    this.state = initialState;
  }

  translate(newX: number, newY: number) {
    if (newX !== 0 || newY !== 0) {
      let message = GroupComponentMessage.create({ X: newX, Y: newY });
      let buffer = GroupComponentMessage.encode(message).finish();
      super.send(buffer);
    }
  }

  protected receivePrimitive(
    timestamp: crdts.CausalTimestamp,
    message: Uint8Array
  ) {
    let decoded = GroupComponentMessage.decode(message);
    this.state.X = decoded.X;
    this.state.Y = decoded.Y;
    this.emit("Translate", {
      meta: crdts.CrdtEventMeta.fromTimestamp(timestamp),
      newX: decoded.X,
      newY: decoded.Y,
    });
  }

  canGc() {
    return this.state.X === 0 && this.state.Y === 0;
  }

  savePrimitive(): Uint8Array {
    let message = GroupComponentMessage.create({
      X: this.state.X,
      Y: this.state.Y,
    });
    return GroupComponentMessage.encode(message).finish();
  }

  loadPrimitive(saveData: Uint8Array) {
    this.state.X = GroupComponentMessage.decode(saveData).X;
    this.state.Y = GroupComponentMessage.decode(saveData).Y;
  }
}

export class RotateComponent extends crdts.CPrimitive<GroupEventsRecord> {
  readonly state: GroupState;

  constructor(initToken: crdts.CrdtInitToken, initialState: GroupState) {
    super(initToken);
    this.state = initialState;
  }

  rotate(degrees: number) {
    if (degrees !== 0) {
      let message = GroupComponentMessage.create({ rotate: degrees });
      let buffer = GroupComponentMessage.encode(message).finish();
      super.send(buffer);
    }
  }

  protected receivePrimitive(
    timestamp: crdts.CausalTimestamp,
    message: Uint8Array
  ) {
    let decoded = GroupComponentMessage.decode(message);
    this.state.rotate += decoded.rotate;
    this.emit("Rotate", {
      meta: crdts.CrdtEventMeta.fromTimestamp(timestamp),
      rotated: decoded.rotate,
    });
  }

  canGc() {
    return this.state.rotate === 0;
  }

  savePrimitive(): Uint8Array {
    let message = GroupComponentMessage.create({ rotate: this.state.rotate });
    return GroupComponentMessage.encode(message).finish();
  }

  loadPrimitive(saveData: Uint8Array) {
    this.state.rotate = GroupComponentMessage.decode(saveData).rotate;
  }
}

export class ReflectXComponent extends crdts.CPrimitive<GroupEventsRecord> {
  readonly state: GroupState;

  constructor(initToken: crdts.CrdtInitToken, initialState: GroupState) {
    super(initToken);
    this.state = initialState;
  }

  reflect() {
    let message = GroupComponentMessage.create({ reflectX: -1 });
    let buffer = GroupComponentMessage.encode(message).finish();
    super.send(buffer);
  }

  protected receivePrimitive(
    timestamp: crdts.CausalTimestamp,
    message: Uint8Array
  ) {
    let decoded = GroupComponentMessage.decode(message);
    this.state.reflectX *= decoded.reflectX;
    this.emit("ReflectX", {
      meta: crdts.CrdtEventMeta.fromTimestamp(timestamp),
    });
  }

  canGc() {
    return this.state.reflectX === 1;
  }

  savePrimitive(): Uint8Array {
    let message = GroupComponentMessage.create({
      reflectX: this.state.reflectX,
    });
    return GroupComponentMessage.encode(message).finish();
  }

  loadPrimitive(saveData: Uint8Array) {
    this.state.reflectX = GroupComponentMessage.decode(saveData).reflectX;
  }
}

export class ReflectYComponent extends crdts.CPrimitive<GroupEventsRecord> {
  readonly state: GroupState;

  constructor(initToken: crdts.CrdtInitToken, initialState: GroupState) {
    super(initToken);
    this.state = initialState;
  }

  reflect() {
    let message = GroupComponentMessage.create({ reflectY: -1 });
    let buffer = GroupComponentMessage.encode(message).finish();
    super.send(buffer);
  }

  protected receivePrimitive(
    timestamp: crdts.CausalTimestamp,
    message: Uint8Array
  ) {
    let decoded = GroupComponentMessage.decode(message);
    this.state.reflectY *= decoded.reflectY;
    this.emit("ReflectY", {
      meta: crdts.CrdtEventMeta.fromTimestamp(timestamp),
    });
  }

  canGc() {
    return this.state.reflectY === 1;
  }

  savePrimitive(): Uint8Array {
    let message = GroupComponentMessage.create({
      reflectY: this.state.reflectY,
    });
    return GroupComponentMessage.encode(message).finish();
  }

  loadPrimitive(saveData: Uint8Array) {
    this.state.reflectY = GroupComponentMessage.decode(saveData).reflectY;
  }
}

export class GroupCrdt extends crdts.MultipleSemidirectProduct<
  GroupState,
  GroupEventsRecord
> {
  private translateCrdt: TranslateComponent;
  private rotateCrdt: RotateComponent;
  private reflectXCrdt: ReflectXComponent;
  private reflectYCrdt: ReflectYComponent;

  constructor(initToken: crdts.CrdtInitToken) {
    super(initToken, false);
    const state = new GroupState();
    super.setupState(state);
    this.translateCrdt = super.setupOneCrdt(
      crdts.Pre(TranslateComponent)(state)
    );
    this.rotateCrdt = super.setupOneCrdt(crdts.Pre(RotateComponent)(state));
    this.reflectXCrdt = super.setupOneCrdt(crdts.Pre(ReflectXComponent)(state));
    this.reflectYCrdt = super.setupOneCrdt(crdts.Pre(ReflectYComponent)(state));

    this.rotateCrdt.on("Translate", (event) => super.emit("Translate", event));
    this.rotateCrdt.on("Rotate", (event) => super.emit("Rotate", event));
    this.reflectXCrdt.on("ReflectX", (event) => super.emit("ReflectX", event));
    this.reflectYCrdt.on("ReflectY", (event) => super.emit("ReflectY", event));
  }

  // Want to "add on" m2's actions to m1. Start with m1 values and
  // add reflection or rotation as needed.
  protected action(
    _m2TargetPath: string[],
    _m2Timestamp: crdts.CausalTimestamp | null,
    m2Message: Uint8Array,
    m2Index: number,
    _m1TargetPath: string[],
    _m1Timestamp: crdts.CausalTimestamp,
    m1Message: Uint8Array
  ): { m1TargetPath: string[]; m1Message: Uint8Array } | null {
    let m2Decoded = GroupComponentMessage.decode(m2Message);
    let m1Decoded = GroupComponentMessage.decode(m1Message);
    var XArg: number = m1Decoded!.X || 0;
    var YArg: number = m1Decoded!.Y || 0;
    var rotateArg: number = m1Decoded!.rotate || 0;
    var reflectXArg: number = m1Decoded!.reflectX || 1;
    var reflectYArg: number = m1Decoded!.reflectY || 1;
    switch (m2Index) {
      case 3:
        reflectYArg *= m2Decoded.reflectY;
        break;
      case 2:
        reflectXArg *= m2Decoded.reflectX;
        break;
      case 1:
        rotateArg += m2Decoded.rotate;
        break;
      default:
        XArg = m1Decoded.X;
        YArg = m1Decoded.Y;
    }
    let acted = GroupComponentMessage.create({
      X: XArg,
      Y: YArg,
      rotate: rotateArg,
      reflectX: reflectXArg,
      reflectY: reflectYArg,
    });

    return {
      m1TargetPath: [],
      m1Message: GroupComponentMessage.encode(acted).finish(),
    };
  }

  translate(X: number, Y: number) {
    this.translateCrdt.translate(X, Y);
  }

  rotate(degrees: number) {
    this.rotateCrdt.rotate(degrees);
  }

  reflectX() {
    this.reflectXCrdt.reflect();
  }

  reflectY() {
    this.reflectYCrdt.reflect();
  }

  getState() {
    return this.state.internalState;
  }
}
