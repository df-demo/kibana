/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { Minimatch } from 'minimatch';

const includeGlobs = ['**/*.s+(a|c)ss'];
const includeMatchers = includeGlobs.map((glob) => new Minimatch(glob));

function matchesInclude(file) {
  return includeMatchers.some((matcher) => matcher.match(file.relativePath));
}

export function pickFilesToLint(log, files) {
  return files.filter((file) => file.isSass()).filter(matchesInclude);
}
