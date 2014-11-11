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
                max:9,
                step:1
            },
            default: 4
        },
        bAnchorButtonsUnitAmount: {
            title: 'Unit Anchor Buttons',
            type: 'slider',
            options:{
                min:1,
                max:9,
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
      console.log("bAnchorButtons Settings loaded");
})();
