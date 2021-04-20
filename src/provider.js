import { configSchema, getConfig } from './config';
import { platform } from 'os';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import Logger from './log';
import meta from '../package.json';
import which from 'which';

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
        Logger.log('Always eligible');
        return true;
      }

      if (platform() !== 'win32') {
        return false;
      }

      if (which.sync('ISCC.exe', { nothrow: true })) {
        Logger.log('Build provider is eligible');
        return true;
      }

      Logger.error('Build provider isn\'t eligible');
      return false;
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

export function activate() {
  Logger.log('Activating package');

  // This package depends on build, make sure it's installed
  if (getConfig('manageDependencies') === true) {
    satisfyDependencies(meta.name);
  }
}

export function deactivate() {
  Logger.log('Deactivating package');
}
