import {useState, useCallback} from 'react';

function useElement<T extends HTMLElement>() {
	const [element, setElement] = useState<T | null>(null);

	const ref = useCallback((element: T | null) => setElement(element), []);

	return [ref, element] as const;
}

export default useElement;
