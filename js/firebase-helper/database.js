import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const databaseService = {
    writeData(url, data) {
        const db = getDatabase();
        set(ref(db, url), data);
    }
};

export default databaseService;