// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyA-HNYt7eVp2uKfq3I_6DnrsxgrvOiYt6U",
    authDomain: "chat3-3683f.firebaseapp.com",
    projectId: "chat3-3683f",
    databaseURL: "https://chat3-3683f-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket: "chat3-3683f.appspot.com",
    messagingSenderId: "483002821139",
    appId: "1:483002821139:web:c6e7356e3c5b9ff1a02de6"
};

firebase.initializeApp(firebaseConfig);

// Reference to Firebase Realtime Database
var database = firebase.database();
var messagesRef = database.ref("messages");

// Function to send a message
function sendMessage() {
    var messageInput = document.getElementById("message-input");
    var message = messageInput.value.trim();

    if (message !== "") {
        // Push message to Firebase Database
        messagesRef.push({
            sender: "Me",
            message: message
        });

        // Clear input field after sending message
        messageInput.value = "";
    }
}

// Listen for new messages in real-time
messagesRef.on("child_added", function(snapshot) {
    var message = snapshot.val();
    displayMessage(message.sender, message.message);
});

// Function to display a message in the chat window
function displayMessage(sender, message) {
    var messageContainer = document.getElementById("message-container");
    var messageElement = document.createElement("div");
    messageElement.innerText = sender + ": " + message;
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight; // Auto-scroll to bottom
}
