import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as budgets from 'aws-cdk-lib/aws-budgets';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const budget = new budgets.CfnBudget(this, 'cdk-monthly-10-usd-budget', {
      budget: {
        budgetType: 'COST',
        timeUnit: 'MONTHLY',

        budgetLimit: {
          amount: 10,
          unit: 'USD',
        },
        budgetName: 'cdk-monthly-10-usd-budget'
      },
      notificationsWithSubscribers: [{
        notification: {
          comparisonOperator: 'GREATER_THAN',
          notificationType: 'ACTUAL',
          threshold: 50,
          thresholdType: 'PERCENTAGE',
        },
        subscribers: [{
          address: 'test@example.com',
          subscriptionType: 'EMAIL',
        }],
      }]
    });
  }
}