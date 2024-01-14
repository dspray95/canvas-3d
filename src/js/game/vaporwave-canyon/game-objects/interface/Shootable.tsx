import Point from "../../../../engine/rendering/objects/primitives/Point";

export interface Shootable {
    isShot(point: Point): boolean;
}

export function isShootable(object: any): object is Shootable {
    return 'isShot' in object;
}