import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0
}

const counterSlice = createSlice({
    name: 'counter',
    initialState, 
    reducers: {
        incremented(draft) {
             draft.value++;
        },
        amountAdded(draft, action: PayloadAction<number>) {
            draft.value += action.payload;
        }
    }
})


export const { incremented, amountAdded } = counterSlice.actions;

export default counterSlice.reducer;


