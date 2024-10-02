'use strict';

function is_safari()
{
	return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

function sleep(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}

function is_in_viewport(el)
{
	const rect = el.getBoundingClientRect();

	return rect.bottom >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight);
}

async function read_json(url, callback) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erreur pJS - Statut XMLHttpRequest: ${response.status}`);
        }

        const my_data = await response.json();
        callback(my_data);
    } catch (error) {
        console.error('Erreur lors de la requête JSON:', error);
    }
}

