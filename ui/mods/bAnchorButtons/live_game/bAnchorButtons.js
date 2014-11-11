// Code needs reworking to fit "bCameraAnchorButtons" type style better 
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
//////////////


//load html dynamically
function loadAnchorHtmlTemplate(element, url) {
    element.load(url, function () {
        console.log("Loading html " + url);
        ko.applyBindings(model, element.get(0));
    });
}

var settings = decode(localStorage.settings);

//debugger;
model.bCameraAnchorButtonsAmount = ko.observable(parseInt(settings.bAnchorButtonsAmount));
model.bUnitAnchorButtonsAmount = ko.observable(parseInt(settings.bAnchorButtonsUnitsAmount));
model.bRightAnchorButtons = ko.observable(settings.bAnchorButtonsRight);
//forgetFramePosition('bAnchorButtons_info_frame');

model.bAnchorButtonsFlat = ko.computed(function () {
    if (settings.bAnchorButtonsStyle == "FLAT") {
        return true;
    }
    else {
        return false;
    }
});

model.bAnchorButtonsAngle = ko.computed(function () {
    if (settings.bAnchorButtonsStyle == "ANGLE") {
        return true;
    }
    else {
        return false;
    }
});

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
    if (model.bRightAnchorButtons() == "UNIT GROUPS") {
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
	if (model.bRightAnchorButtons() == "NORTH") {
		return true;
	}
	else {
		return false;
	}
});

model.bPoleLockAnchorButtonVisible = ko.computed(function () {
	if (model.bRightAnchorButtons() == "POLE LOCK") {
		return true;
	} else {
		return false;
	}
});

model.bIsPoleLockOn = ko.computed(function () {
	if (settings.camera_pole_lock == "on") {
		//engine.call('set_camera_pole_lock','off');
		return false;
	} else {
		//engine.call('set_camera_pole_lock','on');
		return true;
	}
});	

createFloatingFrame('bAnchorButtons_info_frame', 1, 70, {'offset': 'topCenter', 'top':42});
loadAnchorHtmlTemplate($('#bAnchorButtons_info_frame_content'), 'coui://ui/mods/bAnchorButtons/live_game/bAnchorButtons.html');