import emailjs from '@emailjs/browser';

// REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS
// Get them from https://dashboard.emailjs.com/
const EMAILJS_CONFIG = {
    SERVICE_ID: "YOUR_SERVICE_ID",   // e.g. "service_x9s8d7f"
    TEMPLATE_ID: "YOUR_TEMPLATE_ID", // e.g. "template_8h7g6f5"
    PUBLIC_KEY: "YOUR_PUBLIC_KEY"    // e.g. "user_1A2b3C4d5E"
};

export const emailService = {
    sendWelcomeEmail: async (userEmail, userName) => {
        if (EMAILJS_CONFIG.SERVICE_ID === "YOUR_SERVICE_ID") {
            console.warn("EmailJS not configured. Skipping email.");
            return false;
        }

        try {
            const templateParams = {
                to_email: userEmail,
                to_name: userName,
                subject: "Welcome to The Mukhwas Man! 👑",
                message: `Dear ${userName},

Thank you for joining 'The Mukhwas Man'. We are delighted to have you with us.
Get ready to explore the finest collection of handcrafted digestive blends.

As a royal member, you have unlocked access to exclusive offers.

Cheers,
The Mukhwas Man Team.`
            };

            const response = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams,
                EMAILJS_CONFIG.PUBLIC_KEY
            );
            console.log('SUCCESS!', response.status, response.text);
            return true;
        } catch (error) {
            console.error('FAILED...', error);
            return false;
        }
    },

    sendLoginNotification: async (userEmail, userName) => {
        if (EMAILJS_CONFIG.SERVICE_ID === "YOUR_SERVICE_ID") return false;

        try {
            const templateParams = {
                to_email: userEmail,
                to_name: userName,
                subject: "Login Notification - The Mukhwas Man",
                message: `Hello ${userName},

You have successfully logged in to your account at The Mukhwas Man.
If this wasn't you, please contact support immediately.

Best,
The Team`
            };

            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams,
                EMAILJS_CONFIG.PUBLIC_KEY
            );
            return true;
        } catch (error) {
            console.error('Login email failed', error);
            return false;
        }
    }
};
