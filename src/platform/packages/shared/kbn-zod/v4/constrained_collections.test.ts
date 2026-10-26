/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { z } from 'zod/v4';

describe('size-constrained collections', () => {
  it('rejects oversized arrays, sets, and maps before parsing their elements', () => {
    const parseElement = jest.fn(() => true);
    const element = z.number().refine(parseElement);
    const cases = [
      [z.array(element).max(1), [1, 2]],
      [z.set(element).max(1), new Set([1, 2])],
      [
        z.map(element, element).max(1),
        new Map([
          [1, 1],
          [2, 2],
        ]),
      ],
    ] as const;

    for (const [schema, input] of cases) {
      expect(schema.safeParse(input)).toMatchObject({
        success: false,
        error: { issues: [{ code: 'too_big' }] },
      });
      expect(parseElement).not.toHaveBeenCalled();
    }
  });
});
