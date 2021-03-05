export default class ElectronMock {
    public ipcRenderer = new IPCRendererMock();
}

class IPCRendererMock {
    /***
     * listened by Web/HTML/JS and mocks the sending of events by the main-renderer
     */
    public on(eventName: string, callback: (...args: any[]) => void) {
        switch (eventName) {
            case 'octoPrintReady':
            case 'waitPortError':
            case 'octoprintReady':
                console.log('handling ipc listener for ' + eventName);
                break;

            case 'versionInformation':
                console.warn('not handling ' + eventName + ' as it is not required for web-context');
                break;

            case 'discoveredNodes':
                console.warn('bonjour is currently not supported in browser-context, so we cannot discover nodes');
                callback([]);
                break;

            case 'customStyles':
            case 'customStylesError':
                console.warn('not handling ' + eventName + ' for now. maybe ill add it later to the web-context');
                break;

            default:
                console.error('unhandled ipc listener for ' + eventName);
        }
    }

    /***
     * Called by Web/HTML/JS and mocks the handling by the main-renderer
     */
    public send(eventName: string, payload: any) {
        switch (eventName) {
            case 'checkOctoPrintPort':
                this.checkOctoPrintPort(payload);
                break;

            case 'appInfo':
                console.warn('not handling ipc command ' + eventName + ' as it is not needed for the web-context');
                break;

            case 'discover':
            case 'stopDiscover':
                console.warn('not handling ' + eventName + ' command, as bonjour and node discovery is not supported in the browser-context');
                break;

            default:
                console.error('unhandled ipc command', { eventName, payload });
        }
    }

    private async checkOctoPrintPort({ host, port }: { host: string, port: number }) {
        console.log('checking for octoprint at ' + host + ':' + port);

        const response = await fetch('http://' + host + ':' + port);
        if (response.status === 200) {
            return true;
        }

        throw new Error(response.statusText);
    }
}