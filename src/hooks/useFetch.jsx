import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para hacer fetch a una API externa.
 * Soporta GET automático y métodos POST/PUT/DELETE manuales.
 * Maneja los estados: loading, data, error.
 * @param {string} url - URL de la API a consultar
 * @param {object} options - Opciones para fetch (opcional)
 * @param {boolean} auto - Si true, hace GET automáticamente al montar
 * @returns {object} { data, loading, error, fetchData }
 */
export function useFetch(url, options = {}, auto = true) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = useCallback(async (customOptions = {}) => {
		setLoading(true);
		setError(null);
		setData(null);
		try {
			const response = await fetch(url, { ...options, ...customOptions });
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(errorText || response.statusText);
			}
			const json = await response.json();
			setData(json);
			return json;
		} catch (err) {
			setError(err);
			return null;
		} finally {
			setLoading(false);
		}
	}, [url, JSON.stringify(options)]);

	useEffect(() => {
		if (!url || !auto) return;
		fetchData();
	}, [url, auto]);

	return { data, loading, error, fetchData };
}
