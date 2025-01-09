export interface BookingFormProps {
  roomId: string ; // Explicitly define the type for roomId
}


export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  roomName: string;
  city: string;
  area: string;
  bookerName: string;
  bookerPhone: string;
  bookingTime: [number, number, number, number, number];
  status: {
    id: number;
    name: string;
    description: string;
  };
  confirmedBy: string;
  refuseBy: string;
  cancelBy: string;
  refuseOrCancelMessage?: string | null; // Thêm dòng này
  contactQrCode: {
    id: string;
    imageUrl: string;
    imagePath: string;
  }[];
}
