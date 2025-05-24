import * as ex from "excalibur";

const initialTrashSpeed = 200;
const initialTrashInterval = 1700;

export const Config = {
    TurtleStartPos: ex.vec(200, 300),
    TurtleAcceleration: 1000,
    TurtleJumpVelocity: -800,
    TurtleMinVelocity: -500,
    TurtleMaxVelocity: 500, 
    TrashSpeed: initialTrashSpeed,
    TrashInterval: initialTrashInterval,
    TrashSpeedInitial: initialTrashSpeed,
    TrashIntervalInitial: initialTrashInterval
};