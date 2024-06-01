/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
let Projectors = pc.createScript("Projectors");
Projectors.attributes.add("Address", {
    type: "number"
});
Projectors.attributes.add("Dimmer", {
    type: "number",
    default: 0,
    min: 0,
    max: 100
});
Projectors.attributes.add("Blink", {
    type: "number",
    default: 0,
    min: 0,
    max: 100
})