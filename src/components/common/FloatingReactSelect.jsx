import { useState } from 'react'
import Select from 'react-select'

const FloatingReactSelect = ({
    id,
    name,
    label,
    value,
    onChange,
    options = [],
    required = false,
    isMulti = false,
    isClearable = true,
    isSearchable = true,
    placeholder = '',
    className = '',
    isDisabled = false,
}) => {
    const [isFocused, setIsFocused] = useState(false)

    const hasValue = isMulti ? value && value.length > 0 : value !== null && value !== undefined && value !== ''
    const isFloating = isFocused || hasValue

    // Custom styles for react-select to match our design
    const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: '50px',
            paddingTop: '12px',
            paddingBottom: '2px',
            paddingLeft: '12px',
            paddingRight: '12px',
            borderWidth: '1px',
            borderRadius: '8px',
            borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
            boxShadow: state.isFocused ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : 'none',
            '&:hover': {
                borderColor: state.isFocused ? '#3b82f6' : '#9ca3af',
            },
            backgroundColor: '#fff',
            cursor: 'pointer',
        }),
        valueContainer: (base) => ({
            ...base,
            padding: '0',
            paddingTop: '2px',
        }),
        input: (base) => ({
            ...base,
            margin: '0',
            padding: '0',
        }),
        placeholder: (base) => ({
            ...base,
            display: 'none',
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        dropdownIndicator: (base, state) => ({
            ...base,
            color: '#6b7280',
            padding: '4px',
            '&:hover': {
                color: '#374151',
            },
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
            transition: 'transform 0.2s',
        }),
        clearIndicator: (base) => ({
            ...base,
            color: '#6b7280',
            padding: '4px',
            '&:hover': {
                color: '#374151',
            },
        }),
        menu: (base) => ({
            ...base,
            borderRadius: '8px',
            marginTop: '4px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: '1px solid #e5e7eb',
        }),
        menuList: (base) => ({
            ...base,
            borderRadius: '8px',
            padding: '4px',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? '#3b82f6'
                : state.isFocused
                  ? '#eff6ff'
                  : 'white',
            color: state.isSelected ? 'white' : '#1f2937',
            cursor: 'pointer',
            borderRadius: '6px',
            padding: '8px 12px',
            '&:active': {
                backgroundColor: '#3b82f6',
            },
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: '#eff6ff',
            borderRadius: '6px',
            border: '1px solid #bfdbfe',
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: '#1e40af',
            padding: '2px 6px',
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: '#3b82f6',
            '&:hover': {
                backgroundColor: '#3b82f6',
                color: 'white',
            },
            borderRadius: '0 4px 4px 0',
        }),
    }

    const handleChange = (selectedOption) => {
        // Create synthetic event to match standard input onChange
        const syntheticEvent = {
            target: {
                name: name,
                value: isMulti
                    ? selectedOption
                        ? selectedOption.map((opt) => opt.value)
                        : []
                    : selectedOption
                      ? selectedOption.value
                      : '',
            },
        }
        onChange(syntheticEvent)
    }

    // Convert value to react-select format
    const getSelectValue = () => {
        if (isMulti) {
            if (!value || value.length === 0) return []
            return options.filter((opt) => value.includes(opt.value))
        } else {
            if (!value) return null
            return options.find((opt) => opt.value === value) || null
        }
    }

    return (
        <div className={`relative ${className}`}>
            <Select
                inputId={id}
                name={name}
                value={getSelectValue()}
                onChange={handleChange}
                options={options}
                isMulti={isMulti}
                isClearable={isClearable}
                isSearchable={isSearchable}
                isDisabled={isDisabled}
                placeholder={placeholder}
                styles={customStyles}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                noOptionsMessage={() => 'Không tìm thấy kết quả'}
                loadingMessage={() => 'Đang tải...'}
            />
            <label
                htmlFor={id}
                className={`
                    absolute left-4 transition-all duration-200 pointer-events-none
                    bg-white px-1
                    ${
                        isFloating
                            ? 'top-0 -translate-y-1/2 text-xs font-medium text-blue-600'
                            : 'top-3.5 text-base text-gray-500'
                    }
                `}
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
        </div>
    )
}

export default FloatingReactSelect

