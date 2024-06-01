/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
let Import = pc.createScript("Import");
Import.attributes.add("Scenes", {
    type: "asset",
    assetType: "json"
});
Import.prototype.initialize = function () {
    this.set(this.Scenes.resource);
    this.entity.button.on("click", () => {
        let input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json";
        input.style.display = "none";
        input.addEventListener("change", event => {
            let file = event.target.files[0];
            if (file) {
                let reader = new FileReader();
                reader.onload = event => {
                    try {
                        this.set(JSON.parse(event.target.result))
                    } catch (error) {
                        undefined
                    } finally {
                        input.remove()
                    }
                };
                reader.readAsText(file)
            }
        }, {
            once: true
        });
        document.body.appendChild(input);
        input.click()
    })
};
Import.prototype.set = function (value) {
    let VScenes = value?.["Scenes"];
    if (IsArray(VScenes) == true) {
        let Scenes = [];
        for (const VScene of VScenes.filter(function (value) {
            return IsObject(value) == true
        })) {
            let Scene = {};
            for (const Projectors of ["Left", "Center", "Right"]) {
                for (const Values of (ToArray(VScene?.[Projectors])).filter(function (value) {
                    return IsObject(value) == true
                })) {
                    let Properties = new Map();
                    for (const Channels of ["Red", "Green", "Blue", "White", "Amber", "Dimmer", "Blink"]) {
                        let Channel = ToNumber(Values?.[Channels], {
                            default: false
                        });
                        if ((IsNumber(Channel) == true ? Channel >= 0 && Channel <= 100 : false) == true) Properties.set(Channels, Channel)
                    };
                    if (Properties.size > 0) {
                        let Result = {};
                        if (Array.isArray(Scene[Projectors]) != true) Scene[Projectors] = [];
                        for (const [key, value] of Properties) {
                            Result[key] = value
                        };
                        Scene[Projectors].push(Result)
                    }
                }
            }
            if (IsObject(Scene) == true) Scenes.push(Scene)
        }
        if (IsArray(Scenes) == true) {
            Scenes = Scenes.slice(0, 23);
            this.Scenes.resource = { Scenes };
            this.app.root.findByName("Scenes").children.forEach(node => {
                const name = Number(node.name) - 25;
                let Record = node.findByName("Record")?.element;
                if (typeof (Record) != "undefined") Record.enabled = typeof (Scenes?.[name]) != "undefined"
            })
        }
    }
}