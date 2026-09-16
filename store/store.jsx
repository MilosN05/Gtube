import { create } from "zustand";

export const outer_store = create((set)=> ({
    Ime: null,
    Bookmark: {},
        

    set_info_data_zus: (new_info_data) => set({ Bookmark: new_info_data}),
    set_ime_zus: (new_ime)=> set({ Ime: new_ime})


   
}))

