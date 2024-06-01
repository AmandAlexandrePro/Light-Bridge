/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import { join } from "https://deno.land/std@0.224.0/path/mod.ts";
const root = "~\\Light Bridge\\Source", configPath = "~\\Light Bridge\\Source\\Engine\\config.json";
let config = JSON.parse(await Deno.readTextFile(configPath)), assets = config?.["assets"];
if (typeof assets == "object" && assets != null) {
    for await (const {
        isFile,
        name
    } of Deno.readDir(root)) {
        if (isFile == true && name.endsWith(".json") == true) {
            try {
                const path = join(root, name);
                let data = JSON.parse(await Deno.readTextFile(path)), asset = data?.["asset"];
                if (typeof asset == "object" && asset != null) {
                    let file = asset?.["file"];
                    if (typeof file == "object" && file != null) {
                        const fileName = file?.["filename"];
                        if ((typeof fileName == "string" ? fileName.length > 0 : false) == true) {
                            if (name.slice(0, name.lastIndexOf(".json")) == fileName) {
                                const fileURL = (new URL(file?.["url"], "file://"))?.pathname;
                                if ((typeof fileURL == "string" ? fileURL.length > 0 : false) == true) {
                                    assets[fileURL] = asset;
                                    await Deno.remove(path)
                                }
                            }
                        }
                    }
                }
            } catch (error) {
                undefined
            }
        }
    };
    await Deno.writeTextFile(configPath, JSON.stringify(config, null, 4))
}