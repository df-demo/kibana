/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { pickFilesToLint } from './pick_files_to_lint';

it('selects Sass and SCSS paths using the glob matcher', () => {
  const files = [
    'styles/main.scss',
    'styles/theme.sass',
    'styles/main.css',
    '.hidden/main.scss',
  ].map((relativePath) => ({
    relativePath,
    isSass: () => relativePath.endsWith('.scss') || relativePath.endsWith('.sass'),
  }));

  expect(pickFilesToLint(null, files)).toEqual(files.slice(0, 2));
});
