import { useState } from "react";
import {MdOutlineSearch} from 'react-icons/md';


export default function SearchBar({listToChange, setListToChange}) {
    const [textInput, setTextInput] = useState("");

    const handleFilterList = (e) => {
        const query = e.target.value;
        const newList = listToChange.filter(product => 
            product.model.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase())
        );
        setTextInput(query);
        setListToChange(newList);
    }

    return (
        <div className="relative w-[30%]">
            <input
                type="text"
                placeholder="Filter products..."
                className="shadow-(--boxshadow) w-full bg-(--primary-color-on) border-solid p-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary-color)"
                onChange={handleFilterList}
                value={textInput}

            />
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <MdOutlineSearch size={20} className="text-(--primary-color)" />
            </span>
        </div>
    );
}