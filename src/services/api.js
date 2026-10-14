const API_URL = "http://localhost:4000/api";

// get room
export const getRooms = async () => {
  const res = await fetch(`${API_URL}/rooms`);
  console.log(res.ok);

  if (!res.ok) throw new Error("Failed to fetch rooms");
  return res.json();
};
// get room by ID
export const getRoomById = async (id) => {
  const res = await fetch(`${API_URL}/rooms/${id}`);
  if (!res.ok) throw new Error("Failed to fetch room");
  return res.json();
};
// add room
export const addRoom = async (room) => {
  const res = await fetch(`${API_URL}/rooms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(room),
  });
  if (!res.ok) throw new Error("Failed to add room");
  return res.json();
};
// update room
export const updateRoom = async (id, data) => {
  const res = await fetch(`${API_URL}/rooms/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update room");
  return res.json();
};
// delete room
export const deleteRoom = async (id) => {
  const res = await fetch(`${API_URL}/rooms/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete room");
  return true;
};

// get reservations
export const getReservations = async () => {
  const res = await fetch(`${API_URL}/reservations`);
  if (!res.ok) throw new Error("Failed to fetch reservations");
  return res.json();
};
// get reservations by ID
export const getReservationsByRoom = async (roomId) => {
  const res = await fetch(`${API_URL}/reservations?roomId=${roomId}`);
  if (!res.ok) throw new Error("Failed to fetch reservations");
  return res.json();
};
// add reservations
export const addReservation = async (reservation) => {
  const res = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservation),
  });
  if (!res.ok) throw new Error("Failed to add reservation");
  return res.json();
};
// update reservations
export const updateReservation = async (id, data) => {
  const res = await fetch(`${API_URL}/reservations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update reservation");
  return res.json();
};
// delete reservations
export const deleteReservation = async (id) => {
  const res = await fetch(`${API_URL}/reservations/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete reservation");
  return true;
};
