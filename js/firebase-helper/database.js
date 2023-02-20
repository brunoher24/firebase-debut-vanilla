import { getDatabase, ref, set, onValue, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const db = getDatabase();

const databaseService = {
    writeData(url, data) {
        set(ref(db, url), data);
    },
    readData(url, callback) {
        const itemRef = ref(db, url);
        onValue(itemRef, (snapshot) => {
            console.log("data changed !", snapshot.val());
            const data = snapshot.val();
            callback(data);
        });
    },
    updateData(dbNode, data) {
        return new Promise(resolve => {
            const updates = {};
            for(const key in data) {
                updates[dbNode + "/" + key] = data[key];
            }
            update(ref(db), updates)
            .then(success => {
                resolve({data: success});
            }).catch(error => {
                console.log(error);
                resolve({error});
            })
        });
    }
};

export default databaseService;