import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

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
    
    }
};

export default databaseService;