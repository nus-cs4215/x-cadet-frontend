import { HighlightRulesSelector, ModeSelector } from 'x-slang/dist/editors/ace/modes/source';
import { Variant } from 'x-slang/dist/types';

import { Documentation } from '../documentation/Documentation';

/**
 * This _modifies global state_ and defines a new Ace mode globally, if it does not already exist.
 *
 * You can call this directly in render functions.
 */
export const selectMode = (variant: Variant, library: string) => {
  if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    typeof ace.define.modules[`ace/mode/${getModeString(variant, library)}`]?.Mode === 'function'
  ) {
    return;
  }

  HighlightRulesSelector(0, variant, library, Documentation.externalLibraries[library]);
  ModeSelector(0, variant, library);
};

export const getModeString = (variant: Variant, library: string) => `source${variant}${library}`;
