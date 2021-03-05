export default class ElectronStoreMock {
    private state: {[key: string]: any} = {};
    public get(key: string) {
        return this.state[key];
        // return JSON.parse(localStorage.getItem(key));
    }

    public set(key: string, value: any) {
        this.state[key] = value;
        // localStorage.setItem(key, JSON.stringify(value));
    }
}