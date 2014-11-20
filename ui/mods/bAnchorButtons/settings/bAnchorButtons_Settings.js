(function () {
    _.extend(api.settings.definitions.ui.settings, {
        bAnchorButtonsRightSideFunction: {
            title: 'Right side function',
            type: 'select',
            default: 'ALL',
            options: ['OFF','UNIT GROUPS','NORTH','POLE LOCK','ALL']
        },
        bAnchorButtonsCameraAmount: {
            title: 'Camera Anchor Buttons',
            type: 'slider',
            options:{
                min:1,
                max:10,
                step:1
            },
            default: 4
        },
        bAnchorButtonsUnitAmount: {
            title: 'Unit Anchor Buttons',
            type: 'slider',
            options:{
                min:1,
                max:10,
                step:1
            },
            default: 4
        }
      });

      $(".option-list.ui .form-group").append(
          $.ajax({
              type: "GET",
              url: 'coui://ui/mods/bAnchorButtons/settings/bAnchorButtons_ui_settings.html',
              async: false
          }).responseText
      );

      model.anchorbuttonsLocked = ko.observable(localStorage.frames_bAnchorButtons_info_frame_lockStatus ? decode(localStorage.frames_bAnchorButtons_info_frame_lockStatus) : false);

      model.anchorbuttonslocktoggle = function(){

        if(model.anchorbuttonsLocked()){
          console.log('unlocking anchorbuttons');
          unlockFrame('bAnchorButtons_info_frame');
          model.anchorbuttonsLocked(false);
        }
        else{
          console.log('locking anchorbuttons');
          lockFrame('bAnchorButtons_info_frame');
          model.anchorbuttonsLocked(true);
        }
      };

      model.anchorbuttonsLockstate = ko.computed(function () {
            if(model.anchorbuttonsLocked()){
              return 'UNLOCK ANCHORBUTTONS';
            }
            else{
              return 'LOCK ANCHORBUTTONS';
            }
      },true);


      console.log("bAnchorButtons Settings loaded");
})();
