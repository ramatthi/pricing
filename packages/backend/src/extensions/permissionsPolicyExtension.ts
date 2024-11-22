import { createBackendModule } from '@backstage/backend-plugin-api';
import {
  PolicyDecision,
  AuthorizeResult,
} from '@backstage/plugin-permission-common';
import {
  PermissionPolicy,
  PolicyQuery,
  PolicyQueryUser,
} from '@backstage/plugin-permission-node';
import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha';
import type { Entity } from '@backstage/catalog-model';
import {
  catalogConditions,
  createCatalogConditionalDecision,
  createCatalogPermissionRule,
} from '@backstage/plugin-catalog-backend/alpha';  
import { createConditionFactory } from '@backstage/plugin-permission-node';
import { isResourcePermission } from '@backstage/plugin-permission-common';
import { z } from 'zod';

// Explicitly import and reference types from '@backstage/plugin-catalog-backend'
import { CatalogPermissionRule } from '@backstage/plugin-catalog-backend/alpha';

// Explicitly typing 'isInSystemRule' with the 'CatalogPermissionRule' type
export const isInSystemRule: CatalogPermissionRule<{ systemRef: string }> = createCatalogPermissionRule<{
  systemRef: string;
}>({
  name: 'IS_IN_SYSTEM',
  description: 'Checks if an entity is part of the system provided',
  resourceType: 'catalog-entity',
  paramsSchema: z.object({
    systemRef: z
      .string()
      .describe('SystemRef to check the resource is part of'),
  }),
  apply: (resource: Entity, { systemRef }) => {
    if (!resource.relations) {
      return false;
    }

    return resource.relations
      .filter(relation => relation.type === 'partOf')
      .some(relation => relation.targetRef === systemRef);
  },
  toQuery: ({ systemRef }) => ({
    key: 'relations.partOf',
    values: [systemRef],
  }),
});

// Use createConditionFactory to work with your custom rule
const isInSystem = createConditionFactory(isInSystemRule);

class CustomPermissionPolicy implements PermissionPolicy {
  async handle(
    request: PolicyQuery,
    user?: PolicyQueryUser,
  ): Promise<PolicyDecision> {
    if (isResourcePermission(request.permission, 'catalog-entity')) {
      return createCatalogConditionalDecision(
        request.permission,
        {
          anyOf: [
            catalogConditions.isEntityOwner({
              claims: user?.info.ownershipEntityRefs ?? [],
            }),
            isInSystem({ systemRef: 'interviewing' }),  // Use the factory here
          ],
        },
      );
    }

    return { result: AuthorizeResult.ALLOW };
  }
}

export default createBackendModule({
  pluginId: 'permission',
  moduleId: 'permission-policy',
  register(reg) {
    reg.registerInit({
      deps: { policy: policyExtensionPoint },
      async init({ policy }) {
        policy.setPolicy(new CustomPermissionPolicy());
      },
    });
  },
});
