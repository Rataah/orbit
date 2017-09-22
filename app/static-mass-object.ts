import { Vector } from './vector';

export class StaticMassObject {
    mass: number;
    radius: number;
    position: Vector;

    draw(context: CanvasRenderingContext2D, offsetX: number, offsetY: number, pixelMeter: number): void {
        context.beginPath();
        context.fillStyle = 'green';
        context.lineWidth = 5;
        context.arc(
            offsetX + this.position.x / pixelMeter,
            offsetY + this.position.y / pixelMeter,
            this.radius / pixelMeter,
            0,
            2*Math.PI
        );
        context.fill();
    }
}