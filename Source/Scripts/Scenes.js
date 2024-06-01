/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
let Scenes = pc.createScript("Scenes");
Scenes.prototype.initialize = function () {
    const name = Number(this.entity.parent.name) - 24;
    let scene = this.entity.root.findByName("Import")?.script.scripts[0]?.["Scenes"];
    this.input = document.createElement("input");
    this.input.id = `scenes_${name}`;
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
    this.entity.script.scripts[0]
    let RangeValue = this.entity.root.findByName("RangeValue")?.element, Led = this.entity.parent.findByName("Led")?.element, BTN = this.entity.parent.findByName("Button")?.button, RecordingAttributes = this.app.root.findByName("Recording")?.script.scripts[0], Record = this.entity.parent.findByName("Record")?.element;
    if (typeof (Led) != "undefined" && typeof (BTN) != "undefined" && typeof (RecordingAttributes?.Index) == "number" && typeof (RangeValue) != "undefined" && typeof (Record) != "undefined") {
        Led.enabled = false;
        let old = this.input.value;
        BTN.on("pressedstart", () => {
            if (RecordingAttributes.Index < 0) {
                old = this.input.value;
                this.input.value = this.input.max;
                this.input.dispatchEvent(new Event("input"))
            }
        });
        BTN.on("pressedend", () => {
            if (RecordingAttributes.Index < 0) {
                this.input.value = old;
                this.input.dispatchEvent(new Event("input"))
            }
        });
        BTN.on("click", () => {
            if (RecordingAttributes.Index == name) {

            } else if (RecordingAttributes.Index == 0) {
                RecordingAttributes.Index = name;
                globalThis.recordScene = [];
                Record.enabled = true;
                Interval = setInterval(function () {
                    return Record.enabled = !Record.enabled
                }, 700)
            }
        });
        this.input.oninput = async () => {
            const value = this.input.value;
            RangeValue.text = value;
            Led.enabled = value > 0 ? true : false;
            if (globalThis?.Inter != name) {
                let Scene = scene?.resource?.["Scenes"]?.[name - 1];
                if (IsObject(Scene) == true) {
                    Scene = Object.entries(Scene);
                    const Childrens = this.app.root.children[0].children;
                    let Lengths = {};
                    globalThis.Inter = name;
                    async function Interval(index) {
                        if (globalThis.Inter == name && this.value > 0) {
                            for (let [Projectors, Values] of Scene) {
                                if (typeof (Lengths?.[Projectors]) != "number") Lengths[Projectors] = Values.length - 1;
                                for (const Projector of Childrens.filter(function (node) {
                                    return node.name.endsWith(Projectors) == true
                                })) {
                                    let Attributes = Projector?.script.scripts[0];
                                    if (typeof (Attributes) != "undefined") {
                                        const Properties = Values[index];
                                        if (IsObject(Properties) == true) {
                                            const Dimmer = Properties?.["Dimmer"];
                                            Attributes.Dimmer = typeof (Dimmer) == "number" ? (Dimmer / 100) * this.value : this.value;
                                            for (const [Key, Value] of Object.entries(Properties).filter(function ([key]) {
                                                return ["Dimmer", "Blink"].every(function (property) {
                                                    return property != key
                                                }) == true
                                            })) {
                                                let Light = Projector.findByName(Key)?.light;
                                                if (typeof (Light) != "undefined") Light.intensity = (((Value / 100) * this.value) / 100) * Attributes.Dimmer
                                            }
                                        }
                                    }
                                }
                            };
                            await (function () {
                                return new Promise(function (resolve, reject) {
                                    try {
                                        return setTimeout(resolve, 750)
                                    } catch (error) {
                                        return reject(error)
                                    }
                                })
                            })();
                            return await Interval.bind(this)(index == Math.max(...Object.entries(Lengths).map(function ([, value]) {
                                return value
                            })) ? 0 : index + 1)
                        } else if (globalThis.Inter == name) globalThis.Inter = undefined
                    };
                    Interval.bind(this.input)(0)
                }
            }
        }
    };
    this.on("state", () => this.input.style.display = this.entity.enabled == true ? "block" : "none");
    this.updatePosition();
    document.body.appendChild(this.input)
};
Scenes.prototype.updatePosition = function () {
    if (this.entity.element.screenCorners) {
        const position = this.entity.element.screenCorners;
        const devicePixelRatio = this.app.graphicsDevice.maxPixelRatio;
        this.input.style.left = `${(position[0].x / devicePixelRatio)}px`;
        this.input.style.bottom = `${(position[0].y / devicePixelRatio)}px`;
        this.input.style.width = `${((position[2].x - position[0].x) / devicePixelRatio)}px`;
        this.input.style.height = `${((position[2].y - position[0].y) / devicePixelRatio)}px`
    }
};
Scenes.prototype.update = function () {
    this.updatePosition()
}