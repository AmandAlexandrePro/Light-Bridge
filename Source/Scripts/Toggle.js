/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
let Toggle = pc.createScript("Toggle");
Toggle.prototype.initialize = function () {
    Console = this.entity.parent.findByName("Console");
    if (Console) {
        Import = Console.parent.findByName("Import"), Export = Console.parent.findByName("Export");
        if (Console.enabled == true) Console.enabled = false;
        if (Import && Export) {
            Import.element.enabled = Console.enabled;
            Export.element.enabled = Console.enabled;
            this.entity.button.on("click", () => {
                if (Console.enabled == true) {
                    this.entity.element.textureAsset = this.app.assets.find("open.png", "texture")?.id;
                    Console.enabled = false;
                    Import.element.enabled = Console.enabled;
                    Export.element.enabled = Console.enabled
                } else {
                    this.entity.element.textureAsset = this.app.assets.find("close.png", "texture")?.id;
                    Console.enabled = true;
                    Import.element.enabled = Console.enabled;
                    Export.element.enabled = Console.enabled
                }
            })
        }
    }
}