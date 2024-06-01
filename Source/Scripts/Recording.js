/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
let Recording = pc.createScript("Recording");
Recording.attributes.add("Index", {
    type: "number",
    default: -1,
    min: -1,
    max: 24
});
Recording.prototype.initialize = function () {
    let Led = this.entity.findByName("Led")?.element, Button = this.entity.findByName("Button")?.button;
    if (typeof (Led) != "undefined" && typeof (Button) != "undefined") {
        let Interval;
        return Button.on("click", () => {
            if (this.Index < 0) {
                this.Index = 0;
                Led.enabled = false;
                Interval = setInterval(function () {
                    return Led.enabled = !Led.enabled
                }, 700);
            } else if (this.Index > 0) {
                this.Index = -1;
                if (typeof (Interval) != "undefined") clearInterval(Interval)
                Led.enabled = true
            }
        })
    }
}