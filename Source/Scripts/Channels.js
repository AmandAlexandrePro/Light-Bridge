/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
let Channels = pc.createScript("Channels");
Channels.attributes.add("Entities", {
    type: "entity",
    array: true,
    default: ["", ""]
});
Channels.prototype.initialize = function () {
    this.Entities = this.Entities.filter(function (entity) {
        return typeof (entity) != "undefined"
    });
    const name = this.entity.parent.name;
    this.input = document.createElement("input");
    this.input.id = `channels_${name}`;
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
    let RangeValue = this.entity.root.findByName("RangeValue"), Led = this.entity.parent.findByName("Led"), BTN = this.entity.parent.findByName("Button");
    if ((Led ? Led.element.enabled == true : false) == true) Led.element.enabled = false;
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
    this.input.oninput = () => {
        const value = this.input.value;
        if (RangeValue) RangeValue.element.text = value
        if (Led) Led.element.enabled = value > 0 ? true : false
        for (let entity of this.Entities) {
            let Light = entity?.light;
            const isLight = typeof (Light) != "undefined";
            let Attributes = isLight == true ? entity.parent?.script.scripts[0] : entity?.script.scripts[0];
            if (typeof (Attributes) != "undefined") {
                const Attribute = ((Number(name) - Attributes.Address) % 2) == 1 ? "Dimmer" : "Blink";
                if (isLight == true) Light.intensity = (value / 100) * Attributes.Dimmer
                else {
                    Attributes[Attribute] = value;
                    entity.children.filter(function (node) {
                        return typeof (node?.light) != "undefined";
                    }).forEach((node, index) => {
                        if (Attribute == "Dimmer") {
                            const range = document.querySelector(`#channels_${Attributes.Address + index}`);
                            if ((range ? range.value > 0 : false) == true) return node.light.intensity = (range.value / 100) * Attributes.Dimmer
                        }
                    })
                }
            }
        }
    };
    this.on("state", () => this.input.style.display = this.entity.enabled == true ? "block" : "none");
    this.updatePosition();
    document.body.appendChild(this.input);
};

Channels.prototype.updatePosition = function () {
    if (this.entity.element.screenCorners) {
        const position = this.entity.element.screenCorners;
        const devicePixelRatio = this.app.graphicsDevice.maxPixelRatio;
        this.input.style.left = `${(position[0].x / devicePixelRatio)}px`;
        this.input.style.bottom = `${(position[0].y / devicePixelRatio)}px`;
        this.input.style.width = `${((position[2].x - position[0].x) / devicePixelRatio)}px`;
        this.input.style.height = `${((position[2].y - position[0].y) / devicePixelRatio)}px`;
    }
};

Channels.prototype.update = function () {
    this.updatePosition()
};