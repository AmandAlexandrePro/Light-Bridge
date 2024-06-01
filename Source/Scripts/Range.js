/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
let RangeSlider = pc.createScript("Range");

/*RangeSlider.prototype.initialize = function () {
    let RangeValue = this.entity.root.findByName("RangeValue"), Led = this.entity.parent.findByName("Led"), BTN = this.entity.parent.findByName("Button");
    if ((Led ? Led.element.enabled == true : false) == true) Led.element.enabled = false;
    this.input = document.createElement("input");
    this.input.id = `range_${this.entity.parent.name}`;
    this.input.min = 0;
    this.input.max = 100;
    this.input.value = this.input.min;
    this.input.step = 1;
    this.input.type = "range";
    this.input.style.position = "absolute";
    this.input.style.border = "0px";
    this.input.style.margin = "0px";
    this.input.style.padding = "0px";
    this.input.style.outline = "none";
    this.input.oninput = () => {
        if (RangeValue) RangeValue.element.text = this.input.value
        if (Led) Led.element.enabled = this.input.value > 0 ? true : false
    };
    if (BTN) {
        let old = this.input.value;
        BTN.button.on("pressedstart", () => {
            old = this.input.value;
            this.input.value = this.input.max;
            this.input.dispatchEvent(new Event("input"))
        });
        BTN.button.on("pressedend", () => {
            this.input.value = old;
            this.input.dispatchEvent(new Event("input"))
        })
    };
    this.on("state", () => this.input.style.display = this.entity.enabled == true ? "block" : "none");
    this.updatePosition();
    document.body.appendChild(this.input);
};

RangeSlider.prototype.updatePosition = function () {
    if (this.entity.element.screenCorners) {
        const position = this.entity.element.screenCorners;
        const devicePixelRatio = this.app.graphicsDevice.maxPixelRatio;
        this.input.style.left = `${(position[0].x / devicePixelRatio)}px`;
        this.input.style.bottom = `${(position[0].y / devicePixelRatio)}px`;
        this.input.style.width = `${((position[2].x - position[0].x) / devicePixelRatio)}px`;
        this.input.style.height = `${((position[2].y - position[0].y) / devicePixelRatio)}px`;
    }
};

RangeSlider.prototype.update = function () {
    this.updatePosition()
};*/