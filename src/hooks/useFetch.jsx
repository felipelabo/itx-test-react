import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para hacer fetch a una API externa con cache en cliente (localStorage).
 * - Guarda respuestas GET en localStorage con TTL 1 hora.
 * - Devuelve cache si existe y no está expirada, a menos que pases { force: true }.
 * - Actualiza la cache GET equivalente tras peticiones mutantes (POST/PUT/DELETE).
 * @param {string} url - URL de la API a consultar
 * @param {object} options - Opciones para fetch (opcional)
 * @param {boolean} auto - Si true, hace GET automáticamente al montar
 * @returns {object} { data, loading, error, fetchData, readCache, writeCache }
*/

const CACHE_PREFIX = 'data';
const CACHE_TTL = 1000 * 60 * 60; // 1 hora

// Genera clave única para cache basada en URL y método
function makeCacheKey(url, options = {}) {
	const method = (options.method || 'GET').toUpperCase();
	return `${CACHE_PREFIX}:${method}:${url}`;
}

export function useFetch(url, options = {}, auto = true) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Funcion para leer cache desde localStorage
	const readCache = useCallback((key) => {
		console.log('Reading cache for key:', key);
		
		try {
			const raw = localStorage.getItem(key);
			if (!raw) return null;
			const parsed = JSON.parse(raw);
			if (!parsed || typeof parsed !== 'object') return null;
			if (Date.now() - (parsed.ts || 0) > CACHE_TTL) {
				console.log('Cache expired for key:', key);
				try { localStorage.removeItem(key); } catch {}
				return null;
			}
			return parsed.data;
		} catch (e) {
			console.error('Error reading cache for key:', key, e);
			try { localStorage.removeItem(key); } catch {}
			return null;
		}
	}, []);

	// Funcion para escribir cache en localStorage
	const writeCache = useCallback((key, value) => {
		try {
			const payload = { ts: Date.now(), data: value };
			console.log('Writing cache for key:', key, payload);
			localStorage.setItem(key, JSON.stringify(payload));
		} catch (e) {
			console.error('Error writing cache for key:', key, e);
			throw e;
		}
	}, []);

	// Funcion principal para hacer fetch
	const fetchData = useCallback(async (customOptions = {}) => {
		setLoading(true);
		setError(null);

		
		const merged = { ...options, ...customOptions };
		const requestUrl = merged.url || url;
		const method = (merged.method || 'GET').toUpperCase();

		console.log('options request:', method, requestUrl, merged);

		const cacheKey = makeCacheKey(requestUrl, merged);

		console.log('cachekey:', cacheKey);

		// Si es GET y no se fuerza, intentar devolver cache válida
		if (method === 'GET' && !merged.force) {
			const cached = readCache(cacheKey);
			console.log('Cache result for key:', cacheKey, cached);
			if (cached !== null) {
				console.log('Using cached data for key');
				setData(cached);
				setLoading(false);
				return cached;
			}
		}

		try {
			// Preparar opciones para fetch: eliminar keys internas
			const fetchOptions = { ...merged };
			delete fetchOptions.force;
			delete fetchOptions.url;
			console.log('Making fetch')

			const response = await fetch(requestUrl, fetchOptions);
			if (!response.ok) {
				const errorText = await response.text().catch(() => response.statusText);
				throw new Error(errorText || response.statusText);
			}
			const json = await response.json();
			setData(json);

			// Guardar en cache
			if (method === 'GET') {
				console.log('Saving data to cache for key:', cacheKey);
				writeCache(cacheKey, json);
			}

			return json;
		} catch (err) {
			setError(err);
			return null;
		} finally {
			setLoading(false);
		}
	}, [url, JSON.stringify(options), readCache, writeCache]);

	useEffect(() => {
		if (!url || !auto) return;
		fetchData();
	}, [url, auto, fetchData]);

	return { data, loading, error, fetchData, readCache, writeCache };
}
