/* eslint-disable no-unused-vars */
import type { logStep as logStepType } from './src/utils/common/allureUtility';

declare global {
    var logStep: typeof logStepType;
}

export {};
