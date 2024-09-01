import axios from 'axios';

export const chatbotApi = async (userMessage: string) => {
  try {
    const API_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/chatbot`;

    const response = await axios.post(API_URL, { message: userMessage }, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const botResponse = response.data.botResponse;
    return botResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return "Oops! Something went wrong. Please try again.";
  }
};
