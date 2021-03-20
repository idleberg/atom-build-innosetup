import { configSchema, getConfig } from './config';
import { platform } from 'os';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import { spawnSync } from 'child_process';

// Package settings
import meta from '../package.json';

export { configSchema as config };

export function provideBuilder() {
  return class InnoProvider {
    constructor(cwd) {
      this.cwd = cwd;
    }

    getNiceName() {
      return 'Inno Setup';
    }

    isEligible() {
      if (getConfig('alwaysEligible') === true) {
        return true;
      }

      if (platform() !== 'win32') {
        return false;
      }

      const cmd = spawnSync('where', ['ISCC.exe']);
      if (!cmd.stdout.toString()) {
        return false;
      }

      return true;
    }

    settings() {
      const errorMatch = [
        'Error on line (?<line>\\d+) in (?<file>.*\\.iss): (?<message>.+)\\r?\\nCompile aborted\\.'
      ];

      return [
        {
          name: 'Inno Setup',
          exec: 'ISCC.exe',
          args: [ '/Q', '{FILE_ACTIVE}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'alt-cmd-b',
          atomCommandName: 'inno-setup:compile',
          errorMatch: errorMatch
        }
      ];
    }
  };
}

// This package depends on build, make sure it's installed
export function activate() {
  if (getConfig('manageDependencies') === true) {
    satisfyDependencies(meta.name);
  }
}
