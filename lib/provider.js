'use babel';

import {exec} from 'child_process';
import os from 'os';

// Package settings
import meta from '../package.json';
const debug = atom.config.get(`${meta.name}.debug`);
const notEligible = `**${meta.name}**: \`ISCC.exe\` is not in your PATH`;

// This package depends on build, make sure it's installed
require('atom-package-deps').install(meta.name);

export function provideBuilder() {
  return class InnoProvider {
    constructor(cwd) {
      this.cwd = cwd;
    }

    getNiceName() {
      return 'Inno Setup';
    }

    isEligible() {
      if (os.platform() === 'win32') {
        exec('ISCC.exe /?', function (error, stdout, stderr) {
          if (error !== null) {
            // No ISCC installed
            if (debug === true) atom.notifications.addError(notEligible, { detail: error, dismissable: true });
            return false;
          }
        });
        return true;
      }
      // not on Windows, sorry
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
