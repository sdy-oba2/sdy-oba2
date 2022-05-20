import { tokenTypography } from "./constant";
export const flattenObj = (ob) => {
  // The object which contains the
  // final result
  let result = {};
  for (const i in ob) {
    for (const property in tokenTypography) {
      if (property == i) {
        if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
          const temp = flattenObj(ob[i]);
          for (const j in temp) {
            // Store temp in result
            result[i + "." + j] = temp[j];
          }
        }

        // Else store ob[i] in result directly
        else {
          result[i] = ob[i];
        }
      }
    }
  }
  return result;
};
