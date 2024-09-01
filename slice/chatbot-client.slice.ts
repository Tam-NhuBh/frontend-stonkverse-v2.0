import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatbotState {
  messages: string[];
}

const initialState: ChatbotState = {
    messages: ["Hi there 👋 How can I help you today?"]
};

const chatbotClientSlice = createSlice({
  name: 'chatbotClient',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = chatbotClientSlice.actions;
export default chatbotClientSlice.reducer;