/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { IRouter } from '@kbn/core/server';
import { ResourceTypes } from '@kbn/product-doc-common';
import { UNINSTALL_ALL_API_PATH } from '../../common/http_api/installation';
import { registerInstallationRoutes } from './installation';

describe('uninstall route inference ID validation', () => {
  const router = { get: jest.fn(), post: jest.fn() } as unknown as IRouter;
  registerInstallationRoutes({
    router,
    getServices: () => {
      throw new Error('Services should not be needed for schema validation');
    },
  });

  const uninstallRoute = (router.post as jest.Mock).mock.calls.find(
    ([config]) => config.path === UNINSTALL_ALL_API_PATH
  )[0];
  const validateBody = (body: Record<string, string>) =>
    uninstallRoute.validate.body.validate(body);

  it('accepts the default inference ID', () => {
    expect(() => validateBody({ resourceType: ResourceTypes.securityLabs })).not.toThrow();
  });

  it.each(['my-endpoint', '.my-endpoint', '_my.endpoint-2'])(
    'accepts concrete inference ID %s',
    (inferenceId) => {
      expect(() =>
        validateBody({ inferenceId, resourceType: ResourceTypes.securityLabs })
      ).not.toThrow();
    }
  );

  it.each(['x,*', 'x,other-index', 'x,?', 'x*', 'x?', 'x%2C*', 'x\n', ''])(
    'rejects index expressions in inference ID %s',
    (inferenceId) => {
      expect(() =>
        validateBody({ inferenceId, resourceType: ResourceTypes.securityLabs })
      ).toThrow();
    }
  );
});
