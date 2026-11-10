/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import Path from 'path';

import { collectConfigPaths } from './collect_config_paths';

it('matches benchmark config files with relative and absolute glob patterns', async () => {
  const cwd = process.cwd();
  const file = Path.join(
    cwd,
    'src/platform/packages/shared/kbn-bench/examples/benchmark.config.ts'
  );

  expect(
    await collectConfigPaths({
      cwd,
      patterns: ['src/platform/packages/shared/kbn-bench/examples/*.config.ts'],
    })
  ).toEqual([file]);
  expect(await collectConfigPaths({ cwd, patterns: [file] })).toEqual([file]);
  expect(await collectConfigPaths({ cwd, patterns: ['other/*.config.ts'] })).toEqual([]);
});
