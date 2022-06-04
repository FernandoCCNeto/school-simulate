import Warehouse from './warehouse';
import { v4 as uuid } from 'uuid';

describe('Warehouse entity', () => {
  describe('getTotalCost', () => {
    it('should return the total cost', () => {
      const warehouse = new Warehouse(uuid(), 'Pen', 12, 12.42, 'Color blue');

      expect(warehouse.getTotalCost()).toBe(12 * 12.42);
    });
  });
});
