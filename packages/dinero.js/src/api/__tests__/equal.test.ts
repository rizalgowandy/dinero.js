import { EUR, USD } from '@dinero.js/currencies';
import Big from 'big.js';

import { equal } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('equal', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    it('returns true when amounts and currencies are equal', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 500, currency: USD });

      expect(equal(d1, d2)).toBe(true);
    });
    it('returns false when amounts are not equal', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 800, currency: USD });

      expect(equal(d1, d2)).toBe(false);
    });
    it('returns false when currencies are not equal', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 500, currency: EUR });

      expect(equal(d1, d2)).toBe(false);
    });
    it('returns false when amounts and currencies are not equal', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 800, currency: EUR });

      expect(equal(d1, d2)).toBe(false);
    });
    it('returns true when amounts are equal after normalization', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 5000, currency: USD, scale: 3 });

      expect(equal(d1, d2)).toBe(true);
    });
    it('returns false when amounts are not equal after normalization', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 500, currency: USD, scale: 3 });

      expect(equal(d1, d2)).toBe(false);
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);

    it('returns true when amounts and currencies are equal', () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 500n, currency: bigintUSD });

      expect(equal(d1, d2)).toBe(true);
    });
    it('returns false when amounts are not equal', () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 800n, currency: bigintUSD });

      expect(equal(d1, d2)).toBe(false);
    });
    it('returns false when currencies are not equal', () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 500n, currency: bigintEUR });

      expect(equal(d1, d2)).toBe(false);
    });
    it('returns false when amounts and currencies are not equal', () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 800n, currency: bigintEUR });

      expect(equal(d1, d2)).toBe(false);
    });
    it('returns true when amounts are equal after normalization', () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 5000n, currency: bigintUSD, scale: 3n });

      expect(equal(d1, d2)).toBe(true);
    });
    it('returns false when amounts are not equal after normalization', () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 500n, currency: bigintUSD, scale: 3n });

      expect(equal(d1, d2)).toBe(false);
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);

    it('returns true when amounts and currencies are equal', () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(500), currency: bigjsUSD });

      expect(equal(d1, d2)).toBe(true);
    });
    it('returns false when amounts are not equal', () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(800), currency: bigjsUSD });

      expect(equal(d1, d2)).toBe(false);
    });
    it('returns false when currencies are not equal', () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(500), currency: bigjsEUR });

      expect(equal(d1, d2)).toBe(false);
    });
    it('returns false when amounts and currencies are not equal', () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(800), currency: bigjsEUR });

      expect(equal(d1, d2)).toBe(false);
    });
    it('returns true when amounts are equal after normalization', () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({
        amount: new Big(5000),
        currency: bigjsUSD,
        scale: new Big(3),
      });

      expect(equal(d1, d2)).toBe(true);
    });
    it('returns false when amounts are not equal after normalization', () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({
        amount: new Big(500),
        currency: bigjsUSD,
        scale: new Big(3),
      });

      expect(equal(d1, d2)).toBe(false);
    });
  });
});
