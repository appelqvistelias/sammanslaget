export function getDistanceInKm(origin, destination) {
  const R = 6371; // Earth's radius
  const dLat = deg2rad(destination.lat - origin.lat);
  const dLon = deg2rad(destination.lng - origin.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(origin.lat)) *
      Math.cos(deg2rad(destination.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // result in km
}

export function getDistanceInM(origin, destination) {
  return getDistanceInKm(origin, destination) * 1000; // result in m
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
