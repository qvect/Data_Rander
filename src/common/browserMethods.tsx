import Browser from "webextension-polyfill";
import { asyncSleep } from "./utils";
const syncRef = Browser.storage.sync;
const localRef = Browser.storage.local;

const STORE_NAME = "linkedin_scrapper"

async function setSyncStorage(data: any) {
    await syncRef.set({ [STORE_NAME]: data });
}

async function setLocalStorage(data: any) {
    await localRef.set({ [STORE_NAME]: data });
}

async function getSyncStorage() {
    const data = await syncRef.get();
    return data[STORE_NAME];
}

async function getLocalStorage() {
    const data = await localRef.get();
    return data[STORE_NAME];
}

async function updateLocalStorage(newData: any) {
    const localStorage = await getLocalStorage()
    const newStorage = {
        ...localStorage,
        ...newData,
    }
    await setLocalStorage(newStorage)
}

class MessagingMethods {
    // Send message from popup and options popup to content script and background script
    async tabMesage(data: any) {
        const activeTab = await activeTabData()
        return await Browser.tabs.sendMessage(activeTab.id, { ...data });
    }
    async tabMesageWithId(tabId: number, data: any) {
        return await Browser.tabs.sendMessage(tabId, { ...data });
    }
    // Send message for any other scenerio except the above one
    async runTimeMessage(data: any) {
        return await Browser.runtime.sendMessage(data);
    }
}

async function createATab(url: string) {
    return await Browser.tabs.create({ url })
}

async function reloadATab(tabId: number) {
    await Browser.tabs.reload(tabId);
}


async function displayBadgeOnIcon(tabId: number, text: string) {
    await Browser.action.setBadgeText({
        text,
        tabId,
    });
}

async function updateATabUrl(tabId: number, url: string, wait = false) {
    await Browser.tabs.update(tabId, { url })
    wait ? await waitTillTabLoads(tabId) : null
}

async function waitTillTabLoads(tabId: number) {
    await asyncSleep(0.5)

    const tab = await Browser.tabs.get(tabId)
    if (tab.status == 'loading') {
        await waitTillTabLoads(tabId)
    } else return
}

async function activeTabData() {
    const tabsData: any = await Browser.tabs.query({
        active: true,
    })
    return tabsData[0]
}

export {
    setLocalStorage,
    getLocalStorage,
    setSyncStorage,
    getSyncStorage,
    MessagingMethods,
    createATab,
    activeTabData,
    updateATabUrl,
    reloadATab,
    displayBadgeOnIcon,
    updateLocalStorage
};
