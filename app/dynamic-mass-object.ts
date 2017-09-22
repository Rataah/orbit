import { Vector } from './vector';

export class DynamicMassObject {
    mass: number;
    radius: number;
    _drawRadius: number;
    position: Vector;
    acceleration: Vector;
    color: string = 'red';

    lastPositions = Array<Vector>();

    constructor(public name: string) {}

    drawRadius(pixelMeter) {
        if(this._drawRadius == null) { 
            this._drawRadius = Math.max(2, this.radius / pixelMeter);
        }
        return this._drawRadius;
    }

    next(speed: number, keepPosition = false) {
        if(keepPosition) { this.lastPositions.push(this.position.clone()); }
        this.position.x = this.position.x + this.acceleration.x * speed;
        this.position.y = this.position.y + this.acceleration.y * speed;

        if(this.lastPositions.length > 15) {
            this.lastPositions.splice(0, 1);
        }
    }

    draw(context: CanvasRenderingContext2D, offsetX: number, offsetY: number, pixelMeter: number): void {

        if(this.lastPositions.length > 0) {
            context.beginPath();
            context.strokeStyle = this.color;
            context.lineWidth = 1;
            context.moveTo(offsetX + this.lastPositions[0].x / pixelMeter, offsetY + this.lastPositions[0].y / pixelMeter);
            for(let lastPosition of this.lastPositions) {
                context.lineTo(
                    offsetX + lastPosition.x / pixelMeter,
                    offsetY + lastPosition.y / pixelMeter,
                );
            }
            context.stroke();
        }
        
        context.beginPath();
        context.fillStyle = this.color;
        context.lineWidth = 1;
        context.arc(
            offsetX + this.position.x / pixelMeter,
            offsetY + this.position.y / pixelMeter,
            this.drawRadius(pixelMeter),
            0,
            2*Math.PI
        );        
        context.fill();

        context.strokeText(
            this.name,
            10 + offsetX + this.position.x / pixelMeter,
            10 + offsetY + this.position.y / pixelMeter
        )
    }
}