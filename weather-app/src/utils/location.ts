export interface Coordinates {
  latitude: number;
  longitude: number;
}

/** Obtém a posição atual do usuário via API de geolocalização do navegador. */
export function getCurrentPosition(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalização não é suportada pelo seu navegador.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          reject(new Error('Permissão de localização negada.'));
        } else {
          reject(new Error('Não foi possível obter sua localização.'));
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  });
}
