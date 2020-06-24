import firebase from 'firebase';

class Firebase {
    constructor(){
        this.init();
        this.observeAuth()
    }

    init = () => {
        firebase.initializeApp({
            apiKey: "AIzaSyDv-ZleypUApKZRAx2_8kK4ZbG5qKFsGcQ",
            authDomain: "reactbootcamp-5ff3e.firebaseapp.com",
            databaseURL: "https://reactbootcamp-5ff3e.firebaseio.com",
            projectId: "reactbootcamp-5ff3e",
            storageBucket: "reactbootcamp-5ff3e.appspot.com",
            messagingSenderId: "960339335848",
            appId: "1:960339335848:web:019f148de3749f5325809d",
            measurementId: "G-D1G52KZ78G"
        })
    }

    observeAuth= () => {
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
    }

    onAuthStateChanged = (user) => {
        if (!user) {
            try {
                firebase.auth().signInAnonymously();
            } catch ({message}) {
                
            }
        }
    }
    

    get uid(){
        return(firebase.auth().currentUser || {}).uid
    }

    get ref() {
        return firebase.database().ref('message')
    }

    parse = snapshot => {
        const {timestamp:numberStamp,text,user} = snapshot.val();
        const {key :_id} = snapshot;
        const timestamp = new Date(numberStamp);
        const message ={
            _id,
            timestamp,
            text,
            user
        }

        return message;    
    }
    on = callback => {
        this.ref.limitToLast(50).on('child_added',snapshot => callback(this.parse(snapshot)))
    }
    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP
    }

    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const {text,user } = messages[i];
            const message = {
                text,
                user,
                timestamp:this.timestamp
            }
            this.append(message)
        }
    }

    append = message => {
        this.ref.push(message)
    }

    off() {
        this.ref.off()
    }
}

Firebase.shared = new Firebase();
export default Firebase;