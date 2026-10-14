import { Card, Button, Badge, ButtonGroup } from "react-bootstrap";

export default function RoomCard({ room, onBook, onEdit, onDelete }) {
  const imgURl =
    "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800";
  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Img
        variant="top"
        src={imgURl}
        alt={room.type}
        style={{ height: 200, objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0">Room {room.roomNumber}</Card.Title>
          <Badge bg="secondary">{room.roomType}</Badge>
        </div>

        <Card.Text className="fw-bold fs-5 mt-auto mb-2">
          ${room.pricePerNight}{" "}
          <small className="text-muted fw-normal">/ night</small>
        </Card.Text>

        <Button
          variant="warning"
          className="fw-semibold w-100 mb-2"
          onClick={() => onBook(room)}
        >
          Book Now
        </Button>

        {/* أزرار التعديل والحذف */}
        <ButtonGroup className="w-100">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onEdit(room)}
          >
            Edit
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onDelete(room.id)}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}
