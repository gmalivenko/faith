import Vector2 from '../../common/Vector2';
import Order from './Order';
import Universe from '../Universe';
import NavigationHelper from '../NavigationHelper';
import Ship from '../entities/Ship';

export default class FlyToDestinationOrder extends Order {
  private delta: Vector2 = new Vector2();
  private target: Vector2;

  constructor(target: Vector2) {
    super();
    this.target = target;
  }

  action(deltaTime: number, universe: Universe, ship: Ship): boolean {
    if (ship.pos.isNearVector(this.target, 10)) {
      return false;
    }

    this.delta.setVector(this.target)
      .subVector(ship.pos)
      .normalize()
      .mulScalar(ship.speed * deltaTime);
    ship.pos.addVector(this.delta);

    return true;
  }
}