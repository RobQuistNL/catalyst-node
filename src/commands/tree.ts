import {Command} from '@oclif/command'
import * as fs from 'fs';

export default class Tree extends Command {
  static description = 'List the contents of the current project';

  static examples = [
    `$ catalyst tree`,
  ];

  async run() {
    const {args, flags} = this.parse(Tree);
    const self = this;
    let projectFile = undefined;
      fs.readdirSync('.').forEach(function(filename) {
        if (filename.indexOf('.yyp') >= 0) {
            if (projectFile !== undefined) {
              self.warn('Multiple project files (.yyp) found in this directory! Using ['+projectFile+']');
            } else {
                projectFile = filename;
            }
        }
      });

      if (projectFile === undefined) {
        self.error('No project file (.yyp) found in this directory.', {exit: 2});
      }

      self.log('Using project file: ' + projectFile);
  }
}
