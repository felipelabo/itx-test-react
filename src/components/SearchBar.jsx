import { useState } from "react";


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
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </span>
        </div>
    );
}