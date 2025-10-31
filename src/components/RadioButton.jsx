
export default function RadioButton({object, label, name, value, handle}) {

    return (
        <div>
            <p className="mb-1">{label}:</p>
            
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mb-4">
                {object.map((option, index) => (
                    <label key={index} className="cursor-pointer px-4 py-2 rounded border border-solid border-gray-200 hover:border-(--secondary-color-dark) has-checked:border-(--secondary-color) transition-colors flex items-center">
                        <input
                            type="radio"
                            name={name}
                            value={option.code}
                            className="hidden"
                            checked={option.code == value}
                            onChange={handle}
                        />
                        <span className="block text-sm font-medium">{option.name}</span>
                    </label>
                ))}
            </div>
                
        </div>
    )

}