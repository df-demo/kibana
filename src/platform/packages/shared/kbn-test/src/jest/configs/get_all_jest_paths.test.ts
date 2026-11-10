/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { getRepoFiles } from '@kbn/get-repo-files';
import { RepoPath } from '@kbn/repo-path';

import { getAllJestPaths } from './get_all_jest_paths';

jest.mock('@kbn/get-repo-files', () => ({ getRepoFiles: jest.fn() }));

it('classifies test files without treating hidden paths as Jest tests', async () => {
  const root = process.cwd();
  jest
    .mocked(getRepoFiles)
    .mockResolvedValue(
      ['src/foo.test.ts', 'src/.hidden.test.ts', 'src/jest.config.js'].map(
        (rel) => new RepoPath(root, rel)
      )
    );

  expect(await getAllJestPaths()).toEqual({
    tests: new Set([new RepoPath(root, 'src/foo.test.ts').abs]),
    configs: new Set([new RepoPath(root, 'src/jest.config.js').abs]),
  });
});
