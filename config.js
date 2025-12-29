/**
 * Configuration file for Blade Properties Chat Assistant
 * Edit the values below to customize your setup
 */

const CONFIG = {
    // n8n Webhook URL - Update this to your n8n instance
    webhookUrl: 'https://n8n.ai4eg.com/webhook/6e23aba0-815f-4909-8f46-1c6e19b15b57',

    // Bot settings
    botName: 'Blade Properties Assistant',
    welcomeMessage: 'Hello! Ask me to show you "The Downtown Skyscraper" or "The Seaside Villa".',

    // Messages
    messages: {
        actionResponse: "Of course! I'll open the page for that project.",
        modalActionResponse: "Of course! Opening the project gallery for you.",
        unexpectedFormat: "I received a response, but it had an unexpected format.",
        errorMessage: "Sorry, there was an issue processing the response."
    }
};
