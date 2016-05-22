'use babel';

import {exec} from 'child_process';
import os from 'os';

const debug = atom.config.get('build-innosetup.debug');

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
            if (debug === true) console.log('[build-innosetup] ISCC.exe is not in your PATH environment variable');
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
        // 'Error on line (?<line>\\d+) in (?<file>.*\\.iss): (?<message>.+)\\r?\\nCompile aborted\\.'
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
