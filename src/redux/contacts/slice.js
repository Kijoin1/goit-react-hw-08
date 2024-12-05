import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContactsThunk, deleteContactsThunk, fetchContacts } from "./operations";
import { logout } from '../auth/operations';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addContactsThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContactsThunk.fulfilled, (state, action) => {
        const idToDelete = action.payload;
        state.items = state.items.filter((item) => item.id !== idToDelete);
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(logout.fulfilled, (state) => { 
        state.items = []; 
      })
      .addMatcher(isAnyOf(addContactsThunk.pending, deleteContactsThunk.pending, fetchContacts.pending), (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(addContactsThunk.fulfilled, deleteContactsThunk.fulfilled, fetchContacts.fulfilled), (state, action) => {
        state.loading = false;
      })
      .addMatcher(isAnyOf(addContactsThunk.rejected, deleteContactsThunk.rejected, fetchContacts.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const contactsReducer = slice.reducer;