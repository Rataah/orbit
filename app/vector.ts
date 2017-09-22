export class Vector {
    constructor(public x: number, public y: number) { }

    clone(): Vector { 
        return new Vector(this.x, this.y);
    }

    multiply(amount: number) {
        this.x *= amount;
        this.y *= amount;
        return this;
    }

    minus(vector: Vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    distance(vector: Vector) {
        return Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2);
    }

    normalize() {
        let magnitude = Math.sqrt(Math.pow(Math.abs(this.x), 2) + Math.pow(Math.abs(this.y), 2));
        this.x /= magnitude;
        this.y /= magnitude;
        return this;
    }
}