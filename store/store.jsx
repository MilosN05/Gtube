import { create } from "zustand";

export const outer_store = create((set)=> ({
    Ime: null,
    Bookmark: {},
    downloaded_info: null,
        

    set_info_data_zus: (new_info_data) => set({ Bookmark: new_info_data}),
    set_ime_zus: (new_ime)=> set({ Ime: new_ime}),
    set_downloaded_zus: (new_downloaded)=> set({ downloaded_info: new_downloaded}),


   
}))

