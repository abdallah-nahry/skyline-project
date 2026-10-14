// import { useEffect, useState } from "react";
// import { Modal, Button, Form, Alert, Badge } from "react-bootstrap";
// import { getReservationsByRoom, addReservation } from "../services/api";

// export default function RoomModal({ room, onClose }) {
//   const imgURl =
//     "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800";

//   const [customerFullName, setCustomerFullName] = useState("");
//   const [customerPhone, setCustomerPhone] = useState(""); // حقل الهاتف المطلوب في السيرفر
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   const [available, setAvailable] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [variant, setVariant] = useState("info");

//   const currentRoomId = room?.id || room?._id;

//   const nights = () => {
//     if (!checkIn || !checkOut) return 0;
//     const diff = (new Date(checkOut) - new Date(checkIn)) / 86400000;
//     return diff > 0 ? diff : 0;
//   };

//   const pricePerNight = room.pricePerNight || room.price || 0;
//   const total = nights() * pricePerNight;

//   useEffect(() => {
//     if (!currentRoomId) return;
//     if (!checkIn || !checkOut || nights() <= 0) {
//       setAvailable(null);
//       return;
//     }
//     let cancelled = false;
//     getReservationsByRoom(currentRoomId)
//       .then((list) => {
//         if (cancelled) return;
//         const reservationsArray = Array.isArray(list)
//           ? list
//           : list?.reservations || list?.data || [];

//         const overlap = reservationsArray.some(
//           (r) => checkIn < r.checkOut && checkOut > r.checkIn,
//         );
//         setAvailable(!overlap);
//       })
//       .catch((err) => console.error(err));
//     return () => {
//       cancelled = true;
//     };
//   }, [checkIn, checkOut, currentRoomId]);

//   const handleBook = async () => {
//     setMessage("");
//     if (!customerFullName || !customerPhone || !checkIn || !checkOut) {
//       setVariant("danger");
//       return setMessage("Please fill all fields including phone number");
//     }
//     if (nights() <= 0) {
//       setVariant("danger");
//       return setMessage("Check-out must be after check-in");
//     }
//     if (available === false) {
//       setVariant("danger");
//       return setMessage("Room is not available for these dates");
//     }

//     setLoading(true);
//     try {
//       // مطابقة كائن الحجز تماماً مع الـ Schema الخاصة بالسيرفر
//       const reservation = {
//         roomId: currentRoomId,
//         customerFullName: customerFullName,
//         customerPhone: customerPhone,
//         checkIn: checkIn,
//         checkOut: checkOut,
//         nights: nights(),
//         pricePerNight: pricePerNight,
//         totalPrice: total,
//       };

//       await addReservation(reservation);
//       setVariant("success");
//       setMessage(` Booking confirmed! Total: $${total}`);
//       setAvailable(false);
//     } catch (err) {
//       console.error(err);
//       setVariant("danger");
//       setMessage("Booking failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal show onHide={onClose} centered size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>
//           Room {room.roomNumber} — {room.roomType}
//         </Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <img
//           src={imgURl}
//           alt={room.roomType}
//           className="img-fluid rounded mb-3"
//           style={{ maxHeight: 220, width: "100%", objectFit: "cover" }}
//         />
//         <p className="fw-bold fs-5 mb-1">
//           ${pricePerNight}{" "}
//           <small className="text-muted fw-normal">/ night</small>
//         </p>

//         <Form>
//           <Form.Group className="mb-3">
//             <Form.Label>Customer Full Name</Form.Label>
//             <Form.Control
//               value={customerFullName}
//               onChange={(e) => setCustomerFullName(e.target.value)}
//               placeholder="Full name"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Customer Phone</Form.Label>
//             <Form.Control
//               type="text"
//               value={customerPhone}
//               onChange={(e) => setCustomerPhone(e.target.value)}
//               placeholder="Phone number"
//             />
//           </Form.Group>

//           <div className="row">
//             <Form.Group className="mb-3 col-md-6">
//               <Form.Label>Check-in</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={checkIn}
//                 onChange={(e) => setCheckIn(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3 col-md-6">
//               <Form.Label>Check-out</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={checkOut}
//                 onChange={(e) => setCheckOut(e.target.value)}
//               />
//             </Form.Group>
//           </div>
//         </Form>

//         {nights() > 0 && (
//           <p className="mb-2">
//             {nights()} night(s) × ${pricePerNight} = <strong>${total}</strong>
//           </p>
//         )}

//         {available === true && <Badge bg="success"> Available</Badge>}
//         {available === false && <Badge bg="danger"> Not available</Badge>}

//         {message && (
//           <Alert variant={variant} className="mt-3 mb-0">
//             {message}
//           </Alert>
//         )}
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           Close
//         </Button>
//         <Button
//           variant="warning"
//           className="fw-semibold"
//           onClick={handleBook}
//           disabled={loading || available === false}
//         >
//           {loading ? "Booking..." : "Confirm Booking"}
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }
import { useEffect, useState } from "react";
import { Modal, Button, Form, Alert, Badge } from "react-bootstrap";
import { getReservationsByRoom, addReservation } from "../services/api";

export default function RoomModal({ room, onClose }) {
  const imgURl =
    "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800";

  const [customerFullName, setCustomerFullName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [available, setAvailable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("info");

  const currentRoomId = room?.id || room?._id;

  const nights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = (new Date(checkOut) - new Date(checkIn)) / 86400000;
    return diff > 0 ? diff : 0;
  };

  const pricePerNight = room.pricePerNight || room.price || 0;
  const total = nights() * pricePerNight;

  useEffect(() => {
    if (!currentRoomId) return;
    if (!checkIn || !checkOut || nights() <= 0) {
      setAvailable(null);
      return;
    }

    let cancelled = false;
    getReservationsByRoom(currentRoomId)
      .then((list) => {
        if (cancelled) return;

        const reservationsArray = Array.isArray(list)
          ? list
          : list?.reservations || list?.data || [];

        // إذا لم يكن هناك أي حجوزات لهذه الغرفة نهائياً، فالغرفة متاحة مباشرة
        if (reservationsArray.length === 0) {
          setAvailable(true);
          return;
        }

        const userIn = new Date(checkIn).setHours(0, 0, 0, 0);
        const userOut = new Date(checkOut).setHours(0, 0, 0, 0);

        const overlap = reservationsArray.some((r) => {
          if (r.status === "Cancelled") return false;

          const rIn = new Date(r.checkIn).setHours(0, 0, 0, 0);
          const rOut = new Date(r.checkOut).setHours(0, 0, 0, 0);

          return userIn < rOut && userOut > rIn;
        });

        setAvailable(!overlap);
      })
      .catch((err) => {
        console.error(err);
        // في حال فشل جلب الحجوزات (مثلاً لا توجد حجوزات بعد)، نعتبر الغرفة متاحة افتراضياً
        setAvailable(true);
      });

    return () => {
      cancelled = true;
    };
  }, [checkIn, checkOut, currentRoomId]);

  const handleBook = async () => {
    setMessage("");
    if (!customerFullName || !customerPhone || !checkIn || !checkOut) {
      setVariant("danger");
      return setMessage("Please fill all fields including phone number");
    }
    if (nights() <= 0) {
      setVariant("danger");
      return setMessage("Check-out must be after check-in");
    }
    if (available === false) {
      setVariant("danger");
      return setMessage("Room is not available for these dates");
    }

    setLoading(true);
    try {
      const reservation = {
        roomId: currentRoomId,
        customerFullName: customerFullName,
        customerPhone: customerPhone,
        checkIn: checkIn,
        checkOut: checkOut,
        nights: nights(),
        pricePerNight: pricePerNight,
        totalPrice: total,
      };

      await addReservation(reservation);
      setVariant("success");
      setMessage(` Booking confirmed! Total: $${total}`);
      setAvailable(false);
    } catch (err) {
      console.error(err);
      setVariant("danger");
      setMessage("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Room {room.roomNumber} — {room.roomType}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <img
          src={imgURl}
          alt={room.roomType}
          className="img-fluid rounded mb-3"
          style={{ maxHeight: 220, width: "100%", objectFit: "cover" }}
        />
        <p className="fw-bold fs-5 mb-1">
          ${pricePerNight}{" "}
          <small className="text-muted fw-normal">/ night</small>
        </p>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Customer Full Name</Form.Label>
            <Form.Control
              value={customerFullName}
              onChange={(e) => setCustomerFullName(e.target.value)}
              placeholder="Full name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Customer Phone</Form.Label>
            <Form.Control
              type="text"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Phone number"
            />
          </Form.Group>

          <div className="row">
            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Check-in</Form.Label>
              <Form.Control
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Check-out</Form.Label>
              <Form.Control
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </Form.Group>
          </div>
        </Form>

        {nights() > 0 && (
          <p className="mb-2">
            {nights()} night(s) × ${pricePerNight} = <strong>${total}</strong>
          </p>
        )}

        {available === true && <Badge bg="success"> Available</Badge>}
        {available === false && <Badge bg="danger"> Not available</Badge>}

        {message && (
          <Alert variant={variant} className="mt-3 mb-0">
            {message}
          </Alert>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="warning"
          className="fw-semibold"
          onClick={handleBook}
          disabled={loading || available === false}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
