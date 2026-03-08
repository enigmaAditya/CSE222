import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
console.log(import.meta.url);
console.log(fileURLToPath(import.meta.url));
console.log("File name: ", path.basename(__filename));
console.log("Directory name: ", path.dirname(__filename));
console.log("Extension: ", path.extname(__filename));
console.log("Printing full object: ", path.parse(__filename));
