import { type } from "os"
import ElectronStoreMock from "./electron-store.mock"
import ElectronMock from "./electron.mock";

if (!window.require) {
    // @ts-ignore
    window.require = (moduleName: string) => {
        switch(moduleName) {
            case 'electron-store':
                return ElectronStoreMock;
            case 'electron':
                return new ElectronMock();
        }
    }
}