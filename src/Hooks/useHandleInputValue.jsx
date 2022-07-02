import { useState } from 'react';

export default function useHandleInputValue() {
    const [value, setValue] = useState('');

    const handleValue = e => setValue(e.target.value);

    return {
        value,
        onChange: handleValue,
    };
}
