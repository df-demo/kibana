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

jest.mock('@kbn/get-repo-files');

describe('getAllJestPaths', () => {
  it('classifies tests using glob matchers and keeps Jest configs separate', async () => {
    jest
      .mocked(getRepoFiles)
      .mockResolvedValue([
        new RepoPath('/repo', 'pkg/a.test.ts'),
        new RepoPath('/repo', 'pkg/b.ts'),
        new RepoPath('/repo', 'pkg/jest.config.js'),
      ]);

    expect(await getAllJestPaths()).toEqual({
      tests: new Set(['/repo/pkg/a.test.ts']),
      configs: new Set(['/repo/pkg/jest.config.js']),
    });
  });
});
