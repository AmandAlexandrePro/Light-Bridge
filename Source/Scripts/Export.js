/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
let Export = pc.createScript("Export");
Export.prototype.initialize = function () {
    let Scenes = this.entity.parent.findByName("Import")?.script.scripts[0]?.["Scenes"];
    if (typeof (Scenes) != "undefined") this.entity.button.on("click", () => {
        let link = document.createElement("a");
        link.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(Scenes.resource))}`;
        link.download = "scenes.json";
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        link.remove()
    })
}