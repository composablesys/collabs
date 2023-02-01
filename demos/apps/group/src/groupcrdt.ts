import * as collabs from "@collabs/collabs";
import { Message } from "@collabs/collabs";
import { GroupComponentMessage } from "../generated/proto_compiled";
import { MultipleSemidirectProduct } from "./multiple_semidirect_product";

export interface GroupTranslateEvent extends collabs.CollabEvent {
  readonly dX1: number;
  readonly dY1: number;
  readonly dX2: number;
  readonly dY2: number;
}

export interface GroupRotateEvent extends collabs.CollabEvent {
  readonly rotated1: number;
  readonly rotated2: number;
}

export interface GroupReflectXEvent extends collabs.CollabEvent {
  readonly reflect1: number;
  readonly reflect2: number;
}

export interface GroupReflectYEvent extends collabs.CollabEvent {
  readonly reflect1: number;
  readonly reflect2: number;
}

export interface GroupEventsRecord extends collabs.CollabEventsRecord {
  Translate: GroupTranslateEvent;
  Rotate: GroupRotateEvent;
  ReflectX: GroupReflectXEvent;
  ReflectY: GroupReflectYEvent;
}

export class GroupState {
  X1: number;
  Y1: number;
  rotate1: number;
  reflectX1: number;
  reflectY1: number;
  X2: number;
  Y2: number;
  rotate2: number;
  reflectX2: number;
  reflectY2: number;

  constructor() {
    this.X1 = 0;
    this.Y1 = 0;
    this.reflectX1 = 1;
    this.reflectY1 = 1;
    this.rotate1 = 0;
    this.X2 = 0;
    this.Y2 = 0;
    this.reflectX2 = 1;
    this.reflectY2 = 1;
    this.rotate2 = 0;
  }
}

export class TranslateComponent extends collabs.CPrimitive<GroupEventsRecord> {
  readonly state: GroupState;

  constructor(init: collabs.InitToken, initialState: GroupState) {
    super(init);
    this.state = initialState;
  }

  translate(newX: number, newY: number, img: number) {
    if (newX !== 0 || newY !== 0) {
      var message;
      if (img === 1) {
        message = GroupComponentMessage.create({ X1: newX, Y1: newY });
      } else if (img === 2) {
        message = GroupComponentMessage.create({ X2: newX, Y2: newY });
      } else {
        message = GroupComponentMessage.create({
          X1: newX,
          Y1: newY,
          X2: newX,
          Y2: newY,
        });
      }
      let buffer = GroupComponentMessage.encode(message).finish();
      super.sendPrimitive(buffer);
    }
  }

  protected receivePrimitive(message: Uint8Array, meta: collabs.MessageMeta) {
    let decoded = GroupComponentMessage.decode(message);
    this.state.X1 += decoded.X1;
    this.state.Y1 += decoded.Y1;
    this.state.X2 += decoded.X2;
    this.state.Y2 += decoded.Y2;
    this.emit("Translate", {
      meta,
      dX1: decoded.X1,
      dY1: decoded.Y1,
      dX2: decoded.X2,
      dY2: decoded.Y2,
    });
  }

  canGC() {
    return (
      this.state.X1 === 0 &&
      this.state.Y1 === 0 &&
      this.state.X2 === 0 &&
      this.state.Y2 === 0
    );
  }

  save(): Uint8Array {
    let message = GroupComponentMessage.create({
      X1: this.state.X1,
      Y1: this.state.Y1,
      X2: this.state.X2,
      Y2: this.state.Y2,
    });
    return GroupComponentMessage.encode(message).finish();
  }

  load(saveData: collabs.Optional<Uint8Array>) {
    if (!saveData.isPresent) return;
    this.state.X1 = GroupComponentMessage.decode(saveData.get()).X1;
    this.state.Y1 = GroupComponentMessage.decode(saveData.get()).Y1;
    this.state.X2 = GroupComponentMessage.decode(saveData.get()).X2;
    this.state.Y2 = GroupComponentMessage.decode(saveData.get()).Y2;
  }
}

export class RotateComponent extends collabs.CPrimitive<GroupEventsRecord> {
  readonly state: GroupState;

  constructor(init: collabs.InitToken, initialState: GroupState) {
    super(init);
    this.state = initialState;
  }

  rotate(degrees: number, img: number) {
    if (degrees !== 0) {
      var message;
      if (img === 1) {
        message = GroupComponentMessage.create({ rotate1: degrees });
      } else if (img === 2) {
        message = GroupComponentMessage.create({ rotate2: degrees });
      } else {
        message = GroupComponentMessage.create({
          rotate1: degrees,
          rotate2: degrees,
        });
      }
      let buffer = GroupComponentMessage.encode(message).finish();
      super.sendPrimitive(buffer);
    }
  }

  semidirectDiffs(
    dDegrees: number,
    X1: number,
    Y1: number,
    X2: number,
    Y2: number
  ) {
    let toRadians = (degrees: number) => {
      return degrees * (Math.PI / 180);
    };

    let cos = Math.cos(toRadians(dDegrees));
    let sin = Math.sin(toRadians(dDegrees));
    let newX1 = X1 * cos - Y1 * sin;
    let newY1 = X1 * sin + Y1 * cos;
    let newX2 = X2 * cos - Y2 * sin;
    let newY2 = X2 * sin + Y2 * cos;
    return [newX1, newX2, newY1, newY2];
  }

  protected receivePrimitive(message: Uint8Array, meta: collabs.MessageMeta) {
    let decoded = GroupComponentMessage.decode(message);

    this.state.rotate1 += decoded.rotate1;
    this.state.rotate2 += decoded.rotate2;

    // Check for group rotation
    if (decoded.rotate1 === decoded.rotate2) {
      if (decoded.rotate1 < 0) {
        [this.state.X1, this.state.X2, this.state.Y1, this.state.Y2] =
          this.semidirectDiffs(
            decoded.rotate1,
            this.state.X1,
            this.state.Y1,
            this.state.X2,
            this.state.Y2
          );
      } else {
        [this.state.X1, this.state.X2, this.state.Y1, this.state.Y2] =
          this.semidirectDiffs(
            decoded.rotate1 - 360,
            this.state.X1,
            this.state.Y1,
            this.state.X2,
            this.state.Y2
          );
      }
    }

    this.emit("Rotate", {
      meta,
      rotated1: decoded.rotate1,
      rotated2: decoded.rotate2,
    });
  }

  canGC() {
    return this.state.rotate1 === 0 && this.state.rotate2 === 0;
  }

  save(): Uint8Array {
    let message = GroupComponentMessage.create({
      rotate1: this.state.rotate1,
      rotate2: this.state.rotate2,
    });
    return GroupComponentMessage.encode(message).finish();
  }

  load(saveData: collabs.Optional<Uint8Array>) {
    if (!saveData.isPresent) return;
    this.state.rotate1 = GroupComponentMessage.decode(saveData.get()).rotate1;
    this.state.rotate2 = GroupComponentMessage.decode(saveData.get()).rotate2;
  }
}

export class ReflectXComponent extends collabs.CPrimitive<GroupEventsRecord> {
  readonly state: GroupState;

  constructor(init: collabs.InitToken, initialState: GroupState) {
    super(init);
    this.state = initialState;
  }

  reflect(img: number) {
    var message;
    if (img === 1) {
      message = GroupComponentMessage.create({ reflectX1: -1, reflectX2: 1 });
    } else if (img === 2) {
      message = GroupComponentMessage.create({ reflectX1: 1, reflectX2: -1 });
    } else {
      message = GroupComponentMessage.create({ reflectX1: -1, reflectX2: -1 });
    }
    let buffer = GroupComponentMessage.encode(message).finish();
    super.sendPrimitive(buffer);
  }

  protected receivePrimitive(message: Uint8Array, meta: collabs.MessageMeta) {
    let decoded = GroupComponentMessage.decode(message);
    this.state.reflectX1 *= decoded.reflectX1;
    this.state.reflectX2 *= decoded.reflectX2;
    // Check for group reflection
    if (decoded.reflectX1 === -1 && decoded.reflectX2 === -1) {
      this.state.rotate1 *= -1;
      this.state.rotate2 *= -1;
      this.state.Y1 *= -1;
      this.state.Y2 *= -1;
    }

    this.emit("ReflectX", {
      meta,
      reflect1: decoded.reflectX1,
      reflect2: decoded.reflectX2,
    });
  }

  canGC() {
    return this.state.reflectX1 === 1;
  }

  save(): Uint8Array {
    let message = GroupComponentMessage.create({
      reflectX1: this.state.reflectX1,
    });
    return GroupComponentMessage.encode(message).finish();
  }

  load(saveData: collabs.Optional<Uint8Array>) {
    if (!saveData.isPresent) return;
    this.state.reflectX1 = GroupComponentMessage.decode(
      saveData.get()
    ).reflectX1;
  }
}

export class ReflectYComponent extends collabs.CPrimitive<GroupEventsRecord> {
  readonly state: GroupState;

  constructor(init: collabs.InitToken, initialState: GroupState) {
    super(init);
    this.state = initialState;
  }

  reflect(img: number) {
    var message;
    if (img === 1) {
      message = GroupComponentMessage.create({ reflectY1: -1, reflectY2: 1 });
    } else if (img === 2) {
      message = GroupComponentMessage.create({ reflectY1: 1, reflectY2: -1 });
    } else {
      message = GroupComponentMessage.create({ reflectY1: -1, reflectY2: -1 });
    }
    let buffer = GroupComponentMessage.encode(message).finish();
    super.sendPrimitive(buffer);
  }

  protected receivePrimitive(message: Uint8Array, meta: collabs.MessageMeta) {
    let decoded = GroupComponentMessage.decode(message);
    this.state.reflectY1 *= decoded.reflectY1;
    this.state.reflectY2 *= decoded.reflectY2;
    // Check for group reflection
    if (decoded.reflectY1 === -1 && decoded.reflectY2 === -1) {
      this.state.rotate1 *= -1;
      this.state.rotate2 *= -1;
      this.state.X1 *= -1;
      this.state.X2 *= -1;
    }

    this.emit("ReflectY", {
      meta,
      reflect1: decoded.reflectY1,
      reflect2: decoded.reflectY2,
    });
  }

  canGC() {
    return this.state.reflectY1 === 1 && this.state.reflectY2 === 1;
  }

  save(): Uint8Array {
    let message = GroupComponentMessage.create({
      reflectY1: this.state.reflectY1,
      reflectY2: this.state.reflectY2,
    });
    return GroupComponentMessage.encode(message).finish();
  }

  load(saveData: collabs.Optional<Uint8Array>) {
    if (!saveData.isPresent) return;
    this.state.reflectY1 = GroupComponentMessage.decode(
      saveData.get()
    ).reflectY1;
    this.state.reflectY2 = GroupComponentMessage.decode(
      saveData.get()
    ).reflectY2;
  }
}

export class GroupCRDT extends MultipleSemidirectProduct<
  GroupState,
  GroupEventsRecord
> {
  private translateCrdt: TranslateComponent;
  private rotateCrdt: RotateComponent;
  private reflectXCrdt: ReflectXComponent;
  private reflectYCrdt: ReflectYComponent;

  constructor(init: collabs.InitToken) {
    super(init, false);
    const state = new GroupState();
    super.setupState(state);
    this.translateCrdt = super.setupOneCRDT(
      (init) => new TranslateComponent(init, state)
    );
    this.rotateCrdt = super.setupOneCRDT(
      (init) => new RotateComponent(init, state)
    );
    this.reflectXCrdt = super.setupOneCRDT(
      (init) => new ReflectXComponent(init, state)
    );
    this.reflectYCrdt = super.setupOneCRDT(
      (init) => new ReflectYComponent(init, state)
    );

    this.translateCrdt.on("Translate", (event) =>
      super.emit("Translate", event)
    );
    this.rotateCrdt.on("Rotate", (event) => super.emit("Rotate", event));
    this.reflectXCrdt.on("ReflectX", (event) => super.emit("ReflectX", event));
    this.reflectYCrdt.on("ReflectY", (event) => super.emit("ReflectY", event));
  }

  // Want to "add on" m2's actions to m1. Start with m1 values and
  // add reflection or rotation as needed.
  protected action(
    m2MessagePath: Message[],
    _m2Meta: collabs.MessageMeta | null,
    m2Index: number,
    m1MessagePath: Message[],
    _m1Meta: collabs.MessageMeta | null
  ): { m1MessagePath: Message[] } | null {
    let m2Decoded = GroupComponentMessage.decode(<Uint8Array>m2MessagePath[0]);
    let m1Decoded = GroupComponentMessage.decode(<Uint8Array>m1MessagePath[0]);
    var XArg1: number = m1Decoded!.X1 || 0;
    var YArg1: number = m1Decoded!.Y1 || 0;
    var rotateArg1: number = m1Decoded!.rotate1 || 0;
    var reflectXArg1: number = m1Decoded!.reflectX1 || 1;
    var reflectYArg1: number = m1Decoded!.reflectY1 || 1;
    var XArg2: number = m1Decoded!.X2 || 0;
    var YArg2: number = m1Decoded!.Y2 || 0;
    var rotateArg2: number = m1Decoded!.rotate2 || 0;
    var reflectXArg2: number = m1Decoded!.reflectX2 || 1;
    var reflectYArg2: number = m1Decoded!.reflectY2 || 1;
    switch (m2Index) {
      case 3:
        reflectYArg1 *= m2Decoded.reflectY1;
        reflectYArg2 *= m2Decoded.reflectY2;
        // Check for group reflection
        if (m2Decoded.reflectY1 === -1 && m2Decoded.reflectY2 === -1) {
          rotateArg1 *= -1;
          rotateArg2 *= -1;
          XArg1 *= -1;
          XArg2 *= -1;
        }
        break;
      case 2:
        reflectXArg1 *= m2Decoded.reflectX1;
        reflectXArg2 *= m2Decoded.reflectX2;
        // Check for group reflection
        if (m2Decoded.reflectX1 === -1 && m2Decoded.reflectX2 === -1) {
          rotateArg1 *= -1;
          rotateArg2 *= -1;
          YArg1 *= -1;
          YArg2 *= -1;
        }
        break;
      case 1:
        rotateArg1 += m2Decoded.rotate1;
        rotateArg2 += m2Decoded.rotate2;
        // Check for group rotation
        if (m2Decoded.rotate1 === m2Decoded.rotate2) {
          if (m2Decoded.rotate1 < 0) {
            [XArg1, XArg2, YArg1, YArg2] = this.rotateCrdt.semidirectDiffs(
              m2Decoded.rotate1,
              XArg1,
              YArg1,
              XArg2,
              YArg2
            );
          } else {
            [XArg1, XArg2, YArg1, YArg2] = this.rotateCrdt.semidirectDiffs(
              m2Decoded.rotate1 - 360,
              XArg1,
              YArg1,
              XArg2,
              YArg2
            );
          }
        }
        break;
      default:
        XArg1 += m1Decoded.X1;
        YArg1 += m1Decoded.Y1;
        XArg2 += m1Decoded.X2;
        YArg2 += m1Decoded.Y2;
    }
    let acted = GroupComponentMessage.create({
      X1: XArg1,
      Y1: YArg1,
      rotate1: rotateArg1,
      reflectX1: reflectXArg1,
      reflectY1: reflectYArg1,
      X2: XArg2,
      Y2: YArg2,
      rotate2: rotateArg2,
      reflectX2: reflectXArg2,
      reflectY2: reflectYArg2,
    });

    return {
      m1MessagePath: [GroupComponentMessage.encode(acted).finish()],
    };
  }

  translate(X: number, Y: number, img: number) {
    this.translateCrdt.translate(X, Y, img);
  }

  rotate(degrees: number, img: number) {
    this.rotateCrdt.rotate(degrees, img);
  }

  reflectX(img: number) {
    this.reflectXCrdt.reflect(img);
  }

  reflectY(img: number) {
    this.reflectYCrdt.reflect(img);
  }

  getState() {
    return this.state.internalState;
  }
}
