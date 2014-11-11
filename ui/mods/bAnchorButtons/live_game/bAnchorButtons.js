// Code needs reworking to fit "bCameraAnchorButtons" type style better
console.log("Initializing Anchor Buttons");
//forgetFramePosition('bAnchorButtons_info_frame');

model.bAnchorButtons_cameraAnchors = ko.observableArray([ko.observable(false), ko.observable(false), ko.observable(false), ko.observable(false), ko.observable(false), ko.observable(false), ko.observable(false), ko.observable(false), ko.observable(false)]);
var original_api_camera_captureAnchor = api.camera.captureAnchor;

api.camera.captureAnchor = function (anchorIndex) {
  if(anchorIndex < model.bAnchorButtons_cameraAnchors().length) {
    model.bAnchorButtons_cameraAnchors()[anchorIndex](true);
  }
  original_api_camera_captureAnchor(anchorIndex);
};

function bAnchorButtons_cameraAnchor_button_active(anchorIndex) {
  return model.bAnchorButtons_cameraAnchors()[anchorIndex]() ? "anchor_active" : "";
}

model.bAnchorButtons_unitAnchors = ko.observableArray([ko.observable(false), ko.observable(false), ko.observable(false), ko.observable(false), ko.observable(false), ko.observable(false), ko.observable(false), ko.observable(false), ko.observable(false)]);

var original_api_select_captureGroup = api.select.captureGroup;

api.select.captureGroup = function (anchorIndex) {
  if(anchorIndex < model.bAnchorButtons_unitAnchors().length) {
    model.bAnchorButtons_unitAnchors()[anchorIndex](true);
  }
  original_api_select_captureGroup(anchorIndex);
};

function bAnchorButtons_unitAnchor_button_active(anchorIndex) {
  return model.bAnchorButtons_unitAnchors()[anchorIndex]() ? "anchor_active" : "";
}

model.bCameraAnchorButtonsAmount = ko.observable(api.settings.isSet('ui','bAnchorButtonsCameraAmount',true) || 4);
model.bUnitAnchorButtonsAmount = ko.observable(api.settings.isSet('ui','bAnchorButtonsUnitAmount',true) || 4);
model.bRightAnchorButtons = ko.observable(api.settings.isSet('ui','bAnchorButtonsRightSideFunction',true) || 'NORTH');

handlers['settings.exit'] = function(){
  console.log("Settings Closed Reload Anchorbuttons");
  model.bCameraAnchorButtonsAmount(api.settings.isSet('ui','bAnchorButtonsCameraAmount',true) || 4);
  model.bUnitAnchorButtonsAmount(api.settings.isSet('ui','bAnchorButtonsUnitAmount',true) || 4);
  model.bRightAnchorButtons(api.settings.isSet('ui','bAnchorButtonsRightSideFunction',true) || 'NORTH');
};

model.bCameraAnchorButtonsVisible = ko.computed(function () {
  if (model.bCameraAnchorButtonsAmount() > 0) {
    model.bCameraAnchorButtonsArr = ko.observableArray([]);
    for (var i = 0; i < model.bCameraAnchorButtonsAmount(); i++)	{
      model.bCameraAnchorButtonsArr().push(i+1);
    }
    return true;
  }
  else {
    model.bCameraAnchorButtonsArr = ko.observableArray([]);
    return false;
  }
});

model.bUnitAnchorButtonsVisible = ko.computed(function () {
  if (model.bRightAnchorButtons() === "UNIT GROUPS" || model.bRightAnchorButtons() === "ALL") {
    model.bUnitAnchorButtonsArr = ko.observableArray([]);
    for (var i = 0; i < model.bUnitAnchorButtonsAmount(); i++)	{
      model.bUnitAnchorButtonsArr().push(i+1);
    }
    return true;
  }
  else {
    model.bUnitAnchorButtonsArr = ko.observableArray([]);
    return false;
  }
});

model.bNorthAnchorButtonVisible = ko.computed(function () {
  if (model.bRightAnchorButtons() === "NORTH" || model.bRightAnchorButtons() === "ALL") {
    return true;
  }
  else {
    return false;
  }
});

model.bPoleLockAnchorButtonVisible = ko.computed(function () {
  if (model.bRightAnchorButtons() === "POLE LOCK" || model.bRightAnchorButtons() === "ALL") {
    return true;
  }
  else {
    return false;
  }
});

//CHECK POLE LOCK STATUS ON LOAD.
var allSettings = decode(localStorage[localStorage.uberName + ".paSettings"]);
var currentPoleLock = allSettings.camera.pole_lock;
if (currentPoleLock === undefined)
{
  model.bIsPoleLockOn = ko.observable(false);
}
else
{
  model.bIsPoleLockOn = ko.observable(true);
}

model.polelockToggle = function () {
  console.log("PoleLock");
  var allSettings = decode(localStorage[localStorage.uberName + ".paSettings"]);
  var currentPoleLock = allSettings.camera.pole_lock;
  var nextSetting = "";
  if (currentPoleLock === undefined) {
      nextSetting = "ON";
      allSettings.camera.pole_lock = "ON";
  } else {
      nextSetting = "OFF";
      delete allSettings.camera.pole_lock;
  }
  engine.call("set_camera_pole_lock", nextSetting.toLowerCase());
  console.log("pole_lock : " + nextSetting);
  localStorage[localStorage.uberName + ".paSettings"] = encode(allSettings);
  if(nextSetting === "OFF"){
    model.bIsPoleLockOn(false);
  }
  else{
    model.bIsPoleLockOn(true);
  }
};

function bAnchorButtons_polelock_active() {
  return model.bIsPoleLockOn() ? "anchor_active" : "";
}

model.alignCameraToPole = function() {
  console.log("Align To Pole");
  api.camera.alignToPole();
};

createFloatingFrame('bAnchorButtons_info_frame', 1, 70, {'offset': 'topCenter', 'top':42});
$('#bAnchorButtons_info_frame_content').append(
  $.ajax({
    type: "GET",
    url: 'coui://ui/mods/bAnchorButtons/live_game/bAnchorButtons.html',
    async: false
  }).responseText
);
