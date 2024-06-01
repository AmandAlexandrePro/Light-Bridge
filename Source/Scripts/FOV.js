/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
function IsString(value, options) {
    return typeof (value) == "string" ? options?.notEmpty != false ? value.length > 0 : true : false
};
function ToString(value, options) {
    try {
        return IsString(value) != true ? typeof (value) != "undefined" && options?.json != true ? String(value) : JSON.stringify(value) : value
    } catch (error) {
        if (options?.default != false) return ""
    }
};
function IsArray(value, options) {
    try {
        if (Array.isArray(value) == true) return options?.notEmpty != false ? value.length > 0 : true
        else if (options?.stringify != false) {
            value = JSON.parse(ToString(value));
            return Array.isArray(value) == true ? options?.notEmpty != false ? value.length > 0 : true : false
        } else return false
    } catch (error) {
        return false
    }
};
function ToArray(value, options) {
    try {
        if (IsArray(value) == true) return IsString(value) == true ? JSON.parse(value) : value
        else if (options?.default != false) return []
    } catch (error) {
        if (options?.default != false) return []
    }
};
function IsNumber(value, options) {
    value = Number(value);
    return isNaN(value) == false ? options?.onlyPositive == true ? value > 0 : true : false
};
function ToNumber(value, options) {
    if (IsNumber(value) == true) return Number(value)
    else if (options?.default != false) return 0
};
function IsObject(value, options) {
    try {
        if (typeof (value) == "object" && value != null && value?.constructor == Object) return options?.notEmpty != false ? Object.keys(value).length > 0 : true
        else if (options?.stringify != false) {
            value = JSON.parse(ToString(value));
            return typeof (value) == "object" && value != null && value?.constructor == Object ? options?.notEmpty != false ? Object.keys(value).length > 0 : true : false
        } else return false
    } catch (error) {
        return false
    }
};
let FOV = pc.createScript("FOV");
FOV.prototype.initialize = function () {
    const css = "input[type='range'] {appearance: slider-vertical;opacity: 0.75}";
    let style = document.createElement("style");
    if (style.styleSheet) style.styleSheet.cssText = css;
    else style.textContent = css;
    document.head.appendChild(style);
    let Camera = this.entity.findByName("Camera")?.camera;
    if (typeof (Camera) != "undefined") return this.app.mouse.on(pc.EVENT_MOUSEWHEEL, function (event) {
        if (event.wheelDelta > 0 && Camera.fov < 90) Camera.fov += 1
        else if (event.wheelDelta < 0 && Camera.fov > 0) Camera.fov -= 1
    })
}