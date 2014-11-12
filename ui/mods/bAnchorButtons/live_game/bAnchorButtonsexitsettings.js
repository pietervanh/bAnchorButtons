if(_.isFunction(handlers['settings.exit']))
{
    var bAnchorButtonsoldsettingsexit = handlers['settings.exit'];
    handlers['settings.exit'] = function(){
      //notify bAnchorButtons we came out of settings
      api.panels.LiveGame_FloatZone.message('settings.exit');
      bAnchorButtonsoldsettingsexit();
    };
}
