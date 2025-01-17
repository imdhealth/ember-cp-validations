/* eslint-env node */

var execSync = require('child_process').execSync;
// eslint-disable-next-line node/no-unpublished-require

module.exports = {
  publish: true,

  afterPublish: function(project, versions) {
    runCommand(
      'ember github-pages:commit --message "Released ' + versions.next + '"'
    );
    runCommand('git push origin gh-pages:gh-pages');
  }
};

function runCommand(command) {
  // eslint-disable-next-line no-console
  console.log('running: ' + command);

  var output = execSync(command, { encoding: 'utf8' });

  // eslint-disable-next-line no-console
  console.log(output);
}
