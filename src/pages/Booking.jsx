import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import RoomCard from "../components/RoomCard";
import RoomModal from "../components/RoomModal";
import { getRooms, addRoom, updateRoom, deleteRoom } from "../services/api";

const emptyRoom = {
  roomNumber: "",
  roomType: "Single",
  roomCategory: "Standard",
  pricePerNight: "",
  capacity: "",
  image: "",
  description: "",
};

export default function Booking() {
  const [rooms, setRooms] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add or Update room states
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [roomForm, setRoomForm] = useState(emptyRoom);

  // Load rooms from API / db.json
  const loadRooms = async () => {
    try {
      const data = await getRooms();
      setRooms(Array.isArray(data) ? data : data.rooms || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(
        "Could not load rooms. Make sure json-server is running on port 3001.",
      );
      setRooms([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  // Open form "add room"
  const openAdd = () => {
    setEditingRoom(null);
    setRoomForm(emptyRoom);
    setShowForm(true);
  };

  // Open form "update room"
  const openEdit = (room) => {
    setEditingRoom(room);
    setRoomForm(room);
    setShowForm(true);
  };

  // Save (add or update)
  const handleSave = async () => {
    if (!roomForm.roomNumber || !roomForm.roomType || !roomForm.pricePerNight) {
      return alert("Please fill roomNumber, roomType, and pricePerNight");
    }

    // تحويل القيم الرقمية بشكل صحيح وتجنب استخدام دالة غير معرفة
    const payload = {
      ...roomForm,
      roomNumber: Number(roomForm.roomNumber),
      pricePerNight: Number(roomForm.pricePerNight),
      capacity: Number(roomForm.capacity) || 1,
    };

    try {
      if (editingRoom) {
        // استخراج المعرف الصحيح سواء كان id أو _id لتجنب خطأ undefined
        const roomId = editingRoom._id || editingRoom.id;
        await updateRoom(roomId, { ...payload, id: roomId });
      } else {
        await addRoom(payload);
      }
      setShowForm(false);
      loadRooms();
    } catch (err) {
      console.error(err);
      alert("Failed to save room");
    }
  };

  // Delete room
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this room?")) return;
    try {
      // إرسال الـ id المباشر أو الـ _id المستلم من العنصر
      await deleteRoom(id);
      loadRooms();
    } catch (err) {
      console.error(err);
      alert("Failed to delete room");
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h1 className="fw-bold mb-1">Book Your Stay</h1>
          <p className="text-muted mb-0">Choose a room and pick your dates</p>
        </div>
        <Button variant="success" onClick={openAdd}>
          Add Room
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="g-4">
          {Array.isArray(rooms) && rooms.length > 0 ? (
            rooms.map((room) => (
              <Col md={6} lg={4} key={room._id || room.id}>
                <RoomCard
                  room={room}
                  onBook={setSelected}
                  onEdit={openEdit}
                  // تمرير الـ _id أو id بشكل صحيح لدالة الحذف
                  onDelete={() => handleDelete(room._id || room.id)}
                />
              </Col>
            ))
          ) : (
            <Col key="no-rooms">
              <p className="text-center text-muted">No rooms available.</p>
            </Col>
          )}
        </Row>
      )}

      {/* Booking Room Modal */}
      {selected && (
        <RoomModal
          room={selected}
          onClose={() => {
            setSelected(null);
            loadRooms();
          }}
        />
      )}

      {/* Add or Update Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingRoom ? "Edit Room" : "Add Room"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Room Number</Form.Label>
              <Form.Control
                type="text"
                value={roomForm.roomNumber}
                onChange={(e) =>
                  setRoomForm({ ...roomForm, roomNumber: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Room Type</Form.Label>
              <Form.Select
                value={roomForm.roomType}
                onChange={(e) =>
                  setRoomForm({ ...roomForm, roomType: e.target.value })
                }
              >
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Room Category</Form.Label>
              <Form.Select
                value={roomForm.roomCategory}
                onChange={(e) =>
                  setRoomForm({ ...roomForm, roomCategory: e.target.value })
                }
              >
                <option value="Standard">Standard</option>
                <option value="VIP">VIP</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Price Per Night</Form.Label>
              <Form.Control
                type="number"
                value={roomForm.pricePerNight}
                onChange={(e) =>
                  setRoomForm({ ...roomForm, pricePerNight: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editingRoom ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}