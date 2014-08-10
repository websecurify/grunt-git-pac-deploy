/*
 * grunt-git-pac-deploy
 * https://github.com/websecurify/grunt-git-pac-deploy
 *
 * Copyright (c) 2014 Websecurify
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('git_pac_deploy', 'Grunt plugin to pac and deploy application via git.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      folder: 'build',
      url: '',
      branch: ''
    });
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-git-deploy');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.config.set('exec.git_pac_deploy_pac.cmd', __dirname + '/../node_modules/pac/bin/pac');
    grunt.config.set('copy.git_pac_deploy_package.files', [{expand: true, src: ['package.json'], dest: options.folder, filter: 'isFile'}]);
    grunt.config.set('copy.git_pac_deploy_modules.files', [{expand: true, src: ['.modules/*.tgz'], dest: options.folder, filter: 'isFile'}]);
    grunt.config.set('git_deploy.git_pac_deploy_live.src', options.folder);
    grunt.config.set('git_deploy.git_pac_deploy_live.options.url', options.url);
    grunt.config.set('git_deploy.git_pac_deploy_live.options.branch', options.branch);
    grunt.registerTask('git_pac_deploy_all', ['exec:git_pac_deploy_pac', 'copy:git_pac_deploy_package', 'copy:git_pac_deploy_modules', 'git_deploy:git_pac_deploy_live']);
    grunt.task.run('git_pac_deploy_all');
  });

};
