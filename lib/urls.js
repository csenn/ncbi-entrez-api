function getFullUrl(name) {
	return `http://eutils.ncbi.nlm.nih.gov/entrez/eutils/${name}.fcgi`
}

export const SEARCH_URL = getFullUrl('esearch')
export const SUMMARY_URL = getFullUrl('esummary')
export const FETCH_URL = getFullUrl('efetch')
export const LINK_URL = getFullUrl('elink')