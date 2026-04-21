const EMAILJS_PUBLIC_KEY = "z_GoSnAnG_lwzjCP8";
const EMAILJS_SERVICE_ID = "service_lmne7w7";
const EMAILJS_TEMPLATE_ID = "template_jrqo0ib";

if (typeof window.emailjs !== "undefined") {
    window.emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });
}

const contactBlocks = document.querySelectorAll("#Contact");

contactBlocks.forEach((contactBlock) => {
    const inputs = contactBlock.querySelectorAll("input");
    const sendButton = contactBlock.querySelector("button");

    if (inputs.length < 2 || !sendButton) {
        return;
    }

    const emailInput = inputs[0];
    const messageInput = inputs[1];
    let statusMessage = contactBlock.querySelector(".contact_status");

    if (!statusMessage) {
        statusMessage = document.createElement("p");
        statusMessage.className = "contact_status";
        contactBlock.appendChild(statusMessage);
    }

    sendButton.addEventListener("click", async () => {
        const senderEmail = emailInput.value.trim();
        const feedbackMessage = messageInput.value.trim();

        if (senderEmail === "" || feedbackMessage === "") {
            statusMessage.textContent = "Please fill in both your email and your feedback.";
            statusMessage.classList.remove("success");
            statusMessage.classList.add("error");
            return;
        }

        if (typeof window.emailjs === "undefined") {
            statusMessage.textContent = "EmailJS could not be loaded.";
            statusMessage.classList.remove("success");
            statusMessage.classList.add("error");
            return;
        }

        sendButton.disabled = true;
        sendButton.textContent = "Sending...";
        statusMessage.textContent = "";
        statusMessage.classList.remove("success", "error");

        try {
            await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                title: "Feedback from stocks-gsb",
                name: senderEmail,
                message: `${feedbackMessage}\n\nPage: ${window.location.href}`,
                email: senderEmail
            });

            statusMessage.textContent = "Feedback sent successfully.";
            statusMessage.classList.remove("error");
            statusMessage.classList.add("success");
            emailInput.value = "";
            messageInput.value = "";
        } catch (error) {
            const errorText =
                error?.text ||
                error?.message ||
                `Status: ${error?.status ?? "unknown"}`;
            statusMessage.textContent = `Could not send feedback. ${errorText}`;
            statusMessage.classList.remove("success");
            statusMessage.classList.add("error");
        } finally {
            sendButton.disabled = false;
            sendButton.textContent = "Send";
        }
    });
});
