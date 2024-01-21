import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const contactsAxios = axios.create({
  baseURL: 'https://65a06fbc600f49256faff88d.mockapi.io/api/contacts/contacts',
});
const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  try {
    const response = await contactsAxios.get('/');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contact => {
    try {
      const response = await contactsAxios.post('/', contact);
      console.log('Add contact response:', response.data);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    try {
      await contactsAxios.delete(`/${id}`);
      return id;
    } catch (error) {
      throw error;
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export const selectContacts = state => state.contacts.items;
export const selectContactsLoading = state => state.contacts.isLoading;
export default contactsSlice.reducer;
export const contactsReducer = contactsSlice.reducer;
