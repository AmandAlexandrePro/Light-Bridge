/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import { join } from "https://deno.land/std@0.224.0/path/mod.ts";
import { Hash } from "https://deno.land/x/checksum@1.2.0/mod.ts";
const root = "~\\Light Bridge\\Source\\Scripts";
for await (const {
    isFile,
    name
} of Deno.readDir(root)) {
    if (isFile == true && name.endsWith(".json") == true) {
        try {
            const path = join(root, name);
            let data = JSON.parse(await Deno.readTextFile(path)), file = data?.["file"];
            if (typeof file == "object" && file != null) {
                const fileName = file?.["filename"];
                if ((typeof fileName == "string" ? fileName.length > 0 : false) == true) {
                    if (name.slice(0, name.lastIndexOf(".json")) == fileName) {
                        const filePath = join(root, fileName);
                        file["hash"] = new Hash("md5").digest(await Deno.readFile(filePath)).hex();
                        file["size"] = (await Deno.stat(filePath)).size;
                        await Deno.writeTextFile(path, JSON.stringify(data, null, 4))
                    }
                }
            }
        } catch (error) {
            undefined
        }
    }
}