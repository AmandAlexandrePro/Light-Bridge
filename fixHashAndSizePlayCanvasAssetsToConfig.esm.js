/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import { join } from "https://deno.land/std@0.224.0/path/mod.ts";
import { Hash } from "https://deno.land/x/checksum@1.2.0/mod.ts";
const root = "~\\Light Bridge\\Source", configPath = "~\\Light Bridge\\Source\\Engine\\config.json";
let config = JSON.parse(await Deno.readTextFile(configPath)), assets = config?.["assets"];
if (typeof assets == "object" && assets != null) {
    for (const key of Object.keys(assets)) {
        let asset = assets[key];
        if (typeof asset == "object" && asset != null) {
            let file = asset?.["file"];
            if (typeof file == "object" && file != null) {
                const fileURL = (new URL(file?.["url"], "file://"))?.pathname;
                if ((typeof fileURL == "string" ? fileURL.length > 0 : false) == true) {
                    try {
                        const filePath = join(root, fileURL);
                        file["hash"] = new Hash("md5").digest(await Deno.readFile(filePath)).hex();
                        file["size"] = (await Deno.stat(filePath)).size;
                    } catch (error) {
                        undefined
                    }
                }
            }
        }
    };
    await Deno.writeTextFile(configPath, JSON.stringify(config, null, 4))
}