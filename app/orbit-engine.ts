import { Vector} from './vector';
import { StaticMassObject } from './static-mass-object';
import { DynamicMassObject } from './dynamic-mass-object';

export class OrbitEngine {
    readonly G = 6.6742e-11;
    public dynamics: Array<DynamicMassObject>;
    public statics: Array<StaticMassObject>;

    constructor(private speed: number= 1) { 
        this.dynamics = [];
        this.statics = [];
    }

    apply_gravity(staticMassObject: StaticMassObject, dynamicMassObject: DynamicMassObject) {
        let gravity = this.G * staticMassObject.mass / staticMassObject.position.distance(dynamicMassObject.position);
        let force = staticMassObject.position
                        .clone()
                        .minus(dynamicMassObject.position)
                        .normalize()
                        .multiply(gravity * this.speed);
        dynamicMassObject.acceleration = this.resultant(dynamicMassObject.acceleration, force);
    }

    resultant(...forces: Array<Vector>): Vector {
        return forces.reduce((result, vector) => {
            result.x += vector.x;
            result.y += vector.y;
            return result;
        })
    }

    next(loopCounter) {
        for(let dynamicMassObject of this.dynamics) {
            for(let staticMassObject of this.statics) {
                this.apply_gravity(staticMassObject, dynamicMassObject);
            }
            for(let otherDynamicMassObject of this.dynamics) {
                if(dynamicMassObject != otherDynamicMassObject) {
                    this.apply_gravity(otherDynamicMassObject, dynamicMassObject);
                }
            }
            dynamicMassObject.next(this.speed, loopCounter % 10 == 0);
        }
    }

    draw(text, canvasOffsetX, canvasOffsetY, pixelMeter) {
        for(let dynamicMassObject of this.dynamics) {
            dynamicMassObject.draw(text, canvasOffsetX, canvasOffsetY, pixelMeter);
        }
        for(let staticMassObject of this.statics) {
            staticMassObject.draw(text, canvasOffsetX, canvasOffsetY, pixelMeter);
        }
    }
}