import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, increment, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBNjJw7xUyNplALmQBQCapzNzr1C79vTDc",
    authDomain: "labvirtual-profew.firebaseapp.com",
    projectId: "labvirtual-profew",
    storageBucket: "labvirtual-profew.firebasestorage.app",
    messagingSenderId: "981474222295",
    appId: "1:981474222295:web:5f413bb53231afc4bb1092"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', async () => {
    const contadorSpan = document.getElementById('contador-visitas');
    if (contadorSpan) {
        try {
            const docRef = doc(db, "estadisticas", "visitas_totales");
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                await updateDoc(docRef, { count: increment(1) });
                const newVal = docSnap.data().count + 1;
                contadorSpan.innerText = newVal.toLocaleString();
            } else {
                await setDoc(docRef, { count: 1 });
                contadorSpan.innerText = "1";
            }
        } catch (error) {
            console.error("Error actualizando contador:", error);
            contadorSpan.innerText = "Activo";
        }
    }
});
