/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

/** Require a concrete index-name suffix for inference IDs used to create or delete indices. */
export const validateIndexInferenceId = (inferenceId?: string): string | undefined => {
  if (inferenceId !== undefined && (inferenceId.length === 0 || /[^a-zA-Z0-9._-]/.test(inferenceId))) {
    return 'Inference ID must contain only letters, digits, dots, underscores or hyphens';
  }
};

export const assertValidIndexInferenceId = (inferenceId?: string): void => {
  const error = validateIndexInferenceId(inferenceId);
  if (error) {
    throw new Error(error);
  }
};
