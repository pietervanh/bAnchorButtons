module.exports = function(grunt) {
  var target = grunt.option('target') || 'bAnchorButtons_dev';
  var title = 'Anchor Buttons Test';
  if (target == 'bAnchorButtons') {
    title = 'Anchor Buttons';
  }

  // Project configuration.
  grunt.initConfig({
    target: target,
    clean: {
      options: { force: true },
      src: ['../<%= target %>/*/*/*/*','../<%= target %>/*/*/*','../<%= target %>/*/*','../<%= target %>/*']
    },
    jshint: {
      files:['Gruntfile.js','ui/mods/bAnchorButtons/global_mod_list/*.js','ui/mods/bAnchorButtons/live_game/*.js','ui/mods/bAnchorButtons/settings/*.js'],
      options: {
        globals: {
          jquery: true,
          devel: true,
          debug: true,
          expr:true
        }
      }
    },
    copy: {
      simple: {
        files: [
          {
            src: [
              'ui/mods/bAnchorButtons/**/*.js',
              'ui/mods/bAnchorButtons/**/*.css',
              'ui/mods/bAnchorButtons/**/*.html'],
            dest: '../<%= target %>/',
          },
        ],
      },
      modinfo: {
        files: [
          {
            src: 'modinfo.json',
            dest: '../<%= target %>/modinfo.json',
          },
        ],
        options: {
          process: function(content, srcpath) {
            var info = JSON.parse(content);
            info.date = require('dateformat')(new Date(), 'yyyy/mm/dd');
            info.display_name = title;
            info.identifier = "com.pa.burntcustard.bAnchorButtons" + target;
            console.log(info.version, info.date);
            return JSON.stringify(info, null, 2);
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('default', ['jshint','clean','copy:simple', 'copy:modinfo']);
  grunt.registerTask('release', ['jshint','clean','copy:simple', 'copy:modinfo']);

  //grunt.registerTask('deploy',['compress:main']);

};
