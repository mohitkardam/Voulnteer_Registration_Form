const TELEGRAM_TOKEN = '8992405245:AAH8w4HSx91oT2fV3HESUkO0gTDdqwKwfJk';
const CHAT_ID = '1378627146';

// This function tells Google to serve your HTML page when the link is clicked
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('ISKCON Yatra Registration')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1'); // Makes it mobile-friendly
}

// This function receives the data from the UI and sends the Telegram message
function processForm(formObject) {
  try {
    const name = formObject.name;
    const mobile = formObject.mobile;
    const service = formObject.service;

    const message = `🙏 *New Yatra Volunteer!*\n\n` +
                    `*Name:* ${name}\n` +
                    `*Mobile:* ${mobile}\n` +
                    `*Service:* ${service}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    
    const payload = {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    };

    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload)
    };

    UrlFetchApp.fetch(url, options);
    
    return "Success"; 
  } catch (error) {
    throw new Error(error.toString());
  }
}