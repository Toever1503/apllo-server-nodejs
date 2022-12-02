import {readFileSync} from "fs";

export default function readContentFile(path: string): string {
    return readFileSync(require.resolve(path)).toString('utf-8')
}