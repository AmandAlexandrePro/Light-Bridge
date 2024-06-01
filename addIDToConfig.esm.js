/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
const configPath = "~\\Light Bridge\\Source\\Engine\\config.json";
let config = JSON.parse(await Deno.readTextFile(configPath)), assets = config?.["assets"];
if (typeof assets == "object" && assets != null) {
    for (const key of Object.keys(assets)) {
        let asset = assets[key];
        if (typeof asset == "object" && asset != null) asset["id"] = key
    };
    await Deno.writeTextFile(configPath, JSON.stringify(config, null, 4))
}