import {
  AccessibilityIssueSchema,
  AnalysisResultSchema,
  CombinedAnalysisResultSchema
} from './accessibility.js';
import {
  AxeToolInputSchema,
  Pa11yToolInputSchema,
  ESLintA11yToolInputSchema,
  CombinedAnalysisInputSchema
} from './tool-inputs.js';
import { createInputValidator, createOutputValidator } from './validation.js';

export const axeInputValidator = createInputValidator(AxeToolInputSchema);
export const pa11yInputValidator = createInputValidator(Pa11yToolInputSchema);
export const eslintInputValidator = createInputValidator(ESLintA11yToolInputSchema);
export const combinedInputValidator = createInputValidator(CombinedAnalysisInputSchema);

export const issueOutputValidator = createOutputValidator(AccessibilityIssueSchema);
export const resultOutputValidator = createOutputValidator(AnalysisResultSchema);
export const combinedResultOutputValidator = createOutputValidator(CombinedAnalysisResultSchema);

export {
  AxeToolInputSchema,
  Pa11yToolInputSchema,
  ESLintA11yToolInputSchema,
  CombinedAnalysisInputSchema,
  AccessibilityIssueSchema,
  AnalysisResultSchema,
  CombinedAnalysisResultSchema
};
