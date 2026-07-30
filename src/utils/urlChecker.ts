// src/utils/urlChecker.ts

/**
 * Vérifie si un paramètre (clé) ou un tag spécifique est présent dans les query parameters de l'URL.
 * 
 * @param key La clé ou le paramètre à rechercher dans l'URL (ex: 'token')
 * @returns boolean Vrai si le paramètre existe et possède une valeur, faux sinon
 */
export const hasUrlParam = (key: string): boolean => {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.has(key) && !!queryParams.get(key);
};

/**
 * Vérifie si un chemin ou un fragment spécifique est présent dans le pathname de l'URL.
 * 
 * @param segment Le segment de chemin à rechercher (ex: 'reset-password')
 * @returns boolean Vrai si le segment est présent dans l'URL
 */
export const hasPathSegment = (segment: string): boolean => {
  return window.location.pathname.includes(segment);
};