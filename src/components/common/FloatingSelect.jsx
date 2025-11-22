import { useState } from 'react'

const FloatingSelect = ({
    id,
    name,
    label,
    value,
    onChange,
    options = [],
    required = false,
    className = '',
}) => {
    const [isFocused, setIsFocused] = useState(false)

    const hasValue = value && value.length > 0
    const isFloating = isFocused || hasValue

    return (
        <div className={`relative ${className}`}>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required={required}
                className={`
                    peer w-full px-4 pt-5 pb-1.5 text-base
                    border rounded-lg
                    bg-white
                    transition-all duration-200
                    outline-none
                    appearance-none
                    cursor-pointer
                    ${
                        isFocused
                            ? 'border-blue-500 ring-4 ring-blue-100'
                            : 'border-gray-300 hover:border-gray-400'
                    }
                    ${hasValue ? 'border-gray-400' : ''}
                `}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <label
                htmlFor={id}
                className={`
                    absolute left-4 transition-all duration-200 pointer-events-none
                    ${
                        isFloating
                            ? 'top-1 text-xs font-medium text-blue-600'
                            : 'top-3.5 text-base text-gray-500'
                    }
                `}
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {/* Dropdown Arrow Icon */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
        </div>
    )
}

export default FloatingSelect

