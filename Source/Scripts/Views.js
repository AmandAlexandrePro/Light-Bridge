/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
let Views = pc.createScript("Views");
Views.prototype.initialize = function () {
    let Projectors = this.app.root.findComponents("element").filter(function (Component) {
        return Component.entity.name == "Projector"
    });
    if (Projectors.length > 0) {
        for (let {
            entity: Projector
        } of Projectors) {
            let Address = Projector.findByName("Address")?.element;
            if (typeof (Address?.text) == "string") {
                let Attribute = Number(Projector.parent?.script.scripts[0].Address)?.toString();
                Address.text = typeof (Attribute) != "undefined" ? Address.text.substring(0, Address.text.length - Attribute.length) + Attribute : "????"
            }
            if (Projector.enabled == true) Projector.enabled = false
        };
        return this.entity.button.on("click", function () {
            for (let {
                entity: Projector
            } of Projectors) {
                Projector.enabled = !Projector.enabled;
            }
        })
    }
}