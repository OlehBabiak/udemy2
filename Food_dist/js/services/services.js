const postData = async (url, data) => {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: data,
	});
	return await res.json();
};

const getCard = async (url) => {
	const resp = await fetch(url);
	if (!resp.ok) {
		throw new Error(`Could not fetch ${url}, status: ${resp.status}`);
	}
	return await resp.json();
};

export { postData };
export { getCard };
