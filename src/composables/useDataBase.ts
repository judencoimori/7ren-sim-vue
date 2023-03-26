import { useAnimaStore } from '@/stores/animaStore';
import { storeToRefs } from 'pinia';

export { getDataBase, saveAnimaToDB, getSavedAnimaKeys, getSavedAnima, savePartyToDB, getSavedPartyKeys, getSavedParty };

async function getDataBase() {
    const promise = new Promise<IDBDatabase>(
        (resolve, reject): void => {
            const openRequest = indexedDB.open("7renSim", 2);
            openRequest.onupgradeneeded = (event) => {
                const target = event.target as IDBRequest;
                const db = target.result as IDBDatabase;
                db.createObjectStore("partnerAnima", { keyPath: "key" });
                db.createObjectStore("partnerParty", { keyPath: "key" });
                //db.createObjectStore("simulateResult", { keyPath: "key" });
            }
            openRequest.onerror = (event) => {
                console.error("IDBDatabase error");
            };
            openRequest.onsuccess = (event) => {
                const target = event.target as IDBRequest;
                const db = target.result as IDBDatabase;
                resolve(db);
            };

        }
    );
    return promise;
}

async function savePartyToDB(db: IDBDatabase, key: string) {
    const animaStore = useAnimaStore();
    const { partnerAnimas } = storeToRefs(animaStore);
    const newKey: string | null = prompt("保存するパーティの名称を入力してください\n（名称は後から変更することもできます）", key);
    if (newKey === null) return;

    const promise = new Promise<boolean>(
        (resolve, reject) => {
            const transaction = db.transaction("partnerParty", "readwrite");
            const objectStore = transaction.objectStore("partnerParty");
            const data = { data: partnerAnimas.value, key: newKey };
            objectStore.add(JSON.parse(JSON.stringify(data))); //Proxy外し
            transaction.oncomplete = () => {
                resolve(true);
            }
            transaction.onerror = (event) => {
                console.log("データ保存に失敗,event");
                reject(new Error("ERROR:データ保存に失敗"));
            }
        }
    );
    return promise;
}

async function getSavedPartyKeys(db: IDBDatabase): Promise<string[]> {
    const promise: Promise<string[]> = new Promise(
        (resolve, reject) => {
            const transaction = db.transaction("partnerParty", "readonly");
            const objectStore = transaction.objectStore("partnerParty");
            const getKeys = objectStore.getAllKeys();
            let keys: string[];
            getKeys.onsuccess = (event) => {
                const target = event.target as IDBRequest;
                keys = target.result;
            }
            transaction.oncomplete = () => {
                resolve(keys);
            }
            transaction.onerror = (event) => {
                console.log("保存済みパーティ一覧取得に失敗,event");
                reject(new Error("ERROR:保存済みパーティ一覧取得に失敗"));
            }
        }
    );
    return promise;
}

async function getSavedParty(db: IDBDatabase, key: string) {
    const promise = new Promise(
        (resolve, reject) => {
            const transaction = db.transaction("partnerParty", "readonly");
            const objectStore = transaction.objectStore("partnerParty");
            const getParty = objectStore.get(key);
            let party;
            getParty.onsuccess = (event) => {
                const target = event.target as IDBRequest;
                party = target.result;
            }
            transaction.oncomplete = () => {
                resolve(party);
            }
            transaction.onerror = (event) => {
                console.log("保存済みパーティ取得に失敗,event");
                reject(new Error("ERROR:保存済みパーティ取得に失敗"));
            }
        }
    );
    return promise;
}

async function saveAnimaToDB(db: IDBDatabase, animaNum: number) {
    const animaStore = useAnimaStore();
    const { partnerAnimas } = storeToRefs(animaStore);
    const key: string | null = prompt("保存するアニマの名称を入力してください\n（名称は後から変更することもできます）", partnerAnimas.value[animaNum].key);
    if (key === null) return;

    const promise = new Promise<boolean>(
        (resolve, reject) => {
            const transaction = db.transaction("partnerAnima", "readwrite");
            const objectStore = transaction.objectStore("partnerAnima");
            const data = partnerAnimas.value[animaNum];
            objectStore.add(JSON.parse(JSON.stringify(data))); //Proxy外し
            transaction.oncomplete = () => {
                resolve(true);
            }
            transaction.onerror = (event) => {
                console.log("データ保存に失敗,event");
                reject(new Error("ERROR:データ保存に失敗"));
            }
        }
    );
    return promise;
}

async function getSavedAnimaKeys(db: IDBDatabase): Promise<string[]> {
    const promise: Promise<string[]> = new Promise(
        (resolve, reject) => {
            const transaction = db.transaction("partnerAnima", "readonly");
            const objectStore = transaction.objectStore("partnerAnima");
            const getKeys = objectStore.getAllKeys();
            let keys: string[];
            getKeys.onsuccess = (event) => {
                const target = event.target as IDBRequest;
                keys = target.result;
            }
            transaction.oncomplete = () => {
                resolve(keys);
            }
            transaction.onerror = (event) => {
                console.log("保存済みアニマ一覧取得に失敗,event");
                reject(new Error("ERROR:保存済みアニマ一覧取得に失敗"));
            }
        }
    );
    return promise;
}

async function getSavedAnima(db: IDBDatabase, key: string) {
    const promise = new Promise(
        (resolve, reject) => {
            const transaction = db.transaction("partnerAnima", "readonly");
            const objectStore = transaction.objectStore("partnerAnima");
            const getAnima = objectStore.get(key);
            let anima;
            getAnima.onsuccess = (event) => {
                const target = event.target as IDBRequest;
                anima = target.result;
            }
            transaction.oncomplete = () => {
                resolve(anima);
            }
            transaction.onerror = (event) => {
                console.log("保存済みアニマ一覧取得に失敗,event");
                reject(new Error("ERROR:保存済みアニマ一覧取得に失敗"));
            }
        }
    );
    return promise;
}